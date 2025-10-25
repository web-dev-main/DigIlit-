#!/bin/bash

# Dig|lit Progress Tracker & Analyzer
# Analyzes your repository and generates comprehensive progress reports

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
REPORT_DIR="Z/REPORTS"
REPORT_FILE="$REPORT_DIR/progress_report_$(date +%Y%m%d_%H%M%S).md"
SUMMARY_FILE="Z/PROJECT_TRACKER.md"

# Create reports directory if it doesn't exist
mkdir -p "$REPORT_DIR"

echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║         Dig|lit Progress Tracker & Analyzer v1.0             ║${NC}"
echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to count files
count_files() {
    local dir=$1
    local pattern=$2
    if [ -d "$dir" ]; then
        find "$dir" -type f -name "$pattern" 2>/dev/null | wc -l | tr -d ' '
    else
        echo "0"
    fi
}

# Function to count lines of code
count_loc() {
    local dir=$1
    local pattern=$2
    if [ -d "$dir" ]; then
        find "$dir" -type f -name "$pattern" -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $1}'
    else
        echo "0"
    fi
}

# Function to calculate percentage
calc_percentage() {
    local current=$1
    local total=$2
    if [ "$total" -eq 0 ]; then
        echo "0"
    else
        echo $((current * 100 / total))
    fi
}

# Function to draw progress bar
draw_progress_bar() {
    local percentage=$1
    local width=50
    local filled=$((percentage * width / 100))
    local empty=$((width - filled))
    
    printf "["
    printf "%${filled}s" | tr ' ' '█'
    printf "%${empty}s" | tr ' ' '░'
    printf "] ${percentage}%%"
}

echo -e "${CYAN}📊 Analyzing repository structure...${NC}"
echo ""

# Initialize report
cat > "$REPORT_FILE" << 'EOF'
# Dig|lit Progress Report
Generated: $(date '+%Y-%m-%d %H:%M:%S')

---

EOF

# SECTION 1: Directory Structure Analysis
echo -e "${YELLOW}🏗️  Directory Structure${NC}"
cat >> "$REPORT_FILE" << 'EOF'
## 📁 Directory Structure Analysis

EOF

# Check main folders
declare -A folders=(
    ["FRONTEND"]="Frontend Application"
    ["BACKEND"]="Backend Services"
    ["AI_CORE"]="AI Engine"
    ["BUSINESS_INTELLIGENCE"]="Analytics & BI"
    ["VISUAL_ENGINE"]="Design Assets"
    ["Z"]="Command Center"
)

for folder in "${!folders[@]}"; do
    if [ -d "$folder" ]; then
        echo -e "${GREEN}✓${NC} $folder/ - ${folders[$folder]}"
        echo "- ✅ **$folder/** - ${folders[$folder]}" >> "$REPORT_FILE"
    else
        echo -e "${RED}✗${NC} $folder/ - ${folders[$folder]} (MISSING)"
        echo "- ❌ **$folder/** - ${folders[$folder]} (MISSING)" >> "$REPORT_FILE"
    fi
done

echo ""
echo "" >> "$REPORT_FILE"

# SECTION 2: Frontend Analysis
echo -e "${YELLOW}⚛️  Frontend Analysis${NC}"
cat >> "$REPORT_FILE" << 'EOF'
## ⚛️ Frontend Progress

EOF

if [ -d "FRONTEND" ]; then
    cd FRONTEND 2>/dev/null || true
    
    # Check package.json
    if [ -f "package.json" ]; then
        echo -e "${GREEN}✓${NC} package.json exists"
        echo "✅ **package.json** - Configured" >> "../$REPORT_FILE"
        
        # Count dependencies
        if command -v jq &> /dev/null; then
            DEPS=$(jq '.dependencies | length' package.json 2>/dev/null || echo "0")
            DEV_DEPS=$(jq '.devDependencies | length' package.json 2>/dev/null || echo "0")
            echo "  - Dependencies: $DEPS production, $DEV_DEPS development"
            echo "  - Dependencies: $DEPS production, $DEV_DEPS development" >> "../$REPORT_FILE"
        fi
    else
        echo -e "${RED}✗${NC} package.json missing"
        echo "❌ **package.json** - Not found" >> "../$REPORT_FILE"
    fi
    
    # Check src structure
    if [ -d "src" ]; then
        echo -e "${GREEN}✓${NC} src/ directory exists"
        
        # Count components
        COMPONENTS=$(count_files "src/components" "*.tsx")
        MODULES=$(count_files "src/modules" "*.tsx")
        PAGES=$(count_files "src/pages" "*.tsx")
        
        echo "  - Components: $COMPONENTS files"
        echo "  - Modules: $MODULES files"
        echo "  - Pages: $PAGES files"
        
        cat >> "../$REPORT_FILE" << EOF

### Component Breakdown
- **UI Components**: $COMPONENTS files
- **Feature Modules**: $MODULES files  
- **Pages**: $PAGES files

EOF
        
        # Count lines of code
        TSX_LOC=$(count_loc "src" "*.tsx")
        TS_LOC=$(count_loc "src" "*.ts")
        CSS_LOC=$(count_loc "src" "*.css")
        TOTAL_LOC=$((TSX_LOC + TS_LOC + CSS_LOC))
        
        echo "  - Lines of Code: $TOTAL_LOC total"
        echo "    - TypeScript/TSX: $((TSX_LOC + TS_LOC))"
        echo "    - CSS: $CSS_LOC"
        
        cat >> "../$REPORT_FILE" << EOF
### Code Statistics
- **Total Lines**: $TOTAL_LOC
- **TypeScript/TSX**: $((TSX_LOC + TS_LOC)) lines
- **CSS/Styles**: $CSS_LOC lines

EOF
    fi
    
    # Check key files
    echo ""
    echo "### 🔑 Key Files Status" >> "../$REPORT_FILE"
    echo "" >> "../$REPORT_FILE"
    
    KEY_FILES=(
        "src/App.tsx:Main App Component"
        "src/main.tsx:Entry Point"
        "src/router.tsx:Router Configuration"
        "src/index.css:Global Styles"
        "tailwind.config.js:Tailwind Config"
        "vite.config.ts:Vite Config"
        "tsconfig.json:TypeScript Config"
    )
    
    for entry in "${KEY_FILES[@]}"; do
        IFS=':' read -r file desc <<< "$entry"
        if [ -f "$file" ]; then
            echo -e "${GREEN}✓${NC} $file"
            echo "- ✅ $desc (\`$file\`)" >> "../$REPORT_FILE"
        else
            echo -e "${RED}✗${NC} $file (missing)"
            echo "- ❌ $desc (\`$file\`) - **MISSING**" >> "../$REPORT_FILE"
        fi
    done
    
    cd .. 2>/dev/null || true
else
    echo -e "${RED}✗${NC} FRONTEND directory not found"
    echo "❌ Frontend directory not initialized" >> "$REPORT_FILE"
fi

echo ""
echo "" >> "$REPORT_FILE"

# SECTION 3: Module Completion Checklist
echo -e "${YELLOW}📋 Module Completion Status${NC}"
cat >> "$REPORT_FILE" << 'EOF'
## 📋 Module Completion Checklist

EOF

# Define expected modules and their files
declare -A modules=(
    ["home"]="HomePage.tsx HeroSection.tsx FeaturesGrid.tsx ServicesPreview.tsx CTASection.tsx StatsSection.tsx"
    ["services"]="ServicesPage.tsx ServiceCard.tsx PricingTable.tsx"
    ["shop"]="ShopPage.tsx ProductGrid.tsx ProductCard.tsx Cart.tsx"
    ["auth"]="LoginPage.tsx RegisterPage.tsx AuthContext.tsx"
    ["dashboard"]="DashboardPage.tsx ProjectList.tsx OrderHistory.tsx"
    ["payments"]="PaymentPage.tsx StripeCheckout.tsx CryptoCheckout.tsx"
)

TOTAL_MODULES=${#modules[@]}
COMPLETED_MODULES=0

for module in "${!modules[@]}"; do
    echo -e "${CYAN}Module: $module${NC}"
    echo "### Module: \`$module\`" >> "$REPORT_FILE"
    
    FILES_ARRAY=($( echo ${modules[$module]} ))
    TOTAL_FILES=${#FILES_ARRAY[@]}
    FOUND_FILES=0
    
    for file in ${FILES_ARRAY[@]}; do
        if [ -f "FRONTEND/src/modules/$module/$file" ]; then
            echo -e "  ${GREEN}✓${NC} $file"
            echo "- ✅ $file" >> "$REPORT_FILE"
            ((FOUND_FILES++))
        else
            echo -e "  ${RED}✗${NC} $file"
            echo "- ❌ $file - TODO" >> "$REPORT_FILE"
        fi
    done
    
    PERCENTAGE=$(calc_percentage $FOUND_FILES $TOTAL_FILES)
    echo -e "  Progress: $(draw_progress_bar $PERCENTAGE)"
    echo "" >> "$REPORT_FILE"
    
    if [ "$FOUND_FILES" -eq "$TOTAL_FILES" ]; then
        ((COMPLETED_MODULES++))
    fi
    
    echo ""
done

MODULE_COMPLETION=$(calc_percentage $COMPLETED_MODULES $TOTAL_MODULES)

echo "" >> "$REPORT_FILE"

# SECTION 4: UI Components Checklist
echo -e "${YELLOW}🎨 UI Components Status${NC}"
cat >> "$REPORT_FILE" << 'EOF'
## 🎨 UI Components Status

EOF

UI_COMPONENTS=(
    "Button.tsx"
    "Input.tsx"
    "Card.tsx"
    "Modal.tsx"
    "Dropdown.tsx"
    "Spinner.tsx"
    "Toast.tsx"
)

TOTAL_UI=${#UI_COMPONENTS[@]}
FOUND_UI=0

for component in "${UI_COMPONENTS[@]}"; do
    if [ -f "FRONTEND/src/components/ui/$component" ]; then
        echo -e "${GREEN}✓${NC} $component"
        echo "- ✅ $component" >> "$REPORT_FILE"
        ((FOUND_UI++))
    else
        echo -e "${RED}✗${NC} $component"
        echo "- ❌ $component - TODO" >> "$REPORT_FILE"
    fi
done

UI_COMPLETION=$(calc_percentage $FOUND_UI $TOTAL_UI)
echo -e "Progress: $(draw_progress_bar $UI_COMPLETION)"
echo ""
echo "" >> "$REPORT_FILE"

# SECTION 5: Git Analysis
echo -e "${YELLOW}📊 Git Repository Analysis${NC}"
cat >> "$REPORT_FILE" << 'EOF'
## 📊 Git Repository Stats

EOF

if [ -d ".git" ]; then
    TOTAL_COMMITS=$(git rev-list --all --count 2>/dev/null || echo "0")
    BRANCHES=$(git branch | wc -l | tr -d ' ')
    LAST_COMMIT=$(git log -1 --format="%ar" 2>/dev/null || echo "No commits yet")
    CONTRIBUTORS=$(git shortlog -sn --all | wc -l | tr -d ' ')
    
    echo -e "${GREEN}✓${NC} Git initialized"
    echo "  - Total commits: $TOTAL_COMMITS"
    echo "  - Branches: $BRANCHES"
    echo "  - Last commit: $LAST_COMMIT"
    echo "  - Contributors: $CONTRIBUTORS"
    
    cat >> "$REPORT_FILE" << EOF
- ✅ Git initialized
- **Total Commits**: $TOTAL_COMMITS
- **Branches**: $BRANCHES
- **Last Commit**: $LAST_COMMIT
- **Contributors**: $CONTRIBUTORS

EOF

    # Recent commits
    if [ "$TOTAL_COMMITS" -gt 0 ]; then
        echo "" >> "$REPORT_FILE"
        echo "### Recent Commits" >> "$REPORT_FILE"
        echo '```' >> "$REPORT_FILE"
        git log --oneline -5 2>/dev/null >> "$REPORT_FILE" || true
        echo '```' >> "$REPORT_FILE"
    fi
else
    echo -e "${RED}✗${NC} Git not initialized"
    echo "❌ Git not initialized - Run \`git init\`" >> "$REPORT_FILE"
fi

echo ""
echo "" >> "$REPORT_FILE"

# SECTION 6: Overall Progress Summary
OVERALL_PROGRESS=$(calc_percentage $((FOUND_UI + COMPLETED_MODULES * 5)) $((TOTAL_UI + TOTAL_MODULES * 5)))

cat >> "$REPORT_FILE" << EOF
## 🎯 Overall Progress Summary

### Completion Rates
- **UI Components**: $(draw_progress_bar $UI_COMPLETION)
- **Feature Modules**: $(draw_progress_bar $MODULE_COMPLETION)
- **Overall Project**: $(draw_progress_bar $OVERALL_PROGRESS)

EOF

echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║                    PROGRESS SUMMARY                          ║${NC}"
echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}UI Components:${NC} $(draw_progress_bar $UI_COMPLETION)"
echo -e "${CYAN}Feature Modules:${NC} $(draw_progress_bar $MODULE_COMPLETION)"
echo -e "${CYAN}Overall Progress:${NC} $(draw_progress_bar $OVERALL_PROGRESS)"
echo ""

# SECTION 7: Next Actions
cat >> "$REPORT_FILE" << 'EOF'
## 🚀 Recommended Next Actions

EOF

ACTIONS=()

if [ "$UI_COMPLETION" -lt 100 ]; then
    ACTIONS+=("Complete remaining UI components (Button, Input, Card, Modal)")
fi

if [ "$MODULE_COMPLETION" -lt 50 ]; then
    ACTIONS+=("Focus on completing home module first (highest priority)")
fi

if [ ! -f "FRONTEND/package.json" ]; then
    ACTIONS+=("Initialize frontend with Vite: \`npm create vite@latest\`")
fi

if [ ! -d ".git" ]; then
    ACTIONS+=("Initialize Git: \`git init\`")
fi

if [ "${#ACTIONS[@]}" -eq 0 ]; then
    ACTIONS+=("Great progress! Continue with payment integration")
    ACTIONS+=("Set up backend (Supabase)")
    ACTIONS+=("Deploy to Netlify")
fi

PRIORITY=1
for action in "${ACTIONS[@]}"; do
    echo "$PRIORITY. $action" >> "$REPORT_FILE"
    echo -e "${YELLOW}$PRIORITY.${NC} $action"
    ((PRIORITY++))
done

echo ""
echo "" >> "$REPORT_FILE"

# SECTION 8: Files Changed Today
if [ -d ".git" ] && [ "$(git rev-list --all --count 2>/dev/null)" -gt 0 ]; then
    cat >> "$REPORT_FILE" << 'EOF'
## 📝 Files Changed Today

```
EOF
    
    git diff --stat "@{yesterday}" 2>/dev/null >> "$REPORT_FILE" || echo "No changes detected" >> "$REPORT_FILE"
    
    echo '```' >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
fi

# Footer
cat >> "$REPORT_FILE" << 'EOF'

---

**Report generated by Dig|lit Progress Tracker v1.0**  
*Keep building. Ship daily. Achieve hegemony.* 🚀
EOF

echo -e "${GREEN}✅ Report generated successfully!${NC}"
echo -e "${CYAN}📄 Report saved to: ${NC}$REPORT_FILE"
echo ""
echo -e "${YELLOW}💡 View report: ${NC}cat $REPORT_FILE"
echo -e "${YELLOW}💡 Or open in editor: ${NC}code $REPORT_FILE"
echo ""

# Update PROJECT_TRACKER.md with latest stats
if [ -f "$SUMMARY_FILE" ]; then
    cat > "$SUMMARY_FILE" << EOF
# Dig|lit Project Tracker

Last Updated: $(date '+%Y-%m-%d %H:%M:%S')

## 📊 Quick Stats
- **UI Components**: $FOUND_UI/$TOTAL_UI completed ($UI_COMPLETION%)
- **Feature Modules**: $COMPLETED_MODULES/$TOTAL_MODULES completed ($MODULE_COMPLETION%)
- **Overall Progress**: $OVERALL_PROGRESS%
- **Total Commits**: ${TOTAL_COMMITS:-0}
- **Lines of Code**: ${TOTAL_LOC:-0}

## 🎯 Current Focus
$(for action in "${ACTIONS[@]:0:3}"; do echo "- [ ] $action"; done)

## 📁 Latest Report
See detailed analysis: \`$REPORT_FILE\`

---
*Run \`./track_progress.sh\` to update this report*
EOF
    
    echo -e "${GREEN}✅ Updated $SUMMARY_FILE${NC}"
fi

echo -e "${PURPLE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Done! Your progress has been tracked. Keep building! 🚀${NC}"
echo -e "${PURPLE}═══════════════════════════════════════════════════════════════${NC}"
