# DIG|LIT Automation Executor
## Self-Executing Development Script

> **Version:** 2.0  
> **Platform:** GitHub, Local Development, Cloud Platforms  
> **Execution Mode:** AI-Assisted or Manual  
> **Status:** Ready for Deployment

---

## Quick Start

### For AI-Assisted Execution

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/diglit-platform.git
cd diglit-platform

# 2. Provide this file to an AI assistant (Claude, GPT-4, etc.) with instructions:
# "Please execute this automation script step by step, validating each command before proceeding."

# 3. Monitor progress through the execution log below
```

### For Manual Execution

```bash
# Follow the commands in each phase sequentially
# Check the "Acceptance Criteria" after each phase
# Log your progress in the "Execution Log" section
```

---

## Execution State

```yaml
Current Phase: PHASE_1_VALIDATION
Status: READY
Last Completed: NONE
Errors Encountered: 0
Changes Accommodated: 0
Execution Mode: SEQUENTIAL
Started: [TO_BE_FILLED]
Estimated Completion: [TO_BE_CALCULATED]
```

---

## Phase 1: Frontend Validation & Error Fixing

**Priority:** CRITICAL  
**Estimated Time:** 30-45 minutes  
**Dependencies:** None

### Command 1.1: Fix Home.tsx Icon Rendering

**Issue:** React error - "Objects are not valid as React child"  
**File:** `client/src/pages/Home.tsx`  
**Impact:** Breaks homepage rendering

#### Current Code (Incorrect):
```typescript
// Around line 150 in Home.tsx
{quickAccessLinks.map((link, index) => (
  <Card key={index} className="...">
    <Icon className="h-12 w-12 text-primary mb-4" />  {/* ❌ Icon is undefined */}
    <h3>{link.title}</h3>
  </Card>
))}
```

#### Fixed Code:
```typescript
// Replace the mapping section with:
{quickAccessLinks.map((link, index) => {
  const IconComponent = link.icon;  // Extract the component
  return (
    <Card key={index} className="...">
      <IconComponent className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
      <h3>{link.title}</h3>
    </Card>
  );
})}
```

#### Execution Steps:
```bash
# 1. Open the file
code client/src/pages/Home.tsx

# 2. Locate the quickAccessLinks.map() section (around line 140-160)

# 3. Replace the icon rendering logic with the fixed version above

# 4. Save the file

# 5. Verify compilation
npm run build

# 6. Test in browser
npm run dev
# Navigate to http://localhost:5173 and check for errors
```

**Validation:**
- [ ] No console errors on homepage
- [ ] All quick access icons display correctly
- [ ] Hover effects work on icon cards
- [ ] TypeScript compiles without errors

---

### Command 1.2: Create Error Boundary Component

**Purpose:** Catch React errors gracefully and prevent full app crashes  
**File:** `client/src/components/ErrorBoundary.tsx` (NEW FILE)

#### Implementation:

```bash
# Create the file
touch client/src/components/ErrorBoundary.tsx
```

**File Content:**
```typescript
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    
    this.setState({ errorInfo });
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
          <Card className="max-w-2xl w-full p-8 bg-gradient-to-br from-amber-950/20 to-black border-amber-500/30">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-8 w-8 text-amber-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-2xl font-black text-amber-300 mb-2">
                  Something went wrong
                </h2>
                <p className="text-amber-100/80 mb-4">
                  We encountered an unexpected error. The development team has been notified.
                </p>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mb-4">
                    <summary className="cursor-pointer text-amber-400 hover:text-amber-300 mb-2">
                      Technical Details (Development Only)
                    </summary>
                    <pre className="bg-black/50 p-4 rounded text-xs text-amber-200 overflow-auto max-h-64">
                      <code>
                        {this.state.error.toString()}
                        {"\n\n"}
                        {this.state.errorInfo?.componentStack}
                      </code>
                    </pre>
                  </details>
                )}
                
                <div className="flex gap-3">
                  <Button 
                    onClick={this.handleReset} 
                    variant="default"
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Try Again
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="border-amber-500/50 text-amber-300"
                  >
                    Go Home
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Convenience hook for functional components
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return setError;
};
```

**Validation:**
- [ ] File compiles without TypeScript errors
- [ ] Component exports correctly
- [ ] Error UI displays properly when tested

---

### Command 1.3: Wrap App with Error Boundary

**File:** `client/src/App.tsx`  
**Purpose:** Catch all errors at the root level

#### Implementation:

```typescript
// At the top of App.tsx, add import:
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Find the return statement in App() function and wrap everything:

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* ... existing routes ... */}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
```

**Validation:**
- [ ] App compiles successfully
- [ ] No runtime errors on startup
- [ ] Error boundary catches test errors

---

### Command 1.4: Validate All Pages

**Purpose:** Ensure all routes render without errors

#### Test Script:

```bash
# Start dev server
npm run dev

# Test each route manually or use this test script:
```

Create `scripts/test-pages.js`:
```javascript
const puppeteer = require('puppeteer');

const pages = [
  { path: '/', name: 'Home' },
  { path: '/solutions', name: 'Solutions' },
  { path: '/services', name: 'Services' },
  { path: '/shop', name: 'Shop' },
  { path: '/login', name: 'Login' },
];

async function testPages() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Collect console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push({ page: '', message: msg.text() });
    }
  });

  for (const route of pages) {
    console.log(`Testing ${route.name} (${route.path})...`);
    
    try {
      await page.goto(`http://localhost:5173${route.path}`, {
        waitUntil: 'networkidle0',
        timeout: 10000
      });
      
      // Wait for content to render
      await page.waitForTimeout(2000);
      
      // Check for errors
      const pageErrors = await page.evaluate(() => {
        const errors = [];
        const elements = document.querySelectorAll('[data-error]');
        elements.forEach(el => errors.push(el.textContent));
        return errors;
      });
      
      if (pageErrors.length > 0) {
        console.log(`  ❌ Errors found: ${pageErrors.join(', ')}`);
      } else {
        console.log(`  ✅ No errors`);
      }
    } catch (error) {
      console.log(`  ❌ Failed to load: ${error.message}`);
    }
  }

  await browser.close();
  
  if (errors.length > 0) {
    console.log('\n📋 Console Errors Found:');
    errors.forEach(err => console.log(`  - ${err.message}`));
    process.exit(1);
  } else {
    console.log('\n✅ All pages validated successfully!');
  }
}

testPages();
```

**Manual Testing Checklist:**

| Page | Route | Expected Content | Status |
|------|-------|------------------|--------|
| Home | `/` | Hero, Quick Access, Features | ⬜ |
| Solutions | `/solutions` | 5 solution cards | ⬜ |
| Services | `/services` | 13 service categories | ⬜ |
| Shop | `/shop` | 22 products with filters | ⬜ |
| Login | `/login` | Login/Register forms | ⬜ |

**Validation:**
- [ ] All pages load without console errors
- [ ] Navigation between pages works
- [ ] No React warnings in console
- [ ] Mobile responsiveness works

---

### Command 1.5: Data Flow Validation

**Purpose:** Verify JSON data loads correctly and matches TypeScript types

#### Check Data Files:

```bash
# Verify data files exist
ls -la client/src/data/

# Expected files:
# - products.json
# - solutions.json
# - services.json
```

#### Validation Script:

Create `scripts/validate-data.ts`:
```typescript
import productsData from '../client/src/data/products.json';
import solutionsData from '../client/src/data/solutions.json';
import servicesData from '../client/src/data/services.json';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  // Add other fields
}

interface Solution {
  id: string;
  title: string;
  description: string;
  features: string[];
  // Add other fields
}

interface Service {
  id: string;
  name: string;
  category: string;
  // Add other fields
}

function validateProducts(data: any[]): boolean {
  console.log('Validating products...');
  
  if (!Array.isArray(data)) {
    console.error('❌ Products data is not an array');
    return false;
  }
  
  for (const item of data) {
    if (!item.id || typeof item.id !== 'string') {
      console.error(`❌ Invalid product ID: ${JSON.stringify(item)}`);
      return false;
    }
    if (!item.name || typeof item.name !== 'string') {
      console.error(`❌ Invalid product name: ${item.id}`);
      return false;
    }
    if (typeof item.price !== 'number' || item.price < 0) {
      console.error(`❌ Invalid product price: ${item.id}`);
      return false;
    }
  }
  
  console.log(`✅ ${data.length} products validated`);
  return true;
}

function validateSolutions(data: any[]): boolean {
  console.log('Validating solutions...');
  
  if (!Array.isArray(data)) {
    console.error('❌ Solutions data is not an array');
    return false;
  }
  
  for (const item of data) {
    if (!item.id || !item.title || !item.description) {
      console.error(`❌ Invalid solution: ${JSON.stringify(item)}`);
      return false;
    }
  }
  
  console.log(`✅ ${data.length} solutions validated`);
  return true;
}

function validateServices(data: any[]): boolean {
  console.log('Validating services...');
  
  if (!Array.isArray(data)) {
    console.error('❌ Services data is not an array');
    return false;
  }
  
  for (const item of data) {
    if (!item.id || !item.name || !item.category) {
      console.error(`❌ Invalid service: ${JSON.stringify(item)}`);
      return false;
    }
  }
  
  console.log(`✅ ${data.length} services validated`);
  return true;
}

// Run validations
const allValid = [
  validateProducts(productsData),
  validateSolutions(solutionsData),
  validateServices(servicesData)
].every(v => v);

if (allValid) {
  console.log('\n✅ All data validated successfully!');
  process.exit(0);
} else {
  console.log('\n❌ Data validation failed');
  process.exit(1);
}
```

**Run validation:**
```bash
npx tsx scripts/validate-data.ts
```

**Validation:**
- [ ] All JSON files are valid
- [ ] Data matches TypeScript interfaces
- [ ] No missing required fields
- [ ] Data loads in components correctly

---

### Phase 1 Acceptance Criteria

✅ **Complete Phase 1 when ALL of these are true:**

- [ ] No console errors on any page
- [ ] All components render without warnings
- [ ] Home.tsx icon issue is fixed
- [ ] Error boundary is implemented and working
- [ ] All 5 pages load successfully
- [ ] Data validation passes
- [ ] TypeScript compiles with 0 errors
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Navigation between routes works smoothly
- [ ] All animations play at 60fps

**Phase 1 Sign-off:**
```yaml
Completed By: [NAME]
Date: [DATE]
Time Taken: [DURATION]
Issues Found: [NUMBER]
Issues Resolved: [NUMBER]
Status: [PASS/FAIL]
```

---

## Phase 2: AI Core Engine Implementation

**Priority:** HIGH  
**Estimated Time:** 4-6 hours  
**Dependencies:** Phase 1 Complete

### Command 2.1: Create Directory Structure

```bash
# Create AI core directories
mkdir -p server/ai-core/nlp
mkdir -p server/ai-core/automation
mkdir -p server/ai-core/ml-models
mkdir -p server/ai-core/assistant
mkdir -p server/ai-core/types

# Create index files for each module
touch server/ai-core/nlp/index.ts
touch server/ai-core/automation/index.ts
touch server/ai-core/ml-models/index.ts
touch server/ai-core/assistant/index.ts
touch server/ai-core/types/index.ts
```

**Validation:**
- [ ] All directories created
- [ ] Structure matches plan

---

### Command 2.2: Implement Text Processor

**File:** `server/ai-core/nlp/text-processor.ts`

```typescript
/**
 * Text Processing Utilities
 * No external NLP libraries - pure JavaScript implementation
 */

export class TextProcessor {
  private static readonly STOP_WORDS = new Set([
    'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but',
    'in', 'with', 'to', 'for', 'of', 'as', 'by', 'from', 'that', 'this',
    'be', 'are', 'was', 'were', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
    'can', 'shall', 'must', 'ought', 'i', 'you', 'he', 'she', 'it', 'we',
    'they', 'them', 'their', 'what', 'when', 'where', 'who', 'why', 'how'
  ]);

  /**
   * Tokenize text into words
   */
  static tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s'-]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 0);
  }

  /**
   * Extract keywords (removes stop words)
   */
  static extractKeywords(text: string, minLength: number = 3): string[] {
    return this.tokenize(text)
      .filter(word => word.length >= minLength)
      .filter(word => !this.STOP_WORDS.has(word))
      .filter((word, index, self) => self.indexOf(word) === index);
  }

  /**
   * Calculate term frequency
   */
  static termFrequency(text: string): Map<string, number> {
    const tokens = this.tokenize(text);
    const freq = new Map<string, number>();
    
    tokens.forEach(token => {
      freq.set(token, (freq.get(token) || 0) + 1);
    });
    
    return freq;
  }

  /**
   * Analyze sentiment
   */
  static analyzeSentiment(text: string): {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
    confidence: number;
  } {
    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
      'love', 'best', 'perfect', 'awesome', 'brilliant', 'outstanding',
      'superb', 'exceptional', 'magnificent', 'marvelous', 'delightful',
      'impressive', 'remarkable', 'fabulous', 'terrific', 'splendid'
    ];
    
    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate',
      'poor', 'disappointing', 'useless', 'broken', 'failed', 'wrong',
      'pathetic', 'disgusting', 'dreadful', 'appalling', 'atrocious'
    ];

    const intensifiers = ['very', 'really', 'extremely', 'absolutely', 'incredibly'];
    
    const tokens = this.tokenize(text);
    let score = 0;
    let totalWeight = 0;

    tokens.forEach((token, index) => {
      let weight = 1;
      
      if (index > 0 && intensifiers.includes(tokens[index - 1])) {
        weight = 1.5;
      }

      if (positiveWords.includes(token)) {
        score += weight;
        totalWeight += weight;
      }
      if (negativeWords.includes(token)) {
        score -= weight;
        totalWeight += weight;
      }
    });

    const normalized = totalWeight > 0 ? score / totalWeight : 0;
    const confidence = Math.min(totalWeight / tokens.length, 1);

    let label: 'positive' | 'negative' | 'neutral';
    if (normalized > 0.2) label = 'positive';
    else if (normalized < -0.2) label = 'negative';
    else label = 'neutral';

    return { score: normalized, label, confidence };
  }

  /**
   * Extract entities
   */
  static extractEntities(text: string): {
    emails: string[];
    urls: string[];
    phones: string[];
    mentions: string[];
    hashtags: string[];
  } {
    return {
      emails: [...text.matchAll(/\b[\w.%+-]+@[\w.-]+\.[A-Z|a-z]{2,}\b/g)]
        .map(m => m[0]),
      urls: [...text.matchAll(/https?:\/\/[^\s]+/g)]
        .map(m => m[0]),
      phones: [...text.matchAll(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g)]
        .map(m => m[0]),
      mentions: [...text.matchAll(/@(\w+)/g)]
        .map(m => m[1]),
      hashtags: [...text.matchAll(/#(\w+)/g)]
        .map(m => m[1])
    };
  }

  /**
   * Calculate similarity between two texts
   */
  static similarity(text1: string, text2: string): number {
    const tokens1 = new Set(this.tokenize(text1));
    const tokens2 = new Set(this.tokenize(text2));
    
    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
    const union = new Set([...tokens1, ...tokens2]);
    
    return intersection.size / union.size;
  }

  /**
   * Stem word (simple suffix stripping)
   */
  static stem(word: string): string {
    const suffixes = ['ing', 'ed', 'es', 's', 'er', 'est', 'ly'];
    
    for (const suffix of suffixes) {
      if (word.endsWith(suffix) && word.length > suffix.length + 2) {
        return word.slice(0, -suffix.length);
      }
    }
    
    return word;
  }
}
```

**Validation:**
```bash
# Create test file
cat > server/ai-core/nlp/text-processor.test.ts << 'EOF'
import { TextProcessor } from './text-processor';

// Test tokenization
const tokens = TextProcessor.tokenize("Hello, world! This is a test.");
console.assert(tokens.includes('hello'), 'Tokenization failed');

// Test keyword extraction
const keywords = TextProcessor.extractKeywords("The quick brown fox jumps");
console.assert(!keywords.includes('the'), 'Stop word removal failed');

// Test sentiment
const sentiment = TextProcessor.analyzeSentiment("This is amazing and wonderful!");
console.assert(sentiment.label === 'positive', 'Sentiment analysis failed');

console.log('✅ Text processor tests passed');
EOF

npx tsx server/ai-core/nlp/text-processor.test.ts
```

- [ ] All tests pass
- [ ] No TypeScript errors

---

### Command 2.3: Implement Intent Classifier

**File:** `server/ai-core/nlp/intent-classifier.ts`

```typescript
import { TextProcessor } from './text-processor';

export interface IntentResult {
  intent: string;
  confidence: number;
  matches: string[];
}

export class IntentClassifier {
  private patterns: Map<string, RegExp[]> = new Map([
    ['greeting', [
      /^(hi|hello|hey|greetings|good\s+(morning|afternoon|evening))/i,
      /\bhello\b/i
    ]],
    ['help_request', [
      /\b(help|assist|support|guide)\b/i,
      /how\s+(do|can)\s+i/i,
      /\bwhat('?s| is)\b.*\b(how|when|where)\b/i,
      /\bcan\s+you\s+(help|assist)/i
    ]],
    ['pricing_inquiry', [
      /\b(price|cost|pricing|payment|pay|afford|expensive|cheap)\b/i,
      /how\s+much/i,
      /what.*cost/i
    ]],
    ['product_inquiry', [
      /\b(product|service|solution|feature|offer)\b/i,
      /what\s+(do|can)\s+you\s+(offer|provide|do)/i,
      /tell\s+me\s+about/i
    ]],
    ['complaint', [
      /\b(problem|issue|bug|error|broken|not\s+working|wrong)/i,
      /\b(disappointed|frustrated|angry|upset)/i,
      /(why|how come).*not\s+work/i
    ]],
    ['compliment', [
      /\b(thank|thanks|appreciate|great|excellent|amazing|awesome)/i,
      /(good|well)\s+job|well\s+done/i
    ]],
    ['booking_request', [
      /\b(book|schedule|appointment|meeting|call)\b/i,
      /\bwhen\s+can\s+(i|we)/i
    ]],
    ['technical_support', [
      /\b(technical|tech|integrate|api|documentation|docs)\b/i,
      /how\s+to\s+(integrate|implement|use)/i
    ]]
  ]);

  classify(text: string): IntentResult {
    const keywords = TextProcessor.extractKeywords(text);
    const matches: Array<{ intent: string; score: number }> = [];

    for (const [intent, patterns] of this.patterns) {
      let score = 0;
      
      // Pattern matching
      for (const pattern of patterns) {
        if (pattern.test(text)) {
          score += 1;
        }
      }
      
      // Keyword matching
      const intentKeywords = this.getIntentKeywords(intent);
      const keywordMatches = keywords.filter(k => 
        intentKeywords.includes(k)
      );
      score += keywordMatches.length * 0.5;

      if (score > 0) {
        matches.push({ intent, score });
      }
    }

    // Sort by score
    matches.sort((a, b) => b.score - a.score);
    
    if (matches.length === 0) {
      return { 
        intent: 'general', 
        confidence: 0.5, 
        matches: [] 
      };
    }

    const topMatch = matches[0];
    const confidence = Math.min(topMatch.score / 3, 1);

    return {
      intent: topMatch.intent,
      confidence,
      matches: matches.slice(0, 3).map(m => m.intent)
    };
  }

  private getIntentKeywords(intent: string): string[] {
    const keywordMap: Record<string, string[]> = {
      greeting: ['hi', 'hello', 'hey', 'greetings'],
      help_request: ['help', 'assist', 'support', 'guide'],
      pricing_inquiry: ['price', 'cost', 'payment', 'pricing'],
      product_inquiry: ['product', 'service', 'solution', 'feature'],
      complaint: ['problem', 'issue', 'bug', 'error', 'broken'],
      compliment: ['thank', 'thanks', 'great', 'excellent', 'amazing'],
      booking_request: ['book', 'schedule', 'appointment', 'meeting'],
      technical_support: ['technical', 'integrate', 'api', 'documentation']
    };
    return keywordMap[intent] || [];
  }

  addPattern(intent: string, pattern: RegExp): void {
    const existing = this.patterns.get(intent) || [];
    this.patterns.set(intent, [...existing, pattern]);
  }

  removeIntent(intent: string): boolean {
    return this.patterns.delete(intent);
  }
}
```

**Save and test:**
```bash
npx tsx -e "
import { IntentClassifier } from './server/ai-core/nlp/intent-classifier';
const classifier = new IntentClassifier();
console.log(classifier.classify('How much does it cost?'));
console.log(classifier.classify('I need help with something'));
console.log('✅ Intent classifier working');
"
```

**Validation:**
- [ ] File compiles successfully
- [ ] Test outputs correct intents
- [ ] Confidence scores are reasonable

---

### Command 2.4: Implement Workflow Engine

**File:** `server/ai-core/automation/workflow-engine.ts`

Copy the complete WorkflowEngine implementation from AUTOMATION_GUIDE.md (Phase 2.2).

**Validation:**
```bash
# Create test workflow
cat > server/ai-core/automation/test-workflow.ts << 'EOF'
import { WorkflowEngine } from './workflow-engine';

const engine = new WorkflowEngine();

// Register a test workflow
engine.registerWorkflow({
  id: 'test-workflow',
  name: 'Test Workflow',
  description: 'Simple test',
  steps: {
    step1: {
      id: 'step1',
      type: 'action',
      config: { action: 'log', params: { message: 'Step 1' } },
      next: 'step2'
    },
    step2: {
      id: 'step2',
      type: 'action',
      config: { action: 'log', params: { message: 'Step 2' } }
    }
  },
  startStep: 'step1',
  variables: {}
});

// Execute workflow
engine.execute('test-workflow').then(result => {
  console.log('Workflow result:', result);
  console.log('✅ Workflow engine working');
});
EOF

npx tsx server/ai-core/automation/test-workflow.ts
```

**Validation:**
- [ ] Workflow executes successfully
- [ ] Logs show both steps completed
- [ ] No errors in execution

---

### Command 2.5: Implement ML Models

**File:** `server/ai-core/ml-models/predictor.ts`

Copy the PatternPredictor and RecommenderSystem from AUTOMATION_GUIDE.md (Phase 2.3).

**Validation:**
```bash
# Test predictor
cat > server/ai-core/ml-models/test-predictor.ts << 'EOF'
import { PatternPredictor } from './predictor';

// Test linear prediction
const data = [10, 12, 14, 16, 18];
const result = PatternPredictor.predictLinear(data);
console.log('Prediction:', result);
console.assert(result.prediction > 18, 'Prediction should be > 18');
console.assert(result.trend === 'increasing', 'Trend should be increasing');

// Test anomaly detection
const dataWithAnomaly = [10, 11, 12, 100, 13, 14];
const anomalies = PatternPredictor.detectAnomalies(dataWithAnomaly);
console.log('Anomalies:', anomalies);
console.assert(anomalies.anomalies.length > 0, 'Should detect anomaly');

console.log('✅ Predictor tests passed');
EOF

npx tsx server/ai-core/ml-models/test-predictor.ts
```

**Validation:**
- [ ] Linear prediction works
- [ ] Anomaly detection identifies outliers
- [ ] Moving average calculation is correct

---

### Command 2.6: Implement Chat Handler

**File:** `server/ai-core/assistant/chat-handler.ts`

Copy the ChatHandler implementation from AUTOMATION_GUIDE.md (Phase 2.4).

**Validation:**
```bash
# Test chat handler
cat > server/ai-core/assistant/test-chat.ts << 'EOF'
import { ChatHandler } from './chat-handler';

const handler = new ChatHandler();
const convId = handler.createConversation('user123');

async function testChat() {
  const response1 = await handler.handleMessage(convId, 'Hello!');
  console.log('Response 1:', response1);
  console.assert(response1.intent === 'greeting', 'Should detect greeting');

  const response2 = await handler.handleMessage(convId, 'How much does it cost?');
  console.log('Response 2:', response2);
  console.assert(response2.intent === 'pricing_inquiry', 'Should detect pricing inquiry');

  const history = handler.getConversationHistory(convId);
  console.log('History length:', history.length);
  console.assert(history.length === 4, 'Should have 4 messages');

  console.log('✅ Chat handler tests passed');
}

testChat();
EOF

npx tsx server/ai-core/assistant/test-chat.ts
```

**Validation:**
- [ ] Conversations can be created
- [ ] Messages are handled correctly
- [ ] Intent detection works
- [ ] History is maintained

---

### Command 2.7: Create AI Core API Endpoints

**File:** `server/routes/ai-routes.ts` (NEW FILE)

```typescript
import express from 'express';
import { ChatHandler } from '../ai-core/assistant/chat-handler';
import { TextProcessor } from '../ai-core/nlp/text-processor';
import { IntentClassifier } from '../ai-core/nlp/intent-classifier';
import { WorkflowEngine } from '../ai-core/automation/workflow-engine';
import { PatternPredictor } from '../ai-core/ml-models/predictor';

const router = express.Router();
const chatHandler = new ChatHandler();
const intentClassifier = new IntentClassifier();
const workflowEngine = new WorkflowEngine();

// === CHAT ENDPOINTS ===

router.post('/api/ai/chat/create', (req, res) => {
  try {
    const { userId } = req.body;
    const conversationId = chatHandler.createConversation(userId || 'anonymous');
    res.json({ conversationId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

router.post('/api/ai/chat/message', async (req, res) => {
  try {
    const { conversationId, message } = req.body;
    
    if (!conversationId || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await chatHandler.handleMessage(conversationId, message);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/ai/chat/history/:conversationId', (req, res) => {
  try {
    const history = chatHandler.getConversationHistory(req.params.conversationId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// === NLP ENDPOINTS ===

router.post('/api/ai/nlp/analyze', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const result = {
      tokens: TextProcessor.tokenize(text),
      keywords: TextProcessor.extractKeywords(text),
      sentiment: TextProcessor.analyzeSentiment(text),
      entities: TextProcessor.extractEntities(text),
      intent: intentClassifier.classify(text)
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

router.post('/api/ai/nlp/similarity', (req, res) => {
  try {
    const { text1, text2 } = req.body;
    
    if (!text1 || !text2) {
      return res.status(400).json({ error: 'Both texts are required' });
    }

    const similarity = TextProcessor.similarity(text1, text2);
    res.json({ similarity });
  } catch (error) {
    res.status(500).json({ error: 'Similarity calculation failed' });
  }
});

// === WORKFLOW ENDPOINTS ===

router.post('/api/ai/workflow/register', (req, res) => {
  try {
    const workflow = req.body;
    workflowEngine.registerWorkflow(workflow);
    res.json({ success: true, workflowId: workflow.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register workflow' });
  }
});

router.post('/api/ai/workflow/execute', async (req, res) => {
  try {
    const { workflowId, context } = req.body;
    
    if (!workflowId) {
      return res.status(400).json({ error: 'Workflow ID is required' });
    }

    const result = await workflowEngine.execute(workflowId, context);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/ai/workflow/logs/:workflowId', (req, res) => {
  try {
    const logs = workflowEngine.getExecutionLog(req.params.workflowId);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// === ML ENDPOINTS ===

router.post('/api/ai/ml/predict', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Data must be an array of numbers' });
    }

    const prediction = PatternPredictor.predictLinear(data);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Prediction failed' });
  }
});

router.post('/api/ai/ml/anomalies', (req, res) => {
  try {
    const { data, threshold } = req.body;
    
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Data must be an array of numbers' });
    }

    const result = PatternPredictor.detectAnomalies(data, threshold);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Anomaly detection failed' });
  }
});

export default router;
```

**Integration:**
```typescript
// In server/index.ts, add:
import aiRoutes from './routes/ai-routes';
app.use(aiRoutes);
```

**Test API endpoints:**
```bash
# Start server
npm run dev

# Test chat endpoint
curl -X POST http://localhost:5000/api/ai/chat/create \
  -H "Content-Type: application/json" \
  -d '{"userId":"test123"}'

# Test NLP analysis
curl -X POST http://localhost:5000/api/ai/nlp/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"This is an amazing product!"}'
```

**Validation:**
- [ ] All AI endpoints respond correctly
- [ ] Chat conversations work end-to-end
- [ ] NLP analysis returns expected results
- [ ] Workflow execution works
- [ ] ML predictions are reasonable

---

### Phase 2 Acceptance Criteria

✅ **Complete Phase 2 when ALL of these are true:**

- [ ] All AI core modules are implemented
- [ ] Text processing works without external libraries
- [ ] Intent classification achieves 80%+ accuracy
- [ ] Workflow engine executes complex workflows
- [ ] ML predictions provide reasonable forecasts
- [ ] Chat handler maintains conversation context
- [ ] All AI endpoints are functional and tested
- [ ] Response time is under 200ms for text processing
- [ ] Memory usage stays below 512MB under load
- [ ] No third-party AI APIs are used

**Phase 2 Sign-off:**
```yaml
Completed By: [NAME]
Date: [DATE]
Time Taken: [DURATION]
Tests Passed: [NUMBER]/[TOTAL]
Performance: [METRICS]
Status: [PASS/FAIL]
```

---

## Phase 3: Backend Architecture

**Priority:** HIGH  
**Estimated Time:** 3-4 hours  
**Dependencies:** Phase 2 Complete

### Command 3.1: Database Setup

```bash
# Ensure PostgreSQL is running
pg_isready

# Create database
createdb diglit_platform

# Set environment variables
cat > .env << 'EOF'
DATABASE_URL=postgresql://username:password@localhost:5432/diglit_platform
NODE_ENV=development
PORT=5000
SESSION_SECRET=your-secret-key-here-change-in-production
EOF
```

**Run migrations:**
```bash
# Push schema to database
npx drizzle-kit push:pg

# Verify tables created
psql diglit_platform -c "\dt"
```

**Expected tables:**
- users
- products
- solutions
- services
- orders
- cart

**Validation:**
- [ ] Database created successfully
- [ ] All tables exist
- [ ] Schema matches definitions

---

### Command 3.2: Implement Authentication

Copy the authentication implementations from AUTOMATION_GUIDE.md Phase 3.

**Files to create:**
- `server/auth/password.ts`
- `server/auth/session.ts`
- `server/auth/middleware.ts`

**Test authentication:**
```bash
# Test password hashing
cat > server/auth/test-auth.ts << 'EOF'
import { PasswordManager } from './password';

async function testAuth() {
  const password = 'TestPassword123!';
  const hash = await PasswordManager.hash(password);
  console.log('Hash:', hash);

  const valid = await PasswordManager.verify(password, hash);
  console.assert(valid === true, 'Password verification should succeed');

  const invalid = await PasswordManager.verify('WrongPassword', hash);
  console.assert(invalid === false, 'Wrong password should fail');

  console.log('✅ Auth tests passed');
}

testAuth();
EOF

npx tsx server/auth/test-auth.ts
```

**Validation:**
- [ ] Password hashing works
- [ ] Password verification works
- [ ] Session management works
- [ ] Tokens are generated securely

---

### Command 3.3: Implement API Routes

Copy all API route implementations from AUTOMATION_GUIDE.md Phase 3.

**Update `server/routes.ts`** with:
- Auth endpoints (register, login, logout)
- Products CRUD
- Solutions CRUD
- Services CRUD
- Cart management
- Order processing

**Test all endpoints:**
```bash
# Create test script
cat > scripts/test-api.sh << 'EOF'
#!/bin/bash

BASE_URL="http://localhost:5000"

echo "Testing API endpoints..."

# Test registration
echo "1. Testing registration..."
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","fullName":"Test User"}')
echo $REGISTER_RESPONSE

# Extract session ID
SESSION_ID=$(echo $REGISTER_RESPONSE | jq -r '.sessionId')

# Test login
echo "2. Testing login..."
curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test products
echo "3. Testing products..."
curl -s -X GET $BASE_URL/api/products

# Test solutions
echo "4. Testing solutions..."
curl -s -X GET $BASE_URL/api/solutions

# Test services
echo "5. Testing services..."
curl -s -X GET $BASE_URL/api/services

echo "✅ All endpoint tests complete"
EOF

chmod +x scripts/test-api.sh
./scripts/test-api.sh
```

**Validation:**
- [ ] All endpoints respond without errors
- [ ] Authentication works correctly
- [ ] CRUD operations succeed
- [ ] Data validation prevents bad inputs
- [ ] Error responses are consistent

---

### Command 3.4: Seed Database

**File:** `server/db/seed.ts`

```typescript
import { db } from './index';
import { products, solutions, services } from './schema';
import productsData from '../../client/src/data/products.json';
import solutionsData from '../../client/src/data/solutions.json';
import servicesData from '../../client/src/data/services.json';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Clear existing data
    await db.delete(products);
    await db.delete(solutions);
    await db.delete(services);

    // Insert products
    if (productsData.length > 0) {
      await db.insert(products).values(productsData);
      console.log(`✅ Inserted ${productsData.length} products`);
    }

    // Insert solutions
    if (solutionsData.length > 0) {
      await db.insert(solutions).values(solutionsData);
      console.log(`✅ Inserted ${solutionsData.length} solutions`);
    }

    // Insert services
    if (servicesData.length > 0) {
      await db.insert(services).values(servicesData);
      console.log(`✅ Inserted ${servicesData.length} services`);
    }

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
```

**Run seed:**
```bash
npx tsx server/db/seed.ts
```

**Validation:**
- [ ] Seed script runs without errors
- [ ] Data is inserted correctly
- [ ] Query database to verify data exists

---

### Phase 3 Acceptance Criteria

✅ **Complete Phase 3 when ALL of these are true:**

- [ ] Database is set up and migrated
- [ ] All tables exist with correct schema
- [ ] Authentication system works (register, login, logout)
- [ ] All CRUD endpoints are functional
- [ ] Data validation works correctly
- [ ] Session management works
- [ ] Database is seeded with initial data
- [ ] All API tests pass
- [ ] Error handling is consistent
- [ ] API documentation is complete

**Phase 3 Sign-off:**
```yaml
Completed By: [NAME]
Date: [DATE]
Time Taken: [DURATION]
Endpoints Tested: [NUMBER]
Database Status: [OK/ISSUES]
Status: [PASS/FAIL]
```

---

## Change Accommodation Protocol

### When Changes Are Requested

**Step 1: Pause Execution**
```yaml
Action: PAUSE
Current Command: [COMMAND_ID]
Reason: [CHANGE_REQUEST_DESCRIPTION]
Timestamp: [TIMESTAMP]
```

**Step 2: Evaluate Impact**
```yaml
Impact Analysis:
  Affected Phases: [LIST]
  Completed Work: [NEED_CHANGES/NO_CHANGES]
  Current Phase: [NEED_ADJUSTMENT/CONTINUE]
  Future Phases: [NEED_UPDATE/NO_UPDATE]
  Priority: [CRITICAL/HIGH/MEDIUM/LOW]
```

**Step 3: Update Plan**
- Document the change
- Update affected commands
- Adjust timeline if needed
- Update acceptance criteria

**Step 4: Confirm**
- Review changes with stakeholder
- Get approval if major deviation
- Update execution log

**Step 5: Resume**
```yaml
Action: RESUME
Resuming From: [COMMAND_ID]
Changes Applied: [SUMMARY]
New ETA: [TIMESTAMP]
```

---

## Self-Correction Mechanism

### Error Detection

Monitor for these error types:

1. **Syntax Errors**
   - Missing semicolons, brackets
   - Typos in variable names
   - Invalid syntax

2. **Type Errors**
   - TypeScript type mismatches
   - Missing type definitions
   - Incorrect generics

3. **Runtime Errors**
   - Null/undefined references
   - Array index out of bounds
   - Promise rejections

4. **Logic Errors**
   - Incorrect algorithm
   - Wrong calculations
   - Unexpected behavior

### Auto-Fix Patterns

```typescript
// Pattern 1: Null Safety
// Before:
const value = data.item.property;

// After:
const value = data?.item?.property ?? defaultValue;

// Pattern 2: Type Safety
// Before:
function process(data: any) { }

// After:
function process(data: SpecificType) { }

// Pattern 3: Error Handling
// Before:
await riskyOperation();

// After:
try {
  await riskyOperation();
} catch (error) {
  console.error('Operation failed:', error);
  // Handle appropriately
}
```

---

## Execution Progress Log

| Timestamp | Phase | Command | Status | Duration | Notes |
|-----------|-------|---------|--------|----------|-------|
| [AUTO] | 1 | 1.1 | ⬜ PENDING | - | Fix Home.tsx icons |
| [AUTO] | 1 | 1.2 | ⬜ PENDING | - | Create ErrorBoundary |
| [AUTO] | 1 | 1.3 | ⬜ PENDING | - | Wrap App |
| [AUTO] | 1 | 1.4 | ⬜ PENDING | - | Validate pages |
| [AUTO] | 1 | 1.5 | ⬜ PENDING | - | Validate data |
| [AUTO] | 2 | 2.1 | ⬜ PENDING | - | Create AI directories |
| [AUTO] | 2 | 2.2 | ⬜ PENDING | - | Text processor |
| [AUTO] | 2 | 2.3 | ⬜ PENDING | - | Intent classifier |
| [AUTO] | 2 | 2.4 | ⬜ PENDING | - | Workflow engine |
| [AUTO] | 2 | 2.5 | ⬜ PENDING | - | ML models |
| [AUTO] | 2 | 2.6 | ⬜ PENDING | - | Chat handler |
| [AUTO] | 2 | 2.7 | ⬜ PENDING | - | AI API routes |
| [AUTO] | 3 | 3.1 | ⬜ PENDING | - | Database setup |
| [AUTO] | 3 | 3.2 | ⬜ PENDING | - | Authentication |
| [AUTO] | 3 | 3.3 | ⬜ PENDING | - | API routes |
| [AUTO] | 3 | 3.4 | ⬜ PENDING | - | Database seed |

### Log Status Icons
- ⬜ PENDING - Not started
- 🔄 IN_PROGRESS - Currently executing
- ✅ COMPLETED - Successfully finished
- ❌ FAILED - Error occurred
- ⏸️ PAUSED - Temporarily stopped
- ⚠️ WARNING - Completed with warnings

---

## Final Checklist

### Before Deployment

- [ ] All phases completed successfully
- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Backup created

### Deployment Steps

```bash
# 1. Build production assets
npm run build

# 2. Run final tests
npm test

# 3. Create deployment package
tar -czf diglit-deploy.tar.gz dist/ server/ package.json

# 4. Deploy to production environment
# (Follow your platform's deployment guide)
```

---

## Support & Maintenance

### Getting Help

**For AI Execution:**
- Provide clear error messages to the AI
- Request step-by-step debugging
- Ask for alternative approaches

**For Manual Execution:**
- Check GitHub issues
- Review documentation
- Contact development team

### Maintenance Tasks

**Daily:**
- Monitor error logs
- Check performance metrics
- Review user feedback

**Weekly:**
- Update dependencies
- Run security scans
- Backup database

**Monthly:**
- Review analytics
- Update documentation
- Plan improvements

---

## Execution Complete

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║  🎉 DIG|LIT PLATFORM AUTOMATION COMPLETE! 🎉             ║
║                                                           ║
║  All phases executed successfully                         ║
║  Platform is ready for deployment                         ║
║                                                           ║
║  Thank you for using this automation framework!           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

**Final Sign-off:**
```yaml
Project: DIG|LIT Platform
Execution Mode: [AI_ASSISTED/MANUAL]
Total Duration: [HOURS]
Phases Completed: [NUMBER]/[TOTAL]
Success Rate: [PERCENTAGE]%
Deployment Status: [READY/NOT_READY]
Signed Off By: [NAME]
Date: [DATE]
```

---

**End of Executor Document**
