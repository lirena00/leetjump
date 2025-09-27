# LeetJump

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![WXT](https://img.shields.io/badge/WXT-67d55e?style=flat&logo=webextension&logoColor=white)](https://wxt.dev/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)

> **Quick navigation to LeetCode problems with keyboard shortcuts**

A powerful browser extension that provides instant access to LeetCode problems
through a beautiful, keyboard-driven interface. Never lose momentum during your
coding practice again!

## Features

- **Instant Search**: Search 3000+ LeetCode problems by number, title.
- **Keyboard Shortcuts**: `Alt+L` to open anywhere on any website
- **Smart Matching**: Find problems by ID (e.g., "1"), partial titles
- **Modern UI**: Clean, minimal interface that doesn't interfere with your
  workflow
- **Offline Ready**: Problems cached locally for lightning-fast searches
- **Auto-sync**: Automatically keeps problem database up-to-date
- **Rich Metadata**: Difficulty levels, premium status, and acceptance rates

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

1. **Open the lookup**: Press `Alt+L` on any webpage
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

### Data Features

- Problem solving progress tracking
- Personal notes and bookmarks
- Recently viewed problems history
- Offline synchronization improvements

### Advanced Features

- Problem recommendations based on solving patterns
- Integration with other coding platforms
- Performance analytics and statistics

Then reload the page and check console for detailed logs.

### Support

- **Bug Reports**: [GitHub Issues](https://github.com/lirena00/leetjump/issues)
- **Feature Requests**:
  [GitHub Issues](https://github.com/lirena00/leetjump/issues)
- **Discussions**:
  [GitHub Discussions](https://github.com/lirena00/leetjump/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

---

**Star this repository if you find it useful!**
