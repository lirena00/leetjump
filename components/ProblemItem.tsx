import { forwardRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { LeetCodeProblem } from '@/utils/database';

interface SearchResult extends LeetCodeProblem {
  matchType?: 'id' | 'title' | 'tag';
}

interface ProblemItemProps {
  problem: SearchResult;
  index: number;
  selectedIndex: number;
  onOpen: (problem: LeetCodeProblem) => void;
}

const ProblemItem = forwardRef<HTMLDivElement, ProblemItemProps>(
  ({ problem, index, selectedIndex, onOpen }, ref) => {
    const getDifficultyDot = (difficulty: string) => {
      switch (difficulty.toLowerCase()) {
        case 'easy':
          return 'difficulty-easy';
        case 'medium':
          return 'difficulty-medium';
        case 'hard':
          return 'difficulty-hard';
        default:
          return 'difficulty-medium';
      }
    };

    const getDifficultyText = (difficulty: string) => {
      return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
    };

    return (
      <div
        ref={ref}
        className={`group px-4 py-3 cursor-pointer transition-all duration-150 border-l-2 ${
          index === selectedIndex
            ? 'bg-[var(--accent)] border-l-[var(--primary)] border-l-4'
            : 'hover:bg-[var(--accent)] border-l-transparent'
        }`}
        onClick={() => onOpen(problem)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Problem ID */}
            <div className="flex-shrink-0">
              <span className="text-xs font-semibold text-[var(--muted-foreground)] w-8">
                {problem.id}
              </span>
            </div>

            {/* Problem Details */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-[var(--foreground)] text-sm mb-0.5 truncate">
                {problem.title}
              </div>
            </div>
          </div>

          {/* Difficulty and Status */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className={`difficulty-dot ${getDifficultyDot(problem.difficulty)}`}></span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {getDifficultyText(problem.difficulty)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {problem.isPaidOnly && (
                <span className="text-xs text-[var(--chart-2)] font-medium">PRO</span>
              )}
              <ExternalLink className="w-3 h-3 text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProblemItem.displayName = 'ProblemItem';

export default ProblemItem;
