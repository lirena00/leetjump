import { ChevronUp, ChevronDown, Heart } from 'lucide-react';
import { Discord } from '@/components/icons/discord';
import { Github } from '@/components/icons/github';
import { Buymeacoffee } from '@/components/icons/buymeacoffee';
export default function Footer() {
  return (
    <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--muted)] flex-shrink-0">
      <div className="flex justify-between items-center text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <ChevronUp className="w-3 h-3" />
            <ChevronDown className="w-3 h-3" />
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-sm)] text-xs">
              Enter
            </kbd>
            <span>Open</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-1 py-0.5 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-sm)] text-xs">
            Alt+M
          </kbd>
          <span>Quick access</span>
        </div>
      </div>

      {/* Links and Attribution */}
      <div className="flex justify-between items-center text-xs text-[var(--muted-foreground)] mt-2 pt-2 border-t border-[var(--border)]">
        <div className="flex items-center gap-3 border-separate">
          <a
            href="https://github.com/lirena00/leetjump"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
            title="GitHub Repository"
          >
            <Github className="w-3 h-3" />
            <span>GitHub</span>
          </a>
          <a
            href="https://discord.gg/your-discord-invite"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
            title="Discord Support"
          >
            <Discord className="w-3 h-3" />
            <span>Discord</span>
          </a>
          <a
            href="mailto:support@example.com"
            className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
            title="Support"
          >
            <Buymeacoffee className="w-3 h-3 text-amber-300" />
            <span>Support</span>
          </a>
        </div>
        <div className="flex items-center gap-1">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-red-500" />
          <span>by</span>
          <a
            href="https://www.lirena.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted hover:text-[var(--foreground)] transition-colors"
          >
            lirena00
          </a>
        </div>
      </div>
    </div>
  );
}
