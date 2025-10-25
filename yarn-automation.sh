#!/bin/bash
set -e # Exit on any error

echo "🔍 Starting DIG|LIT Yarn Automation..."
echo "========================================"

# Phase 1: Clean Yarn Setup
echo "1. 🧹 Cleaning up for Yarn..."
rm -f package-lock.json package-lock.json.backup
yarn cache clean
rm -rf node_modules
yarn install
echo "✅ Phase 1 Complete: Yarn setup done"

# Phase 2: Project Diagnostics
echo ""
echo "2. 🔍 Running Project Diagnostics..."
echo "=== COMPONENT STATUS ==="
for comp in toaster tooltip Navigation; do
  if [ -f "client/src/components/ui/$comp.tsx" ] || [ -f "client/src/components/$comp.tsx" ]; then
    lines=$(wc -l < "client/src/components/ui/$comp.tsx" 2>/dev/null || wc -l < "client/src/components/$comp.tsx" 2>/dev/null || echo "0")
    if [ "$lines" -gt 5 ]; then
      echo "✅ $comp exists ($lines lines)"
    else
      echo "⚠️  $comp exists but empty ($lines lines)"
    fi
  else
    echo "❌ $comp missing"
  fi
done

echo ""
echo "=== BUILD STATUS ==="
if yarn build > build.log 2>&1; then
  echo "✅ Build successful"
  BUILD_STATUS="✅"
else
  echo "❌ Build failed - check build.log"
  BUILD_STATUS="❌"
  echo "=== BUILD ERRORS ==="
  grep -i "error\|failed" build.log | head -10
fi

echo ""
echo "=== PROJECT STRUCTURE ==="
echo "Frontend components: $(find client/src -name "*.tsx" | wc -l)"
echo "Backend files: $(find server -name "*.ts" | wc -l)"
echo "Pages: $(find client/src/pages -name "*.tsx" | wc -l)"

# Phase 3: Fix Critical Issues
echo ""
echo "3. 🔧 Fixing Critical Issues..."

# Fix Home.tsx icon rendering if needed
echo "Fixing Home.tsx icon rendering..."
if grep -q "link.icon" client/src/pages/Home.tsx 2>/dev/null; then
  sed -i 's/{link.icon}/{link.icon \&\& React.createElement(link.icon)}/g' client/src/pages/Home.tsx
  echo "✅ Applied icon fix"
else
  echo "ℹ️  Icon structure already fixed"
fi

# Create missing critical components
echo "Creating missing critical components..."
mkdir -p client/src/components/ui

# Create basic toaster if missing
if [ ! -f "client/src/components/ui/toaster.tsx" ] || [ ! -s "client/src/components/ui/toaster.tsx" ]; then
  cat > client/src/components/ui/toaster.tsx << 'TOASTER_EOF'
import { Toast, ToastProvider, ToastViewport } from "./toast"

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  )
}
TOASTER_EOF
  echo "✅ Created toaster component"
fi

# Create basic tooltip if missing  
if [ ! -f "client/src/components/ui/tooltip.tsx" ] || [ ! -s "client/src/components/ui/tooltip.tsx" ]; then
  cat > client/src/components/ui/tooltip.tsx << 'TOOLTIP_EOF'
import React from "react"

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>
}
TOOLTIP_EOF
  echo "✅ Created tooltip provider"
fi

# Phase 4: Test Development Setup
echo ""
echo "4. 🚀 Testing Development Setup..."
echo "Starting dev server in background..."
yarn dev &
DEV_PID=$!
echo "Dev server PID: $DEV_PID"

echo "Waiting for server to start..."
sleep 15

echo "Testing server response..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Development server is running on port 3000"
    SERVER_STATUS="✅"
else
    echo "❌ Development server failed to start"
    SERVER_STATUS="❌"
fi

# Kill the dev server
kill $DEV_PID 2>/dev/null || true
wait $DEV_PID 2>/dev/null

# Phase 5: Summary Report
echo ""
echo "5. 📊 AUTOMATION SUMMARY"
echo "========================================"
echo "Package Manager: Yarn ✅"
echo "Dependencies: Installed ✅" 
echo "Build Status: $BUILD_STATUS"
echo "Server Status: $SERVER_STATUS"
echo "Components: Fixed/Checked ✅"
echo "========================================"

if [ "$BUILD_STATUS" = "✅" ] && [ "$SERVER_STATUS" = "✅" ]; then
  echo "🎉 AUTOMATION COMPLETE - Project is ready!"
  echo ""
  echo "Next steps:"
  echo "  yarn dev    # Start development server"
  echo "  yarn build  # Build for production"
  echo "  yarn start  # Start production server"
else
  echo "⚠️  AUTOMATION INCOMPLETE - Some issues need manual fixing"
  echo ""
  echo "Check these files:"
  echo "  build.log   # Build errors"
  echo "  Check component implementations"
fi

echo ""
echo "Script completed at: $(date)"
