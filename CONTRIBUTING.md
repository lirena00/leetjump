# Contributing to LeetCode Lookup

We love your input! We want to make contributing to LeetCode Lookup as easy and
transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as
accept pull requests.

### Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively
welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the code builds without errors
5. Make sure your code lints
6. Issue that pull request!

## Setting Up Development Environment

### Prerequisites

- Node.js 18+
- Bun (recommended package manager)
- Chrome/Firefox/Edge for testing

### Setup Steps

```bash
# Fork and clone the repository
git clone https://github.com/lirena00/leetcode-lookup.git
cd leetcode-lookup

# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build
```

### Development Workflow

1. Create a new branch for your feature/fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test thoroughly:

   - Test in multiple browsers (Chrome, Firefox, Edge)
   - Test keyboard shortcuts (Alt+M)
   - Test search functionality
   - Verify popup appearance and functionality
   - Test data syncing on first install

3. Build and test the extension:

   ```bash
   bun run build
   # Load the extension from .output/ directory in your browser
   ```

4. Commit your changes using conventional commit format:

   ```bash
   git commit -m "feat: add dark mode support"
   # or
   git commit -m "fix: resolve popup not appearing on some sites"
   ```

5. Push to your fork and submit a pull request

## Tech Stack

This project uses:

- **WXT Framework**: Modern browser extension development framework
- **TypeScript**: Type-safe JavaScript
- **React**: UI library for components
- **Tailwind CSS**: Utility-first CSS framework
- **IndexedDB**: Local data storage via `idb` library
- **Bun**: JavaScript runtime and package manager

## Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow the existing code style (enforced by Prettier)
- Use meaningful variable and function names
- Prefer async/await over Promises where appropriate

### React Components

- Use functional components with hooks
- Follow the existing component structure
- Use TypeScript interfaces for props
- Handle loading and error states appropriately
- Export components as default exports

### CSS/Styling

- Use Tailwind CSS classes instead of custom CSS where possible
- Follow the existing color scheme and spacing
- Maintain accessibility standards (ARIA labels, keyboard navigation)
- Ensure responsive design for different popup sizes

### Commit Message Format

We use
[Conventional Commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)
format:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:

```
feat: add fuzzy search functionality
fix: resolve keyboard navigation issues in Firefox
docs: update installation instructions
style: format code with prettier
refactor: extract search logic into separate service
test: add unit tests for database utilities
chore: update dependencies
```

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, please test:

- [ ] Extension loads without errors in Chrome
- [ ] Extension loads without errors in Firefox
- [ ] Keyboard shortcut (Alt+M) opens popup
- [ ] Search functionality works correctly
- [ ] Keyboard navigation (↑↓ arrows, Enter, Escape) works
- [ ] Problems open correctly in new tabs
- [ ] Data syncing works on first install
- [ ] No console errors in background script or content script
- [ ] UI is responsive and accessible

### Testing Different Scenarios

Test the extension with:

- [ ] Empty search queries
- [ ] Long search queries
- [ ] Problem ID searches (e.g., "1", "283")
- [ ] Problem title searches (e.g., "two sum")
- [ ] Topic tag searches (e.g., "array", "dynamic programming")
- [ ] Different websites to ensure content script works universally

## Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by
[opening a new issue](https://github.com/lirena00/leetcode-lookup/issues/new?template=bug_report.md).

### Bug Report Guidelines

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Include browser and OS information
- What you expected would happen
- What actually happens
- Console errors (if any)
- Screenshots (if applicable)

## Feature Requests

We use GitHub issues to track feature requests. Request a feature by
[opening a new issue](https://github.com/lirena00/leetcode-lookup/issues/new?template=feature_request.md).

### Feature Ideas

Some areas for potential improvement:

- Enhanced search algorithms (fuzzy search, ranking)
- Additional keyboard shortcuts
- Theme customization
- Problem filtering by difficulty/tags
- Integration with other coding platforms
- Performance optimizations

## Architecture Guidelines

### File Organization

```
leetcode-lookup/
├── entrypoints/          # Extension entry points
│   ├── background.ts     # Background script (API calls, alarms)
│   ├── content.ts        # Content script (popup injection)
│   └── popup/           # Browser action popup (optional)
│       ├── App.tsx      # Main popup component
│       ├── main.tsx     # React entry point
│       ├── index.html   # Popup HTML
│       └── style.css    # Popup styles
├── components/          # React components
│   ├── Header.tsx       # Popup header
│   ├── SearchInput.tsx  # Search input component
│   ├── ResultsList.tsx  # Search results list
│   ├── ProblemItem.tsx  # Individual problem item
│   ├── Footer.tsx       # Popup footer
│   ├── EmptyState.tsx   # Empty state component
│   └── icons/          # Icon components
├── utils/              # Shared utilities
│   ├── database.ts     # IndexedDB operations
│   └── leetcode-api.ts # LeetCode API service
├── wxt.config.ts       # WXT configuration
├── tsconfig.json       # TypeScript configuration
├── postcss.config.mjs  # PostCSS configuration
└── public/            # Static assets (icons, etc.)
```

### Extension Architecture

- **Background Script**: Handles LeetCode API calls, data syncing, keyboard
  shortcuts, and periodic updates
- **Content Script**: Injects the ui into web pages using Shadow DOM
- **React Components**: UI components with TypeScript interfaces for the popup
- **Database Layer**: IndexedDB wrapper for local problem storage and caching
- **API Service**: Handles LeetCode API communication with fallback to sample
  data

### State Management

- Use React's built-in state management (useState, useEffect)
- For extension-wide communication, use `browser.runtime.sendMessage`
- Cache LeetCode problems data in IndexedDB
- Sync data periodically via background script alarms

### WXT Framework Features

This project leverages WXT's features:

- **Auto-reload**: Automatic extension reloading during development
- **TypeScript support**: Built-in TypeScript compilation
- **Multi-browser builds**: Support for Chrome, Firefox, and Safari
- **Manifest generation**: Automatic manifest.json generation
- **Hot module replacement**: Fast development iteration

## Security Guidelines

### Data Privacy

- Never collect or transmit personal user data
- Store LeetCode problems data locally only
- Minimize required browser permissions

### Code Security

- Validate all inputs from external APIs
- Use TypeScript to catch type-related issues
- Sanitize any dynamic content in popup
- Follow browser extension security best practices
- Use Shadow DOM to isolate popup styles

## Release Process

### Version Management

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Steps

1. Update version in `package.json` and `wxt.config.ts`
2. Update `CHANGELOG.md` with release notes
3. Build extension: `bun run build`
4. Test built extension in multiple browsers
5. Create a git tag: `git tag v1.0.0`
6. Push tag: `git push origin v1.0.0`
7. Create GitHub release with built extension files

## Documentation

### Code Documentation

- Use JSDoc for function and class documentation
- Include examples for complex APIs
- Document any non-obvious behavior or assumptions
- Explain business logic in comments

### User Documentation

- Keep README.md up to date with installation and usage instructions
- Add screenshots for UI changes
- Update troubleshooting guides as needed
- Document keyboard shortcuts and features

## Development Commands

```bash
# Install dependencies
bun install

# Start development server with auto-reload
bun dev

# Build for production
bun run build

# Build for specific browser
bun run build --target chrome-mv3
bun run build --target firefox-mv2

# Type checking
bun run typecheck

# Clean build artifacts
bun run clean
```

## Browser Extension Testing

### Loading the Extension

1. Build the extension: `bun run build`
2. Open browser extension management page:
   - Chrome: `chrome://extensions/`
   - Firefox: `about:addons`
   - Edge: `edge://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `.output/chrome-mv3-dev` directory

## Community Guidelines

### Code of Conduct

This project adheres to the Contributor Covenant
[code of conduct](CODE_OF_CONDUCT.md). By participating, you are expected to
uphold this code.

### Communication

- Use GitHub Issues for bugs and feature requests
- Use GitHub Discussions for general questions and ideas
- Be respectful and constructive in all interactions
- Help newcomers get up to speed

## Getting Help

- **Documentation**: Check the README and code comments
- **Issues**:
  [GitHub Issues](https://github.com/yourusername/leetcode-lookup/issues)
- **WXT Documentation**: [WXT Framework Docs](https://wxt.dev/)
- **React Documentation**: [React Docs](https://react.dev/)

## License

By contributing, you agree that your contributions will be licensed under the
MIT License.

---

Thank you for contributing to LeetCode Lookup! 🚀
