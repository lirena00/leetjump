import React from 'react';
import { Search, RotateCw } from 'lucide-react';

interface SearchInputProps {
  query: string;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onQueryChange: (query: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function SearchInput({
  query,
  isLoading,
  inputRef,
  onQueryChange,
  onKeyDown,
}: SearchInputProps) {
  return (
    <div className="px-4 py-3 flex-shrink-0">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-[var(--muted-foreground)]" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search by number, title, or tags..."
          className="w-full pl-10 pr-10 py-2 text-sm bg-[var(--muted)] border-0 rounded-[var(--radius-md)] focus:outline-none focus:bg-[var(--background)] focus:ring-1 focus:ring-[var(--ring)] transition-all placeholder:text-[var(--muted-foreground)]"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <RotateCw className="w-4 h-4 text-[var(--muted-foreground)] animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
