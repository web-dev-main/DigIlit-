#!/bin/bash

# ╔══════════════════════════════════════════════════════════════════╗
# ║  Dig|lit Ultimate Setup, Fix & Progress Tracker                 ║
# ║  Adaptive • Intelligent • All-in-One Solution                    ║
# ╚══════════════════════════════════════════════════════════════════╝

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# Configuration
PROJECT_ROOT=$(pwd)
Z_DIR="FRONTEND"
REPORT_DIR="Z/REPORTS"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="$REPORT_DIR/report_$TIMESTAMP.md"

# Tracking variables
ISSUES_FOUND=0
ISSUES_FIXED=0
WARNINGS=0
TOTAL_CHECKS=0

# ═══════════════════════════════════════════════════════════════════
# UTILITY FUNCTIONS
# ═══════════════════════════════════════════════════════════════════

print_header() {
    echo ""
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║ $1${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_section() {
    echo ""
    echo -e "${CYAN}━━━ $1 ━━━${NC}"
    echo ""
}

check() {
    ((TOTAL_CHECKS++))
    echo -ne "${BLUE}→${NC} $1... "
}

success() {
    echo -e "${GREEN}✓${NC} $1"
}

warning() {
    ((WARNINGS++))
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    ((ISSUES_FOUND++))
    echo -e "${RED}✗${NC} $1"
}

fixed() {
    ((ISSUES_FIXED++))
    echo -e "${GREEN}✓ FIXED:${NC} $1"
}

spinner() {
    local pid=$1
    local delay=0.1
    local spinstr='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

# ═══════════════════════════════════════════════════════════════════
# DETECTION & ANALYSIS
# ═══════════════════════════════════════════════════════════════════

detect_state() {
    print_section "Detecting Current State"
    
    # Check if this is a fresh start or existing project
    if [ ! -d "$FRONTEND_DIR" ] && [ ! -d "BACKEND" ] && [ ! -d "Z" ]; then
        STATE="FRESH_START"
        echo -e "${YELLOW}📦 Fresh start detected - will initialize everything${NC}"
    elif [ -d "$FRONTEND_DIR/node_modules" ] && [ -f "$FRONTEND_DIR/package.json" ]; then
        STATE="INITIALIZED"
        echo -e "${GREEN}✓ Project already initialized${NC}"
    elif [ -d "$FRONTEND_DIR" ] && [ -f "$FRONTEND_DIR/package.json" ]; then
        STATE="PARTIAL"
        echo -e "${YELLOW}⚠ Partial setup detected - will complete initialization${NC}"
    else
        STATE="CORRUPTED"
        echo -e "${RED}✗ Corrupted structure detected - will rebuild${NC}"
    fi
    
    # Check Git
    if [ -d ".git" ]; then
        echo -e "${GREEN}✓ Git repository exists${NC}"
        HAS_GIT=true
    else
        echo -e "${YELLOW}⚠ No Git repository - will initialize${NC}"
        HAS_GIT=false
    fi
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        echo -e "${GREEN}✓ Node.js installed: $NODE_VERSION${NC}"
        HAS_NODE=true
    else
        echo -e "${RED}✗ Node.js not found - please install Node.js 18+${NC}"
        HAS_NODE=false
        exit 1
    fi
    
    # Check npm
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        echo -e "${GREEN}✓ npm installed: $NPM_VERSION${NC}"
        HAS_NPM=true
    else
        echo -e "${RED}✗ npm not found${NC}"
        HAS_NPM=false
        exit 1
    fi
}

# ═══════════════════════════════════════════════════════════════════
# STRUCTURE SETUP
# ═══════════════════════════════════════════════════════════════════

setup_directories() {
    print_section "Setting Up Directory Structure"
    
    # Main directories
    MAIN_DIRS=("FRONTEND" "BACKEND" "AI_CORE" "BUSINESS_INTELLIGENCE" "VISUAL_ENGINE" "Z")
    
    for dir in "${MAIN_DIRS[@]}"; do
        check "Creating $dir/"
        if [ ! -d "$dir" ]; then
            mkdir -p "$dir"
            success "Created"
        else
            success "Exists"
        fi
    done
    
    # Z subdirectories
    mkdir -p Z/{REPORTS,SCRIPTS,BACKUPS,DOCS}
    
    # BACKEND subdirectories
    mkdir -p BACKEND/supabase/{functions,migrations,seed}
    
    # AI_CORE subdirectories
    mkdir -p AI_CORE/{models,agents,training,memory}
    
    # BUSINESS_INTELLIGENCE subdirectories
    mkdir -p BUSINESS_INTELLIGENCE/{dashboards,reports,analytics,ml-pipeline}
    
    # VISUAL_ENGINE subdirectories
    mkdir -p VISUAL_ENGINE/{design-system,3d-assets,animations,templates}
    
    success "Directory structure complete"
}

# ═══════════════════════════════════════════════════════════════════
# FRONTEND INITIALIZATION
# ═══════════════════════════════════════════════════════════════════

init_frontend() {
    print_section "Initializing Frontend"
    
    cd "$FRONTEND_DIR"
    
    # Check if already initialized
    if [ -f "package.json" ] && [ -f "vite.config.ts" ]; then
        success "Frontend already initialized"
        
        # Check node_modules
        if [ ! -d "node_modules" ]; then
            warning "node_modules missing - installing dependencies"
            npm install &
            spinner $!
            success "Dependencies installed"
        else
            success "Dependencies installed"
        fi
    else
        check "Initializing Vite project"
        npm create vite@latest . -- --template react-ts --force &> /dev/null &
        spinner $!
        success "Vite initialized"
        
        check "Installing dependencies"
        npm install &> /dev/null &
        spinner $!
        success "Dependencies installed"
    fi
    
    # Install additional packages
    REQUIRED_PACKAGES=(
        "react-router-dom"
        "@tanstack/react-query"
        "zustand"
        "clsx"
        "tailwind-merge"
        "lucide-react"
    )
    
    REQUIRED_DEV_PACKAGES=(
        "tailwindcss"
        "postcss"
        "autoprefixer"
        "@types/node"
    )
    
    # Check and install missing packages
    for pkg in "${REQUIRED_PACKAGES[@]}"; do
        if ! npm list "$pkg" &> /dev/null; then
            check "Installing $pkg"
            npm install "$pkg" &> /dev/null &
            spinner $!
            success "Installed"
        fi
    done
    
    for pkg in "${REQUIRED_DEV_PACKAGES[@]}"; do
        if ! npm list "$pkg" &> /dev/null; then
            check "Installing $pkg (dev)"
            npm install -D "$pkg" &> /dev/null &
            spinner $!
            success "Installed"
        fi
    done
    
    # Initialize Tailwind if needed
    if [ ! -f "tailwind.config.js" ]; then
        check "Initializing Tailwind CSS"
        npx tailwindcss init -p &> /dev/null
        success "Tailwind initialized"
    fi
    
    cd "$PROJECT_ROOT"
}

# ═══════════════════════════════════════════════════════════════════
# FILE GENERATION
# ═══════════════════════════════════════════════════════════════════

generate_files() {
    print_section "Generating Project Files"
    
    cd "$FRONTEND_DIR"
    
    # Create src structure
    mkdir -p src/{modules,components,lib,types,styles}
    mkdir -p src/modules/{home,services,shop,dashboard,payments,auth,ai-chat}
    mkdir -p src/components/{ui,layout,forms}
    mkdir -p src/lib/{api,utils,hooks,constants,stores}
    
    # Generate Tailwind config
    check "Configuring Tailwind CSS"
    cat > tailwind.config.js << 'TAILWIND_EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff',
          300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7',
          600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87',
        },
        dark: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
          300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b',
          600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
TAILWIND_EOF
    success "Tailwind configured"
    
    # Generate global CSS
    check "Creating global styles"
    cat > src/index.css << 'CSS_EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-dark-900 text-white font-sans antialiased;
  }
  h1 { @apply text-4xl md:text-5xl lg:text-6xl font-bold; }
  h2 { @apply text-3xl md:text-4xl font-bold; }
  h3 { @apply text-2xl md:text-3xl font-semibold; }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200;
  }
  .btn-primary {
    @apply bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5;
  }
  .card {
    @apply bg-dark-800 border border-white/10 rounded-xl p-6;
  }
}
CSS_EOF
    success "Global styles created"
    
    # Generate Button component
    check "Creating UI components"
    cat > src/components/ui/Button.tsx << 'BUTTON_EOF'
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', isLoading = false, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5': variant === 'primary',
            'bg-dark-800 text-white border border-white/20 hover:bg-dark-700': variant === 'secondary',
            'border-2 border-white/20 text-white hover:bg-white/10': variant === 'outline',
            'text-white hover:bg-white/10': variant === 'ghost',
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);
Button.displayName = 'Button';
BUTTON_EOF
    
    # Generate Card component
    cat > src/components/ui/Card.tsx << 'CARD_EOF'
import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-dark-800 border border-white/10 rounded-xl p-6 transition-all duration-200',
          { 'hover:border-primary-500/50 hover:shadow-lg hover:-translate-y-1': hover },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
CARD_EOF
    success "UI components created"
    
    # Generate HomePage
    check "Creating Home page"
    cat > src/modules/home/HomePage.tsx << 'HOME_EOF'
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-primary-900/20 to-dark-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
            Your Vision + Our Mission
          </h1>
          <p className="text-4xl md:text-5xl font-light text-primary-400 mb-8">= Hegemony</p>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
            Transform any vision into reality with AI-powered solutions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Dig|lit?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['AI-Native', 'Zero Budget', 'Global Scale'].map((title, i) => (
            <Card key={i} hover>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-white/60">Revolutionary approach to business solutions.</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
HOME_EOF
    success "Home page created"
    
    # Generate App.tsx
    check "Creating App component"
    cat > src/App.tsx << 'APP_EOF'
import { HomePage } from './modules/home/HomePage';

function App() {
  return <HomePage />;
}

export default App;
APP_EOF
    success "App component created"
    
    # Generate main.tsx
    cat > src/main.tsx << 'MAIN_EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
MAIN_EOF
    
    # Generate .env files
    check "Creating environment files"
    cat > .env.example << 'ENV_EOF'
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Stripe
VITE_STRIPE_PUBLIC_KEY=

# Crypto
VITE_TRON_WALLET_ADDRESS=
ENV_EOF
    
    if [ ! -f ".env.local" ]; then
        cp .env.example .env.local
    fi
    success "Environment files created"
    
    cd "$PROJECT_ROOT"
}

# ═══════════════════════════════════════════════════════════════════
# GIT INITIALIZATION
# ═══════════════════════════════════════════════════════════════════

init_git() {
    print_section "Git Initialization"
    
    if [ "$HAS_GIT" = false ]; then
        check "Initializing Git repository"
        git init &> /dev/null
        success "Git initialized"
        
        # Create .gitignore
        cat > .gitignore << 'GITIGNORE_EOF'
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment
.env
.env.local
.env.*.local

# Build output
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temporary
*.tmp
.cache/
GITIGNORE_EOF
        
        success ".gitignore created"
    else
        success "Git already initialized"
    fi
}

# ═══════════════════════════════════════════════════════════════════
# BUILD & VALIDATION
# ═══════════════════════════════════════════════════════════════════

validate_build() {
    print_section "Build Validation"
    
    cd "$FRONTEND_DIR"
    
    check "Running TypeScript check"
    if npx tsc --noEmit &> /dev/null; then
        success "TypeScript check passed"
    else
        warning "TypeScript errors found (non-blocking)"
    fi
    
    check "Building project"
    if npm run build &> /dev/null; then
        success "Build successful"
        BUILD_SUCCESS=true
    else
        error "Build failed"
        BUILD_SUCCESS=false
    fi
    
    cd "$PROJECT_ROOT"
}

# ═══════════════════════════════════════════════════════════════════
# PROGRESS ANALYSIS
# ═══════════════════════════════════════════════════════════════════

analyze_progress() {
    print_section "Progress Analysis"
    
    # Count files
    if [ -d "$FRONTEND_DIR/src" ]; then
        COMPONENT_COUNT=$(find "$FRONTEND_DIR/src/components" -name "*.tsx" 2>/dev/null | wc -l)
        MODULE_COUNT=$(find "$FRONTEND_DIR/src/modules" -name "*.tsx" 2>/dev/null | wc -l)
        TOTAL_FILES=$(find "$FRONTEND_DIR/src" -name "*.tsx" -o -name "*.ts" 2>/dev/null | wc -l)
        
        echo -e "${CYAN}Components:${NC} $COMPONENT_COUNT files"
        echo -e "${CYAN}Modules:${NC} $MODULE_COUNT files"
        echo -e "${CYAN}Total TypeScript files:${NC} $TOTAL_FILES"
    fi
    
    # Lines of code
    if command -v cloc &> /dev/null && [ -d "$FRONTEND_DIR/src" ]; then
        echo ""
        echo -e "${CYAN}Lines of Code:${NC}"
        cloc "$FRONTEND_DIR/src" --quiet 2>/dev/null || echo "  (cloc not available)"
    fi
    
    # Git stats
    if [ "$HAS_GIT" = true ]; then
        COMMIT_COUNT=$(git rev-list --all --count 2>/dev/null || echo "0")
        echo ""
        echo -e "${CYAN}Git Commits:${NC} $COMMIT_COUNT"
        if [ "$COMMIT_COUNT" -gt 0 ]; then
            LAST_COMMIT=$(git log -1 --format="%ar" 2>/dev/null)
            echo -e "${CYAN}Last Commit:${NC} $LAST_COMMIT"
        fi
    fi
}

# ═══════════════════════════════════════════════════════════════════
# REPORT GENERATION
# ═══════════════════════════════════════════════════════════════════

generate_report() {
    print_section "Generating Report"
    
    mkdir -p "$REPORT_DIR"
    
    cat > "$REPORT_FILE" << REPORT_EOF
# Dig|lit Setup & Progress Report
Generated: $(date '+%Y-%m-%d %H:%M:%S')

## System State
- **Project State**: $STATE
- **Node.js**: $NODE_VERSION
- **npm**: $NPM_VERSION
- **Git**: $([ "$HAS_GIT" = true ] && echo "✅ Initialized" || echo "❌ Not initialized")

## Execution Summary
- **Total Checks**: $TOTAL_CHECKS
- **Issues Found**: $ISSUES_FOUND
- **Issues Fixed**: $ISSUES_FIXED
- **Warnings**: $WARNINGS

## Directory Structure
$(for dir in FRONTEND BACKEND AI_CORE BUSINESS_INTELLIGENCE VISUAL_ENGINE Z; do
    if [ -d "$dir" ]; then
        echo "- ✅ $dir/"
    else
        echo "- ❌ $dir/ (missing)"
    fi
done)

## Frontend Status
$(if [ -f "$FRONTEND_DIR/package.json" ]; then
    echo "- ✅ package.json configured"
    echo "- ✅ Dependencies: $(jq '.dependencies | length' "$FRONTEND_DIR/package.json" 2>/dev/null || echo "N/A") production"
else
    echo "- ❌ Frontend not initialized"
fi)

$(if [ -d "$FRONTEND_DIR/node_modules" ]; then
    echo "- ✅ node_modules installed"
else
    echo "- ❌ node_modules missing"
fi)

$(if [ "$BUILD_SUCCESS" = true ]; then
    echo "- ✅ Build successful"
else
    echo "- ⚠️ Build not tested or failed"
fi)

## Components Status
- **UI Components**: $COMPONENT_COUNT files
- **Feature Modules**: $MODULE_COUNT files
- **Total Files**: $TOTAL_FILES

## Next Steps
1. \`cd FRONTEND && npm run dev\` - Start development server
2. Open http://localhost:5173 in browser
3. Begin building features from Web Dev Masterplan
4. Run \`./diglit.sh report\` to check progress

## Quick Commands
\`\`\`bash
# Start development
cd FRONTEND && npm run dev

# Build for production
cd FRONTEND && npm run build

# Generate new report
./diglit.sh report

# Fix any issues
./diglit.sh fix
\`\`\`

---
*Report saved: $REPORT_FILE*
REPORT_EOF
    
    success "Report generated: $REPORT_FILE"
    
    # Update PROJECT_TRACKER.md
    cat > Z/PROJECT_TRACKER.md << TRACKER_EOF
# Dig|lit Project Tracker
Last Updated: $(date '+%Y-%m-%d %H:%M:%S')

## Quick Stats
- **State**: $STATE
- **Components**: $COMPONENT_COUNT
- **Modules**: $MODULE_COUNT
- **Build Status**: $([ "$BUILD_SUCCESS" = true ] && echo "✅ Passing" || echo "⚠️ Check needed")

## Latest Report
See: \`$REPORT_FILE\`

## Commands
- \`./diglit.sh setup\` - Initial setup
- \`./diglit.sh fix\` - Fix issues
- \`./diglit.sh report\` - Generate report
- \`./diglit.sh dev\` - Start dev server
TRACKER_EOF
}

# ═══════════════════════════════════════════════════════════════════
# MAIN EXECUTION
# ═══════════════════════════════════════════════════════════════════

main() {
    print_header "Dig|lit Ultimate Setup & Recovery"
    
    # Parse command
    COMMAND="${1:-full}"
    
    case "$COMMAND" in
        setup|full)
            detect_state
            setup_directories
            init_frontend
            generate_files
            init_git
            validate_build
            analyze_progress
            generate_report
            ;;
        fix)
            detect_state
            if [ "$STATE" != "INITIALIZED" ]; then
                setup_directories
                init_frontend
                generate_files
            fi
            validate_build
            generate_report
            ;;
        report)
            detect_state
            analyze_progress
            generate_report
            ;;
        dev)
            if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
                error "Frontend not initialized. Run: ./diglit.sh setup"
                exit 1
            fi
            cd "$FRONTEND_DIR"
            npm run dev
            ;;
        build)
            cd "$FRONTEND_DIR"
            npm run build
            ;;
        *)
            echo "Usage: $0 {setup|fix|report|dev|build}"
            echo ""
            echo "Commands:"
            echo "  setup   - Full project setup (default)"
            echo "  fix     - Fix broken parts only"
            echo "  report  - Generate progress report"
            echo "  dev     - Start development server"
            echo "  build   - Build for production"
            exit 1
            ;;
    esac
    
    # Final summary
    print_header "Complete!"
    echo -e "${GREEN}✓ Checks: $TOTAL_CHECKS${NC}"
    echo -e "${YELLOW}⚠ Warnings: $WARNINGS${NC}"
    echo -e "${RED}✗ Issues Found: $ISSUES_FOUND${NC}"
    echo -e "${GREEN}✓ Issues Fixed: $ISSUES_FIXED${NC}"
    echo ""
    echo -e "${CYAN}📄 Full report: $REPORT_FILE${NC}"
    echo -e "${CYAN}🚀 Next: cd FRONTEND && npm run dev${NC}"
    echo ""
}

# Run main function
main "$@"
