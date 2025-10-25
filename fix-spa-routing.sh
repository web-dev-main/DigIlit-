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
