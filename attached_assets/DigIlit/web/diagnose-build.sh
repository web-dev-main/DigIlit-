#!/bin/bash

echo "=========================================="
echo "🔍 DIGLIT BUILD DIAGNOSTIC REPORT"
echo "=========================================="
echo ""

# 1. Check current directory
echo "📁 Current Directory:"
pwd
echo ""

# 2. Check TypeScript config
echo "📋 TypeScript Configuration:"
echo "----------------------------"
if [ -f "tsconfig.json" ]; then
    echo "✅ tsconfig.json exists"
    echo "Exclude patterns:"
    grep -A 5 '"exclude"' tsconfig.json || echo "No exclude patterns found"
else
    echo "❌ tsconfig.json not found"
fi
echo ""

# 3. List all TypeScript/TSX files
echo "📄 All TypeScript Files Being Compiled:"
echo "---------------------------------------"
find app -name "*.tsx" -o -name "*.ts" 2>/dev/null | sort
echo ""
echo "Old component files (should be excluded):"
find components.old -name "*.tsx" -o -name "*.ts" 2>/dev/null | sort
echo ""

# 4. Check for ReactNode type issues
echo "🔍 Files with ReactNode Type Issues:"
echo "------------------------------------"
grep -r "{ children.*ReactNode" . --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "node_modules" | grep -v ".next"
echo ""

# 5. Check imports in page.tsx
echo "📦 Imports in app/page.tsx:"
echo "---------------------------"
head -30 app/page.tsx | grep "^import" || echo "No imports in first 30 lines"
echo ""

# 6. Check Next.js config
echo "⚙️  Next.js Configuration:"
echo "-------------------------"
if [ -f "next.config.mjs" ]; then
    cat next.config.mjs
elif [ -f "next.config.js" ]; then
    cat next.config.js
else
    echo "❌ No Next.js config found"
fi
echo ""

# 7. Check package.json scripts
echo "📦 Build Scripts:"
echo "----------------"
grep -A 3 '"scripts"' package.json
echo ""

# 8. Check for multiple React versions
echo "🔄 React Version Check:"
echo "----------------------"
echo "Direct dependencies:"
grep -E '"react"|"@types/react"' package.json
echo ""
echo "Root dependencies:"
grep -E '"react"|"@types/react"' ../../package.json 2>/dev/null || echo "No root package.json"
echo ""

# 9. Summary and Recommendations
echo "=========================================="
echo "📊 DIAGNOSIS SUMMARY"
echo "=========================================="
echo ""

ISSUE_COUNT=0

# Check if components.old is being compiled
if grep -q "components.old" tsconfig.json 2>/dev/null; then
    echo "❌ ISSUE 1: components.old is NOT excluded from TypeScript compilation"
    echo "   FIX: Update tsconfig.json to exclude 'components.old'"
    ((ISSUE_COUNT++))
else
    if find components.old -name "*.tsx" 2>/dev/null | grep -q .; then
        echo "⚠️  WARNING: components.old exists but may not be properly excluded"
        echo "   FIX: Verify tsconfig.json excludes 'components.old'"
        ((ISSUE_COUNT++))
    fi
fi

# Check if there are unused imports
if grep -q "from.*components" app/page.tsx 2>/dev/null; then
    echo "❌ ISSUE 2: app/page.tsx imports from old components"
    echo "   FIX: Remove component imports from page.tsx"
    ((ISSUE_COUNT++))
fi

# Check React type consistency
REACT_ISSUES=$(grep -r "{ children.*ReactNode" . --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "React.ReactNode" | wc -l)
if [ $REACT_ISSUES -gt 0 ]; then
    echo "❌ ISSUE 3: Found $REACT_ISSUES files with ReactNode type issues"
    echo "   FIX: Change 'ReactNode' to 'React.ReactNode' in all files"
    ((ISSUE_COUNT++))
fi

echo ""
if [ $ISSUE_COUNT -eq 0 ]; then
    echo "✅ No obvious issues found. The build should work!"
else
    echo "🔧 Total Issues Found: $ISSUE_COUNT"
    echo ""
    echo "🎯 RECOMMENDED ACTIONS:"
    echo "1. Update tsconfig.json to exclude components.old"
    echo "2. Verify app/page.tsx has no old component imports"
    echo "3. Fix any remaining ReactNode type issues"
fi

echo ""
echo "=========================================="
echo "Run 'npm run build' to test the fixes"
echo "=========================================="
