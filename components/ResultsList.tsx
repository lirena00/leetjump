import { useEffect, useRef } from 'react';
import { LeetCodeProblem } from '@/utils/database';
import ProblemItem from './ProblemItem';
import EmptyState from './EmptyState';

interface SearchResult extends LeetCodeProblem {
  matchType?: 'id' | 'title' | 'tag';
}

interface ResultsListProps {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
  selectedIndex: number;
  onOpenProblem: (problem: LeetCodeProblem) => void;
}

export default function ResultsList({
  results,
  query,
  isLoading,
  selectedIndex,
  onOpenProblem,
}: ResultsListProps) {
  const hasResults = results.length > 0;
  const shouldShowEmpty = !hasResults && !isLoading;
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll to selected item
  useEffect(() => {
    if (hasResults && selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      const selectedElement = itemRefs.current[selectedIndex];
      const container = containerRef.current;

      if (selectedElement && container) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = selectedElement.getBoundingClientRect();

        // Check if element is outside the visible area
        const isAboveView = elementRect.top < containerRect.top;
        const isBelowView = elementRect.bottom > containerRect.bottom;

        if (isAboveView || isBelowView) {
          selectedElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }
    }
  }, [selectedIndex, hasResults]);

  // Reset refs when results change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, results.length);
  }, [results.length]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto">
      {shouldShowEmpty && <EmptyState hasQuery={!!query} isLoading={isLoading} />}

      {hasResults && (
        <div className="space-y-0">
          {results.map((problem, index) => (
            <ProblemItem
              key={problem.id}
              ref={(el: HTMLDivElement | null) => {
                itemRefs.current[index] = el;
              }}
              problem={problem}
              index={index}
              selectedIndex={selectedIndex}
              onOpen={onOpenProblem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
