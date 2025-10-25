#!/bin/bash
set -e

echo "🔍 DIG|LIT FORENSIC ANALYSIS REPORT"
echo "======================================"
echo "Analysis started: $(date)"
echo ""

# Phase 1: Build System Analysis
echo "1. 📊 BUILD SYSTEM ANALYSIS"
echo "---------------------------"
echo "Node version: $(node --version)"
echo "Yarn version: $(yarn --version)"
echo ""

echo "=== BUILD OUTPUT STRUCTURE ==="
find dist -type f -name "*.html" -o -name "*.js" -o -name "*.css" | head -20
echo ""

echo "=== BUILD SIZE ANALYSIS ==="
du -sh dist/
du -sh dist/public/ 2>/dev/null || echo "No dist/public directory"
echo ""

# Phase 2: Server Configuration Analysis
echo ""
echo "2. 🖥️ SERVER CONFIGURATION ANALYSIS"
echo "-----------------------------------"
echo "=== SERVER INDEX.TS ANALYSIS ==="
if [ -f "server/index.ts" ]; then
  echo "Server file exists ($(wc -l < server/index.ts) lines)"
  grep -n "static\|express\.static\|public\|dist" server/index.ts || echo "No static file serving detected"
else
  echo "❌ server/index.ts not found"
fi

echo ""
echo "=== EXPRESS ROUTES ==="
grep -n "app\.get\|app\.use\|app\.post\|router\." server/index.ts server/routes/*.ts 2>/dev/null | head -20 || echo "No route definitions found"

# Phase 3: Frontend Routing Analysis
echo ""
echo "3. 🗺️ FRONTEND ROUTING ANALYSIS"
echo "-------------------------------"
echo "=== ROUTER CONFIGURATION ==="
if [ -f "client/src/App.tsx" ]; then
  grep -A 10 -B 2 "Router\|Route\|Switch" client/src/App.tsx | head -20
else
  echo "❌ App.tsx not found"
fi

echo ""
echo "=== VITE CONFIG ==="
if [ -f "vite.config.ts" ]; then
  grep -n "build\|outDir\|publicDir" vite.config.ts
else
  echo "❌ vite.config.ts not found"
fi

# Phase 4: Production Build Analysis
echo ""
echo "4. 🏗️ PRODUCTION BUILD ANALYSIS"
echo "-------------------------------"
echo "=== BUILD ARTIFACTS ==="
ls -la dist/ 2>/dev/null || echo "No dist directory"
echo ""

echo "=== INDEX.HTML CONTENT ==="
if [ -f "dist/public/index.html" ]; then
  head -20 dist/public/index.html
elif [ -f "dist/index.html" ]; then
  head -20 dist/index.html
else
  echo "❌ No index.html found in build output"
fi

# Phase 5: Live Production Test
echo ""
echo "5. 🧪 LIVE PRODUCTION TEST"
echo "---------------------------"
echo "Starting production server for testing..."
yarn build

# Check if backend serves frontend
if grep -q "express\.static" server/index.ts; then
  echo "✅ Express static serving configured"
  yarn start &
  SERVER_PID=$!
  sleep 5
  
  echo "Testing production routes..."
  for route in "" solutions services shop login; do
    echo -n "Testing /$route ... "
    if curl -s -f "http://localhost:5000/$route" > /dev/null 2>&1; then
      echo "✅"
    else
      echo "❌"
    fi
  done
  
  kill $SERVER_PID 2>/dev/null || true
else
  echo "❌ Express not configured to serve frontend"
fi

# Phase 6: SPA Routing Analysis
echo ""
echo "6. 📱 SPA ROUTING ANALYSIS"
echo "---------------------------"
echo "=== CLIENT-SIDE ROUTING ==="
find client/src -name "*.tsx" -exec grep -l "Router\|Route\|Link\|navigate" {} \; | head -10

echo ""
echo "=== ROUTE COMPONENTS ==="
for page in Home Solutions Services Shop Login; do
  if [ -f "client/src/pages/${page}.tsx" ]; then
    echo "✅ $page.tsx: $(wc -l < client/src/pages/${page}.tsx) lines"
  else
    echo "❌ $page.tsx: MISSING"
  fi
done

# Phase 7: Critical Issues Detection
echo ""
echo "7. ⚠️ CRITICAL ISSUES DETECTION"
echo "-------------------------------"

# Check for common SPA issues
echo "=== SPA CONFIGURATION ==="
if [ -f "dist/public/index.html" ]; then
  if grep -q "DOCTYPE" dist/public/index.html; then
    echo "✅ index.html is proper HTML"
  else
    echo "❌ index.html might be corrupted"
  fi
fi

echo ""
echo "=== STATIC ASSET SERVING ==="
if [ -f "server/index.ts" ]; then
  if grep -q "express\.static" server/index.ts; then
    echo "✅ Express static serving found"
    grep "express\.static" server/index.ts
  else
    echo "❌ No static file serving configured"
  fi
fi

echo ""
echo "=== FALLBACK ROUTING ==="
if grep -q "app\.get.*\*" server/index.ts || grep -q "app\.get.*index\.html" server/index.ts; then
  echo "✅ SPA fallback route found"
else
  echo "❌ No SPA fallback route for client-side routing"
fi

# Phase 8: Recommendations
echo ""
echo "8. 💡 RECOMMENDATIONS"
echo "---------------------"

if ! grep -q "express\.static" server/index.ts 2>/dev/null; then
  echo "🔧 ISSUE: Express not serving static files"
  echo "   SOLUTION: Add this to server/index.ts:"
  echo "   app.use(express.static(path.join(__dirname, '../dist/public')))"
  echo "   app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../dist/public/index.html')) })"
fi

if [ ! -f "dist/public/index.html" ]; then
  echo "🔧 ISSUE: Frontend not built to expected location"
  echo "   SOLUTION: Check vite.config.ts build output directory"
fi

if ! grep -q "app\.get.*\*" server/index.ts 2>/dev/null; then
  echo "🔧 ISSUE: No SPA fallback route"
  echo "   SOLUTION: Add catch-all route to serve index.html for client-side routes"
fi

echo ""
echo "======================================"
echo "Forensic analysis completed: $(date)"
echo ""

# Create quick fix script
cat > fix-spa-routing.sh << 'FIX_EOF'
#!/bin/bash
echo "🔧 Applying SPA Routing Fix..."

# Check if server/index.ts needs fixing
if [ -f "server/index.ts" ] && ! grep -q "express.static" server/index.ts; then
  echo "Adding static file serving to Express..."
  cat >> server/index.ts << 'STATIC_EOF'

// SPA Static File Serving - Added by fix script
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist/public')));

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});
STATIC_EOF
  echo "✅ Static serving added"
else
  echo "ℹ️ Static serving already configured"
fi

echo "🔧 Rebuilding application..."
yarn build

echo "🚀 Starting fixed production server..."
yarn start
FIX_EOF

chmod +x fix-spa-routing.sh

echo "🚀 QUICK FIX SCRIPT CREATED: ./fix-spa-routing.sh"
echo "   Run this to automatically fix SPA routing issues"
