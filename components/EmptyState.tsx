interface EmptyStateProps {
  hasQuery: boolean;
  isLoading: boolean;
}

export default function EmptyState({ hasQuery, isLoading }: EmptyStateProps) {
  if (hasQuery && !isLoading) {
    return (
      <div className="px-4 py-12 text-center">
        <div className="text-sm font-medium text-[var(--foreground)] mb-1">No problems found</div>
        <div className="text-xs text-[var(--muted-foreground)]">
          Try searching by number, title, or tag
        </div>
      </div>
    );
  }

  if (!hasQuery) {
    return (
      <div className="px-4 py-12 text-center">
        <div className="text-sm font-medium text-[var(--foreground)] mb-2">
          Ready to search problems
        </div>
        <div className="text-xs text-[var(--muted-foreground)] space-y-1">
          <div>
            Try:{' '}
            <code className="bg-[var(--muted)] px-1.5 py-0.5 rounded-[var(--radius-md)] text-xs">
              "two sum"
            </code>{' '}
            or{' '}
            <code className="bg-[var(--muted)] px-1.5 py-0.5 rounded-[var(--radius-md)] text-xs">
              "1"
            </code>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
