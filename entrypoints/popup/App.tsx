import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LeetCodeProblem } from '@/utils/database';

import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import ResultsList from '@/components/ResultsList';
import Footer from '@/components/Footer';

interface SearchResult extends LeetCodeProblem {
  matchType?: 'id' | 'title' | 'tag';
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

  const inputRef = useRef<HTMLInputElement>(null);

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

  // Search function with debouncing
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
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
          // Determine match type for better UX
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
    const timer = setTimeout(() => {
      performSearch(query);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;

        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;

        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            openProblem(results[selectedIndex]);
          }
          break;
      }
    },
    [results, selectedIndex]
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

      // Refresh sync status
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
        onQueryChange={setQuery}
        onKeyDown={handleKeyDown}
      />

      <ResultsList
        results={results}
        query={query}
        isLoading={isLoading}
        selectedIndex={selectedIndex}
        onOpenProblem={openProblem}
      />

      <Footer />
    </div>
  );
}

export default App;
