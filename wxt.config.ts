import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'LeetJump',
    description: 'Quick LeetCode problem search with Alt+M - minimal, fast, and clean interface',
    version: '1.0.0',
    permissions: ['storage', 'activeTab', 'tabs', 'notifications', 'alarms', 'commands'],
    host_permissions: ['<all_urls>'],
    commands: {
      _execute_action: {
        suggested_key: {
          default: 'Alt+M',
          mac: 'Alt+M',
          windows: 'Alt+M',
          chromeos: 'Alt+M',
          linux: 'Alt+M',
        },
        description: 'Activate the extension',
      },
    },
  },
});
