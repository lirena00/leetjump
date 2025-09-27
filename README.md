# LeetJump

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![WXT](https://img.shields.io/badge/WXT-FF6B35?style=flat&logo=webextension&logoColor=white)](https://wxt.dev/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Quick navigation to LeetCode problems with keyboard shortcuts - like Raycast
> for coding interviews**

A powerful browser extension that provides instant access to LeetCode problems
through a beautiful, keyboard-driven interface. Never lose momentum during your
coding practice again!

## Features

- **Instant Search**: Search 3000+ LeetCode problems by number, title, or topic
  tags
- **Keyboard Shortcuts**: `Alt+M` to open anywhere on any website
- **Smart Matching**: Find problems by ID (e.g., "1"), partial titles, or topic
  tags
- **Modern UI**: Clean, minimal interface that doesn't interfere with your
  workflow
- **Offline Ready**: Problems cached locally for lightning-fast searches
- **Auto-sync**: Automatically keeps problem database up-to-date
- **Rich Metadata**: Difficulty levels, premium status, topic tags, and
  acceptance rates
- **Universal**: Works on any website - practice anywhere, anytime

## Quick Start

### Installation

#### From Chrome Web Store (Coming Soon)

Visit the Chrome Web Store page (link coming soon) and click "Add to Chrome".

#### Manual Installation (Development)

1. Download the latest release from
   [GitHub Releases](https://github.com/lirena00/leetjump/releases)
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the downloaded folder
5. The extension will automatically sync LeetCode problems on first install

### Usage

1. **Open the lookup**: Press `Alt+M` on any webpage
2. **Search**: Type to search problems:
   - By number: `"1"` → Two Sum
   - By title: `"binary"` → All binary search problems
3. **Navigate**: Use ↑↓ arrow keys to navigate results
4. **Open**: Press Enter or click to open the problem in a new tab
5. **Close**: Press Escape or click outside the popup

## Development

### Prerequisites

- Node.js 18+
- Bun (recommended package manager)
- Chrome/Firefox/Edge browser for testing

### Setup

```bash
# Clone the repository
git clone https://github.com/lirena00/leetjump.git
cd leetjump

# Install dependencies
bun install

# Start development mode
bun dev
```

The extension will auto-reload as you make changes!

### Commands

```bash
# Development
bun dev                  # Start development mode with auto-reload
bun run build           # Build for production
```

### Project Structure

```
leetjump/
├── entrypoints/
│   ├── background.ts           # Background script - handles API & shortcuts
│   ├── content.ts              # Content script - injects popup UI
│   └── popup/                  # Browser action popup (optional)
│       ├── App.tsx            # Main popup component
│       ├── main.tsx           # React entry point
│       ├── index.html         # Popup HTML
│       └── style.css          # Popup styles
├── components/
│   ├── Header.tsx             # Popup header component
│   ├── SearchInput.tsx        # Search input component
│   ├── ResultsList.tsx        # Search results list
│   ├── ProblemItem.tsx        # Individual problem item
│   ├── Footer.tsx             # Popup footer
│   ├── EmptyState.tsx         # Empty state component
│   └── icons/                 # Icon components
├── utils/
│   ├── database.ts            # IndexedDB wrapper for local storage
│   └── leetcode-api.ts        # LeetCode API service
├── public/
│   └── icon/                  # Extension icons
├── wxt.config.ts              # WXT framework configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.mjs         # PostCSS configuration
└── package.json
```

### Key Technologies

- **[WXT](https://wxt.dev/)**: Modern web extension framework with hot reload
- **React 18**: UI framework with modern patterns and hooks
- **TypeScript**: Type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **IndexedDB (via idb)**: Local problem caching for offline access
- **Shadow DOM**: Isolated UI that doesn't conflict with host websites
- **Bun**: Fast JavaScript runtime and package manager

## Architecture

### Data Flow

1. **Background Script**: Fetches problems from LeetCode API on install and
   periodically
2. **IndexedDB**: Stores 3000+ problems locally for instant access
3. **Content Script**: Injects Shadow DOM popup on any website via Alt+M
4. **Search Engine**: Real-time search across cached problems with fuzzy
   matching
5. **Navigation**: Opens selected problems in new tabs via browser API

### Extension Components

- **Background Script (`background.ts`)**:

  - Handles LeetCode API communication
  - Manages data syncing and caching
  - Processes keyboard shortcuts
  - Manages extension lifecycle and alarms

- **React Components**:

  - Modern functional components with TypeScript
  - Keyboard navigation support
  - Responsive design for different screen sizes

- **Database Layer**:
  - IndexedDB wrapper for local storage
  - Efficient search and filtering
  - Data persistence across browser sessions

### Security & Privacy

- No tracking or analytics
- No data collection or transmission to third parties
- Problems cached locally in your browser only
- Communicates only with official LeetCode API
- Minimal browser permissions requested
- Shadow DOM isolation prevents style conflicts

## API Reference

The extension uses LeetCode's official API to fetch problem metadata. The
background script handles all API communication with automatic fallback to
sample data for development.

### Sample API Response Structure

```typescript
interface LeetCodeProblem {
  id: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isPaidOnly: boolean;
  topicTags: string[];
  companyTags: string[];
  acRate: number;
  status?: 'ac' | 'notac' | null;
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md)
for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly across browsers
4. Commit using conventional commits:
   `git commit -m "feat: add amazing feature"`
5. Push and create a Pull Request

### Development Workflow

- Use TypeScript for all new code
- Follow existing code style (Prettier configured)
- Test on multiple browsers (Chrome, Firefox, Edge)
- Ensure keyboard navigation works correctly
- Update documentation as needed

## Roadmap

### Search Enhancements

- Fuzzy search with intelligent scoring
- Search by company tags
- Advanced filtering by difficulty/status/tags
- Search history and suggestions

### UI Improvements

- Dark mode support with system preference detection
- Customizable themes and color schemes
- Keyboard shortcut customization
- Improved accessibility features

### Data Features

- Problem solving progress tracking
- Personal notes and bookmarks
- Recently viewed problems history
- Offline synchronization improvements

### Advanced Features

- Problem recommendations based on solving patterns
- Integration with other coding platforms
- Study plan integration and progress tracking
- Performance analytics and statistics

## Troubleshooting

### Common Issues

**Extension doesn't respond to Alt+M**

- Ensure you're not focused in an input field when pressing the shortcut
- Check if another extension is using the same shortcut
- Try refreshing the page and testing again
- Verify the extension is enabled in your browser settings

**No problems showing up in search**

- Check the browser console for errors (F12 → Console)
- Wait for initial sync to complete (may take a few minutes on first install)
- Try reloading the extension from the browser's extension management page

**Popup doesn't appear or appears incorrectly**

- Disable other extensions temporarily to check for conflicts
- Clear browser cache and reload the current page
- Check if the website has strict Content Security Policy restrictions
- Ensure JavaScript is enabled for the current website

**Performance issues or slow search**

- Clear extension storage: Browser Settings → Privacy → Clear browsing data →
  Extensions
- Restart your browser to free up memory
- Check available disk space for IndexedDB storage

### Debugging

Enable debug logging by opening browser console and typing:

```javascript
localStorage.setItem('leetjump-debug', 'true');
```

Then reload the page and check console for detailed logs.

### Browser Compatibility

- **Chrome**: Full support (Manifest V3)
- **Firefox**: Full support (Manifest V2)
- **Edge**: Full support (Manifest V3)
- **Safari**: Planned support
- **Opera**: Should work (Chromium-based)

### Support

- **Bug Reports**: [GitHub Issues](https://github.com/lirena00/leetjump/issues)
- **Feature Requests**:
  [GitHub Issues](https://github.com/lirena00/leetjump/issues)
- **Discussions**:
  [GitHub Discussions](https://github.com/lirena00/leetjump/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Acknowledgments

- [LeetCode](https://leetcode.com/) for providing the excellent platform and API
  access
- [WXT Framework](https://wxt.dev/) for making browser extension development
  enjoyable
- [Bun](https://bun.sh/) for fast and reliable JavaScript tooling
- The open-source community for inspiration and continuous improvement

---

**Star this repository if you find it useful!**

Made with care for the coding interview community.
