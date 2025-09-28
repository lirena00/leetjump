import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LeetCodeProblem } from '@/utils/database';
import { slashCommandService, SlashCommandSuggestion } from '@/utils/slash-commands';

import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import ResultsList from '@/components/ResultsList';
import Footer from '@/components/Footer';

interface SearchResult extends LeetCodeProblem {
  matchType?: 'id' | 'title' | 'slug';
}

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    isStale: boolean;
    lastSync: Date | null;
    totalCount: number;
  } | null>(null);
  const [slashCommandSuggestions, setSlashCommandSuggestions] = useState<SlashCommandSuggestion[]>(
    []
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize slash commands
  useEffect(() => {
    // Register POTD command
    slashCommandService.registerCommand({
      id: 'potd',
      aliases: ['potd', 'today', 'daily'],
      description: "Open today's Problem of the Day",
      execute: async () => {
        setIsLoading(true);
        try {
          const response = await browser.runtime.sendMessage({
            type: 'OPEN_DAILY_PROBLEM',
          });

          if (response?.success) {
            setQuery('');
          } else {
            console.error('Failed to open daily problem:', response?.error);
          }
        } catch (error) {
          console.error('Failed to execute POTD command:', error);
        } finally {
          setIsLoading(false);
        }
      },
    });

    // Register help command
    slashCommandService.registerCommand({
      id: 'help',
      aliases: ['help', 'commands'],
      description: 'Show all available slash commands',
      execute: async () => {
        const suggestions = slashCommandService.getSuggestions('/help');
        setSlashCommandSuggestions(suggestions);
      },
    });
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Load sync status on mount
  useEffect(() => {
    const loadSyncStatus = async () => {
      try {
        const response = await browser.runtime.sendMessage({
          type: 'CHECK_SYNC_STATUS',
        });

        if (response?.success) {
          setSyncStatus({
            isStale: response.data.isStale,
            lastSync: response.data.lastSync ? new Date(response.data.lastSync) : null,
            totalCount: response.data.totalCount,
          });
        }
      } catch (error) {
        console.error('Failed to load sync status:', error);
      }
    };

    loadSyncStatus();
  }, []);

  // Handle query changes
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(0);

    if (newQuery.startsWith('/')) {
      // Handle slash commands
      const suggestions = slashCommandService.getSuggestions(newQuery);
      setSlashCommandSuggestions(suggestions);
      setResults([]);
    } else {
      // Clear slash command suggestions for regular search
      setSlashCommandSuggestions([]);
    }
  }, []);

  // Search function with debouncing
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.startsWith('/')) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await browser.runtime.sendMessage({
        type: 'SEARCH_PROBLEMS',
        query: searchQuery,
      });

      if (response?.success) {
        const enhancedResults: SearchResult[] = response.data.map((problem: LeetCodeProblem) => {
          const lowerQuery = searchQuery.toLowerCase();
          let matchType: 'id' | 'title' | 'slug' = 'title';

          if (problem.id.toString() === searchQuery) {
            matchType = 'id';
          } else if (problem.slug.toLowerCase().includes(lowerQuery)) {
            matchType = 'slug';
          }

          return { ...problem, matchType };
        });

        setResults(enhancedResults);
        setSelectedIndex(0);
      } else {
        console.warn('Search failed:', response?.error || 'Unknown error');
        setResults([]);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (!query.startsWith('/')) {
      const timer = setTimeout(() => {
        performSearch(query);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [query, performSearch]);

  // Handle slash command selection
  const handleSlashCommandSelect = useCallback((command: string) => {
    setQuery(command);
    const suggestions = slashCommandService.getSuggestions(command);
    setSlashCommandSuggestions(suggestions);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const isSlashMode = query.startsWith('/');
      const maxIndex = isSlashMode ? slashCommandSuggestions.length - 1 : results.length - 1;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, maxIndex));
          break;

        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;

        case 'Enter':
          e.preventDefault();
          if (isSlashMode && slashCommandSuggestions[selectedIndex]) {
            const suggestion = slashCommandSuggestions[selectedIndex];

            // Special handling for help command - don't execute, just show suggestions
            if (suggestion.command.id === 'help') {
              setQuery('/help');
              const helpSuggestions = slashCommandService.getSuggestions('/help');
              setSlashCommandSuggestions(helpSuggestions);
            } else {
              // Execute other commands
              suggestion.command.execute();
            }
          } else if (!isSlashMode && results[selectedIndex]) {
            // Open selected problem
            openProblem(results[selectedIndex]);
          }
          break;

        case 'Escape':
          e.preventDefault();
          setQuery('');
          setResults([]);
          setSlashCommandSuggestions([]);
          break;
      }
    },
    [results, selectedIndex, query, slashCommandSuggestions]
  );

  // Open problem in new tab
  const openProblem = async (problem: LeetCodeProblem) => {
    try {
      await browser.runtime.sendMessage({
        type: 'OPEN_PROBLEM',
        slug: problem.slug,
      });
    } catch (error) {
      console.error('Failed to open problem:', error);
    }
  };

  // Sync problems
  const handleSync = async () => {
    setIsLoading(true);
    try {
      await browser.runtime.sendMessage({
        type: 'SYNC_PROBLEMS',
      });

      const response = await browser.runtime.sendMessage({
        type: 'CHECK_SYNC_STATUS',
      });

      if (response?.success) {
        setSyncStatus({
          isStale: response.data.isStale,
          lastSync: response.data.lastSync ? new Date(response.data.lastSync) : null,
          totalCount: response.data.totalCount,
        });
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[var(--background)] overflow-hidden font-[var(--font-sans)] flex flex-col">
      <Header syncStatus={syncStatus} isLoading={isLoading} onSync={handleSync} />

      <SearchInput
        query={query}
        isLoading={isLoading}
        inputRef={inputRef}
        onQueryChange={handleQueryChange}
        onKeyDown={handleKeyDown}
      />

      <ResultsList
        results={results}
        query={query}
        isLoading={isLoading}
        selectedIndex={selectedIndex}
        onOpenProblem={openProblem}
        slashCommandSuggestions={slashCommandSuggestions}
        onSelectSlashCommand={handleSlashCommandSelect}
      />

      <Footer />
    </div>
  );
}

export default App;
