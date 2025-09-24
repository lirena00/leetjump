import { Database, RotateCw } from 'lucide-react';

interface SyncStatus {
  isStale: boolean;
  lastSync: Date | null;
  totalCount: number;
}

interface HeaderProps {
  syncStatus: SyncStatus | null;
  isLoading: boolean;
  onSync: () => void;
}

export default function Header({ syncStatus, isLoading, onSync }: HeaderProps) {
  return (
    <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--card)] flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[var(--primary)] rounded-[var(--radius)] flex items-center justify-center">
            <Database className="w-3 h-3 text-[var(--primary-foreground)]" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[var(--foreground)]">LeetCode Lookup</h1>
            <p className="text-xs text-[var(--muted-foreground)]">Quick problem navigation</p>
          </div>
        </div>

        {syncStatus && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-semibold text-[var(--foreground)]">
                {syncStatus.totalCount.toLocaleString()}
              </div>
              <div className="text-xs text-[var(--muted-foreground)]">problems</div>
            </div>
            {syncStatus.isStale && (
              <button
                onClick={onSync}
                disabled={isLoading}
                className="minimal-button px-2 py-1 text-xs text-[var(--muted-foreground)] border border-[var(--border)] rounded-[var(--radius-md)] hover:bg-[var(--accent)] disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-1">
                    <RotateCw className="w-3 h-3 animate-spin" />
                    Sync
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <RotateCw className="w-3 h-3" />
                    Sync
                  </div>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
