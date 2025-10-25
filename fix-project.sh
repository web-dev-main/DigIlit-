
#!/bin/bash
set -e # Exit on any error

echo "🔍 Starting project dependency stabilization..."

# Phase 1: Pre-Cleanup & Backup
echo "1. Creating safety backup..."
cp package.json package.json.backup
cp yarn.lock yarn.lock.backup 2>/dev/null || echo "No yarn.lock found, continuing."

# Phase 2: Clear Yarn Cache
echo "2. Clearing yarn cache..."
yarn cache clean

# Phase 3: Address Immediate Conflict
echo "3. Attempting to resolve dependency tree..."
yarn install --check-files

# Phase 4: Core Update and Audit Fix
echo "4. Updating packages and auditing for vulnerabilities..."
yarn upgrade # Updates all packages to latest versions
yarn audit # Shows vulnerabilities (Yarn doesn't have auto-fix like npm audit fix)

# Phase 5: Clean Re-installation for Verification
echo "5. Performing clean installation..."
rm -rf node_modules
yarn install --check-files

echo "✅ Script completed successfully!"
echo "---"
echo "Next steps:"
echo "  1. Run 'yarn test' to verify functionality."
echo "  2. Check 'yarn outdated' again to see remaining updates."
echo "  3. If issues persist, check the detailed report mentioned in your logs."
echo "  4. For security fixes, manually update vulnerable packages shown in 'yarn audit'"
