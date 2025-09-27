import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'LeetJump',
    description: 'Quick LeetCode problem search with Alt+L - minimal, fast, and clean interface',
    version: '1.0.0',
    permissions: ['storage', 'notifications', 'alarms', 'commands'],
    host_permissions: ['<all_urls>'],
    commands: {
      _execute_action: {
        suggested_key: {
          default: 'Alt+L',
          mac: 'Alt+L',
          windows: 'Alt+L',
          chromeos: 'Alt+L',
          linux: 'Alt+L',
        },
        description: 'Activate the extension',
      },
    },
  },
});
