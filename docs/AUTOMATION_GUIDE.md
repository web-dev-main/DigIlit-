# DIG|LIT Automation Guide
## Self-Executing Development Framework

> **Version:** 2.0  
> **Last Updated:** 2025-10-24  
> **Status:** Production Ready  
> **Platform:** Platform-Agnostic (GitHub, Local, Cloud)

---

## Table of Contents

1. [Purpose & Overview](#purpose--overview)
2. [System Requirements](#system-requirements)
3. [Automation Principles](#automation-principles)
4. [Phase 1: Frontend Foundation](#phase-1-frontend-foundation)
5. [Phase 2: AI Core Engine](#phase-2-ai-core-engine)
6. [Phase 3: Backend Architecture](#phase-3-backend-architecture)
7. [Phase 4: Business Analytics](#phase-4-business-analytics)
8. [Phase 5: Visual Engine](#phase-5-visual-engine)
9. [Execution Protocol](#execution-protocol)
10. [Quality Assurance](#quality-assurance)

---

## Purpose & Overview

This guide provides a complete automation framework for building the DIG|LIT platform. It serves as:

- **Roadmap**: Clear phase-by-phase development plan
- **Instruction Set**: Executable commands for automated development
- **Documentation**: Reference for manual implementation
- **Quality Gate**: Validation criteria for each phase

### Key Features

- ✅ Platform-agnostic (works on any environment)
- ✅ No proprietary dependencies
- ✅ Self-contained execution
- ✅ Modular architecture
- ✅ Built-in error handling
- ✅ Progress tracking

---

## System Requirements

### Minimum Requirements

```yaml
Node.js: ">=18.0.0"
npm: ">=9.0.0"
PostgreSQL: ">=14.0"
Memory: "4GB RAM"
Storage: "2GB available"
```

### Tech Stack

```json
{
  "frontend": {
    "framework": "React 18",
    "bundler": "Vite",
    "styling": "TailwindCSS + shadcn/ui",
    "language": "TypeScript"
  },
  "backend": {
    "runtime": "Node.js + Express",
    "database": "PostgreSQL + Drizzle ORM",
    "validation": "Zod",
    "language": "TypeScript"
  },
  "deployment": {
    "options": ["Docker", "Node Server", "Cloud Platform"],
    "ci_cd": "GitHub Actions (optional)"
  }
}
```

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/diglit-platform.git
cd diglit-platform

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Setup database
npm run db:migrate
npm run db:seed

# Start development
npm run dev
```

---

## Automation Principles

### Core Tenets

1. **Zero Third-Party AI Dependencies**
   - All AI features built from scratch
   - Use native JavaScript/TypeScript
   - Statistical methods over black-box APIs

2. **Self-Contained Execution**
   - No external services required
   - Works offline after initial setup
   - All data stays local

3. **Modular Architecture**
   - Each phase is independent
   - Can be executed in isolation
   - Clear interfaces between modules

4. **Error Detection & Recovery**
   - Automated error detection
   - Self-correction mechanisms
   - Graceful degradation

5. **Progress Transparency**
   - State tracking at each step
   - Rollback capability
   - Audit trail logging

6. **Change Accommodation**
   - Dynamic requirement handling
   - Priority adjustment
   - Non-breaking updates

---

## Phase 1: Frontend Foundation

### Objective
Ensure all frontend components are functional, responsive, and error-free.

### Tasks Overview

| Task | Priority | Estimated Time | Dependencies |
|------|----------|----------------|--------------|
| Component Validation | Critical | 1 hour | None |
| Page Validation | Critical | 1 hour | Component Validation |
| Data Flow Validation | High | 30 min | Page Validation |
| Style Validation | Medium | 1 hour | All above |

### 1.1 Component Validation

**Goal**: Verify all UI components render correctly

```typescript
// Components to validate (40+ total)
const componentChecklist = [
  'ThirteenPointSeal',
  'Navigation',
  'AtomToStar',
  'Button',
  'Card',
  'Dialog',
  'Form',
  'Input',
  // ... all shadcn/ui components
];

// Validation script
componentChecklist.forEach(component => {
  test(`${component} renders without errors`, () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toBeInTheDocument();
    expect(console.error).not.toHaveBeenCalled();
  });
});
```

**Action Items:**
- [ ] Import and test each component
- [ ] Check for console warnings
- [ ] Verify prop types
- [ ] Test edge cases (empty props, null values)

### 1.2 Page Validation

**Critical Fix**: Home.tsx Quick Access Icon Rendering

```typescript
// ❌ INCORRECT - Causes "Objects are not valid as React child" error
const QuickAccess = () => {
  const links = [
    { icon: BookOpen, title: "Solutions", path: "/solutions" }
  ];
  
  return (
    <div>
      {links.map(link => (
        <Icon className="h-12 w-12" /> // ❌ Wrong: Icon is undefined
      ))}
    </div>
  );
};

// ✅ CORRECT - Renders icon component properly
const QuickAccess = () => {
  const links = [
    { icon: BookOpen, title: "Solutions", path: "/solutions" }
  ];
  
  return (
    <div>
      {links.map(link => {
        const IconComponent = link.icon; // Extract component
        return <IconComponent className="h-12 w-12" />; // ✅ Render properly
      })}
    </div>
  );
};
```

**Pages Checklist:**

```bash
# Test each page route
npm run test:pages

# Expected output:
✓ / (Home) - No errors
✓ /solutions - All 5 solutions display
✓ /services - 13 categories expand/collapse
✓ /shop - 22 products with filtering
✓ /login - Form validation works
```

### 1.3 Data Flow Validation

**Data Structure Integrity:**

```typescript
// Validate JSON matches TypeScript types
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  // ... other fields
}

// Validation function
function validateDataIntegrity() {
  const products = require('./data/products.json');
  products.forEach((product: any) => {
    assert(typeof product.id === 'string', 'ID must be string');
    assert(typeof product.price === 'number', 'Price must be number');
    assert(product.price > 0, 'Price must be positive');
  });
}
```

### 1.4 Style Validation

**Responsive Breakpoints:**

```css
/* Verify these breakpoints work */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

**Color Scheme Consistency:**

```typescript
// Theme validation
const themeColors = {
  primary: 'amber-500',    // #f59e0b
  secondary: 'amber-600',  // #d97706
  accent: 'gold',
  background: 'black',
  text: 'amber-100'
};

// Check all components use theme colors
grep -r "text-amber-" client/src/components/
grep -r "bg-amber-" client/src/components/
```

**Animation Performance:**

```typescript
// Ensure 60fps for all animations
const animations = [
  'hover-elevate',
  'blink',
  'fade-in',
  'slide-up',
  'atom-orbit'
];

// Monitor with Performance API
performance.mark('animation-start');
// ... run animation
performance.mark('animation-end');
performance.measure('animation', 'animation-start', 'animation-end');
```

### Acceptance Criteria

- ✅ Zero console errors on all pages
- ✅ All components render without warnings
- ✅ Responsive design works on mobile/tablet/desktop
- ✅ Animations run at 60fps minimum
- ✅ Navigation between all routes works
- ✅ Data loads correctly from JSON files
- ✅ TypeScript compiles with no errors
- ✅ Lighthouse score: Performance 90+

---

## Phase 2: AI Core Engine

### Objective
Build intelligent automation and AI capabilities without external dependencies.

### Architecture

```
server/ai-core/
├── nlp/
│   ├── text-processor.ts      # Tokenization, keyword extraction
│   ├── sentiment-analyzer.ts  # Emotion detection
│   └── intent-classifier.ts   # User intent detection
├── automation/
│   ├── workflow-engine.ts     # Task automation
│   ├── scheduler.ts           # Cron-like scheduling
│   └── rule-engine.ts         # Business rules
├── ml-models/
│   ├── predictor.ts           # Pattern recognition
│   ├── clusterer.ts           # Data grouping
│   └── recommender.ts         # Recommendation system
└── assistant/
    ├── chat-handler.ts        # Conversation management
    ├── context-manager.ts     # Memory & context
    └── response-generator.ts  # Natural language generation
```

### 2.1 Natural Language Processing

**Text Processor Implementation:**

```typescript
// server/ai-core/nlp/text-processor.ts
export class TextProcessor {
  /**
   * Tokenize text into words
   * No external libraries - pure JavaScript
   */
  static tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s'-]/g, ' ')  // Keep hyphens and apostrophes
      .split(/\s+/)
      .filter(token => token.length > 0);
  }

  /**
   * Extract meaningful keywords
   * Filters out common stop words
   */
  static extractKeywords(text: string, minLength: number = 3): string[] {
    const stopWords = new Set([
      'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but',
      'in', 'with', 'to', 'for', 'of', 'as', 'by', 'from', 'that', 'this',
      'be', 'are', 'was', 'were', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might'
    ]);

    return this.tokenize(text)
      .filter(word => word.length >= minLength)
      .filter(word => !stopWords.has(word))
      .filter((word, index, self) => self.indexOf(word) === index); // Unique
  }

  /**
   * Analyze text sentiment
   * Returns score between -1 (negative) and 1 (positive)
   */
  static analyzeSentiment(text: string): {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
    confidence: number;
  } {
    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
      'love', 'best', 'perfect', 'awesome', 'brilliant', 'outstanding'
    ];
    
    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate',
      'poor', 'disappointing', 'useless', 'broken', 'failed'
    ];

    const intensifiers = ['very', 'really', 'extremely', 'absolutely'];
    
    const tokens = this.tokenize(text);
    let score = 0;
    let totalWeight = 0;

    tokens.forEach((token, index) => {
      let weight = 1;
      
      // Check for intensifier before this word
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
   * Extract entities from text
   * Finds emails, URLs, phone numbers, etc.
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
   * Calculate text similarity using Jaccard index
   */
  static similarity(text1: string, text2: string): number {
    const tokens1 = new Set(this.tokenize(text1));
    const tokens2 = new Set(this.tokenize(text2));
    
    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
    const union = new Set([...tokens1, ...tokens2]);
    
    return intersection.size / union.size;
  }
}
```

**Intent Classification:**

```typescript
// server/ai-core/nlp/intent-classifier.ts
export class IntentClassifier {
  private patterns: Map<string, RegExp[]> = new Map([
    ['greeting', [
      /^(hi|hello|hey|greetings)/i,
      /good (morning|afternoon|evening)/i
    ]],
    ['help_request', [
      /\b(help|assist|support|guide)\b/i,
      /how (do|can) i/i,
      /\bwhat('?s| is)\b.*\b(how|when|where)\b/i
    ]],
    ['pricing_inquiry', [
      /\b(price|cost|pricing|payment|pay|afford)\b/i,
      /how much/i,
      /what.*cost/i
    ]],
    ['product_inquiry', [
      /\b(product|service|solution|feature)\b/i,
      /what (do you|can you) (offer|provide)/i,
      /tell me about/i
    ]],
    ['complaint', [
      /\b(problem|issue|bug|error|broken|not working)\b/i,
      /\b(disappointed|frustrated|angry)\b/i
    ]],
    ['compliment', [
      /\b(thank|thanks|appreciate|great|excellent|amazing)\b/i,
      /good job|well done/i
    ]]
  ]);

  classify(text: string): {
    intent: string;
    confidence: number;
    matches: string[];
  } {
    const keywords = TextProcessor.extractKeywords(text);
    const matches: Array<{ intent: string; score: number }> = [];

    for (const [intent, patterns] of this.patterns) {
      let score = 0;
      for (const pattern of patterns) {
        if (pattern.test(text)) {
          score += 1;
        }
      }
      
      // Boost score based on keyword matches
      const intentKeywords = this.getIntentKeywords(intent);
      const keywordMatches = keywords.filter(k => 
        intentKeywords.includes(k)
      );
      score += keywordMatches.length * 0.5;

      if (score > 0) {
        matches.push({ intent, score });
      }
    }

    // Sort by score and return highest
    matches.sort((a, b) => b.score - a.score);
    
    if (matches.length === 0) {
      return { intent: 'general', confidence: 0.5, matches: [] };
    }

    const topMatch = matches[0];
    const confidence = Math.min(topMatch.score / 3, 1); // Normalize

    return {
      intent: topMatch.intent,
      confidence,
      matches: matches.map(m => m.intent)
    };
  }

  private getIntentKeywords(intent: string): string[] {
    const keywordMap: Record<string, string[]> = {
      greeting: ['hi', 'hello', 'hey'],
      help_request: ['help', 'assist', 'support'],
      pricing_inquiry: ['price', 'cost', 'payment'],
      product_inquiry: ['product', 'service', 'solution'],
      complaint: ['problem', 'issue', 'bug'],
      compliment: ['thank', 'great', 'excellent']
    };
    return keywordMap[intent] || [];
  }
}
```

### 2.2 Workflow Automation

**Workflow Engine:**

```typescript
// server/ai-core/automation/workflow-engine.ts
export interface WorkflowStep {
  id: string;
  type: 'action' | 'condition' | 'loop' | 'parallel';
  config: Record<string, any>;
  next?: string | string[];
  onError?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: Record<string, WorkflowStep>;
  startStep: string;
  variables: Record<string, any>;
}

export class WorkflowEngine {
  private workflows: Map<string, Workflow> = new Map();
  private executionLog: Array<{
    workflowId: string;
    stepId: string;
    timestamp: Date;
    status: 'success' | 'error';
    result?: any;
    error?: string;
  }> = [];

  registerWorkflow(workflow: Workflow): void {
    this.workflows.set(workflow.id, workflow);
  }

  async execute(
    workflowId: string,
    initialContext: Record<string, any> = {}
  ): Promise<{
    success: boolean;
    result: any;
    error?: string;
    executionTime: number;
  }> {
    const startTime = Date.now();
    const workflow = this.workflows.get(workflowId);
    
    if (!workflow) {
      return {
        success: false,
        result: null,
        error: `Workflow ${workflowId} not found`,
        executionTime: 0
      };
    }

    try {
      const context = { ...workflow.variables, ...initialContext };
      const result = await this.executeStep(
        workflow,
        workflow.startStep,
        context
      );

      return {
        success: true,
        result,
        executionTime: Date.now() - startTime
      };
    } catch (error: any) {
      return {
        success: false,
        result: null,
        error: error.message,
        executionTime: Date.now() - startTime
      };
    }
  }

  private async executeStep(
    workflow: Workflow,
    stepId: string,
    context: Record<string, any>
  ): Promise<any> {
    const step = workflow.steps[stepId];
    if (!step) {
      throw new Error(`Step ${stepId} not found in workflow`);
    }

    try {
      let result: any;

      switch (step.type) {
        case 'action':
          result = await this.executeAction(step, context);
          break;
        case 'condition':
          result = await this.executeCondition(step, context);
          break;
        case 'loop':
          result = await this.executeLoop(step, context, workflow);
          break;
        case 'parallel':
          result = await this.executeParallel(step, context, workflow);
          break;
        default:
          throw new Error(`Unknown step type: ${step.type}`);
      }

      this.logExecution(workflow.id, stepId, 'success', result);

      // Proceed to next step
      if (step.next) {
        const nextStep = typeof step.next === 'string' 
          ? step.next 
          : step.next[0];
        return this.executeStep(workflow, nextStep, { ...context, ...result });
      }

      return result;

    } catch (error: any) {
      this.logExecution(workflow.id, stepId, 'error', undefined, error.message);
      
      if (step.onError) {
        return this.executeStep(workflow, step.onError, context);
      }
      
      throw error;
    }
  }

  private async executeAction(
    step: WorkflowStep,
    context: Record<string, any>
  ): Promise<any> {
    const { action, params } = step.config;
    
    // Resolve variables in params
    const resolvedParams = this.resolveVariables(params, context);
    
    // Execute action (extensible action registry)
    const actionResult = await this.performAction(action, resolvedParams);
    
    return { [`${step.id}_result`]: actionResult };
  }

  private async executeCondition(
    step: WorkflowStep,
    context: Record<string, any>
  ): Promise<any> {
    const { condition, truePath, falsePath } = step.config;
    
    const conditionMet = this.evaluateCondition(condition, context);
    
    step.next = conditionMet ? truePath : falsePath;
    
    return { [`${step.id}_condition`]: conditionMet };
  }

  private async executeLoop(
    step: WorkflowStep,
    context: Record<string, any>,
    workflow: Workflow
  ): Promise<any> {
    const { items, loopStep, maxIterations = 1000 } = step.config;
    const results: any[] = [];
    
    const itemsArray = this.resolveVariables(items, context);
    
    if (!Array.isArray(itemsArray)) {
      throw new Error('Loop items must be an array');
    }
    
    for (let i = 0; i < Math.min(itemsArray.length, maxIterations); i++) {
      const loopContext = {
        ...context,
        loopItem: itemsArray[i],
        loopIndex: i
      };
      
      const result = await this.executeStep(workflow, loopStep, loopContext);
      results.push(result);
    }
    
    return { [`${step.id}_results`]: results };
  }

  private async executeParallel(
    step: WorkflowStep,
    context: Record<string, any>,
    workflow: Workflow
  ): Promise<any> {
    const { steps: parallelSteps } = step.config;
    
    const promises = parallelSteps.map((stepId: string) =>
      this.executeStep(workflow, stepId, { ...context })
    );
    
    const results = await Promise.all(promises);
    
    return { [`${step.id}_parallel_results`]: results };
  }

  private resolveVariables(
    value: any,
    context: Record<string, any>
  ): any {
    if (typeof value === 'string' && value.startsWith('${') && value.endsWith('}')) {
      const varName = value.slice(2, -1);
      return context[varName];
    }
    
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return value.map(v => this.resolveVariables(v, context));
      }
      
      const resolved: Record<string, any> = {};
      for (const [key, val] of Object.entries(value)) {
        resolved[key] = this.resolveVariables(val, context);
      }
      return resolved;
    }
    
    return value;
  }

  private evaluateCondition(
    condition: string,
    context: Record<string, any>
  ): boolean {
    // Simple condition evaluator
    // Format: "variable operator value"
    // Example: "count > 10" or "status == 'active'"
    
    const match = condition.match(/(\w+)\s*(==|!=|>|<|>=|<=)\s*(.+)/);
    if (!match) return false;
    
    const [, variable, operator, valueStr] = match;
    const contextValue = context[variable];
    let compareValue: any = valueStr.trim();
    
    // Parse value
    if (compareValue.startsWith("'") || compareValue.startsWith('"')) {
      compareValue = compareValue.slice(1, -1);
    } else if (!isNaN(Number(compareValue))) {
      compareValue = Number(compareValue);
    } else if (compareValue === 'true' || compareValue === 'false') {
      compareValue = compareValue === 'true';
    }
    
    // Evaluate
    switch (operator) {
      case '==': return contextValue == compareValue;
      case '!=': return contextValue != compareValue;
      case '>': return contextValue > compareValue;
      case '<': return contextValue < compareValue;
      case '>=': return contextValue >= compareValue;
      case '<=': return contextValue <= compareValue;
      default: return false;
    }
  }

  private async performAction(
    action: string,
    params: Record<string, any>
  ): Promise<any> {
    // Extensible action registry
    const actions: Record<string, (params: any) => Promise<any>> = {
      'log': async (params) => {
        console.log('[Workflow]', params.message);
        return { logged: true };
      },
      'delay': async (params) => {
        await new Promise(resolve => setTimeout(resolve, params.ms || 1000));
        return { delayed: params.ms };
      },
      'http_request': async (params) => {
        // Placeholder for HTTP requests
        return { status: 'success', data: params };
      },
      'database_query': async (params) => {
        // Placeholder for database operations
        return { query: params.sql, result: [] };
      }
    };
    
    const actionFn = actions[action];
    if (!actionFn) {
      throw new Error(`Unknown action: ${action}`);
    }
    
    return actionFn(params);
  }

  private logExecution(
    workflowId: string,
    stepId: string,
    status: 'success' | 'error',
    result?: any,
    error?: string
  ): void {
    this.executionLog.push({
      workflowId,
      stepId,
      timestamp: new Date(),
      status,
      result,
      error
    });
    
    // Keep only last 1000 entries
    if (this.executionLog.length > 1000) {
      this.executionLog = this.executionLog.slice(-1000);
    }
  }

  getExecutionLog(workflowId?: string) {
    if (workflowId) {
      return this.executionLog.filter(log => log.workflowId === workflowId);
    }
    return this.executionLog;
  }
}
```

### 2.3 Machine Learning Models

**Pattern Predictor:**

```typescript
// server/ai-core/ml-models/predictor.ts
export class PatternPredictor {
  /**
   * Simple linear regression predictor
   * Predicts next value based on historical data
   */
  static predictLinear(data: number[]): {
    prediction: number;
    confidence: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  } {
    if (data.length < 2) {
      return { prediction: data[0] || 0, confidence: 0, trend: 'stable' };
    }

    // Calculate slope and intercept
    const n = data.length;
    const indices = Array.from({ length: n }, (_, i) => i);
    
    const sumX = indices.reduce((a, b) => a + b, 0);
    const sumY = data.reduce((a, b) => a + b, 0);
    const sumXY = indices.reduce((sum, x, i) => sum + x * data[i], 0);
    const sumX2 = indices.reduce((sum, x) => sum + x * x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Predict next value
    const prediction = slope * n + intercept;
    
    // Calculate R-squared for confidence
    const yMean = sumY / n;
    const totalSS = data.reduce((sum, y) => sum + (y - yMean) ** 2, 0);
    const residualSS = data.reduce((sum, y, i) => {
      const predicted = slope * i + intercept;
      return sum + (y - predicted) ** 2;
    }, 0);
    
    const rSquared = 1 - (residualSS / totalSS);
    const confidence = Math.max(0, Math.min(1, rSquared));
    
    // Determine trend
    let trend: 'increasing' | 'decreasing' | 'stable';
    if (Math.abs(slope) < 0.01) trend = 'stable';
    else if (slope > 0) trend = 'increasing';
    else trend = 'decreasing';
    
    return { prediction, confidence, trend };
  }

  /**
   * Moving average predictor
   * Good for smoothing noisy data
   */
  static predictMovingAverage(
    data: number[],
    window: number = 3
  ): {
    prediction: number;
    smoothed: number[];
  } {
    if (data.length < window) {
      return { 
        prediction: data[data.length - 1] || 0, 
        smoothed: data 
      };
    }

    const smoothed: number[] = [];
    
    for (let i = window - 1; i < data.length; i++) {
      const windowData = data.slice(i - window + 1, i + 1);
      const avg = windowData.reduce((a, b) => a + b, 0) / window;
      smoothed.push(avg);
    }
    
    // Prediction is the last moving average
    const prediction = smoothed[smoothed.length - 1];
    
    return { prediction, smoothed };
  }

  /**
   * Anomaly detection using statistical methods
   */
  static detectAnomalies(
    data: number[],
    threshold: number = 2
  ): {
    anomalies: Array<{ index: number; value: number; score: number }>;
    normal: number[];
  } {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((sum, val) => sum + (val - mean) ** 2, 0) / data.length;
    const stdDev = Math.sqrt(variance);
    
    const anomalies: Array<{ index: number; value: number; score: number }> = [];
    const normal: number[] = [];
    
    data.forEach((value, index) => {
      const zScore = Math.abs((value - mean) / stdDev);
      
      if (zScore > threshold) {
        anomalies.push({ index, value, score: zScore });
      } else {
        normal.push(value);
      }
    });
    
    return { anomalies, normal };
  }
}
```

**Recommender System:**

```typescript
// server/ai-core/ml-models/recommender.ts
export class RecommenderSystem {
  /**
   * Collaborative filtering using cosine similarity
   */
  static recommendBySimilarity(
    userPreferences: Record<string, number>,
    allUsers: Array<{ id: string; preferences: Record<string, number> }>,
    topN: number = 5
  ): Array<{ itemId: string; score: number }> {
    // Find similar users
    const similarities = allUsers.map(user => ({
      userId: user.id,
      similarity: this.cosineSimilarity(userPreferences, user.preferences)
    }));
    
    // Sort by similarity
    similarities.sort((a, b) => b.similarity - a.similarity);
    
    // Get top similar users
    const similarUsers = similarities.slice(0, 10);
    
    // Aggregate recommendations
    const recommendations: Record<string, number> = {};
    
    similarUsers.forEach(({ userId, similarity }) => {
      const user = allUsers.find(u => u.id === userId);
      if (!user) return;
      
      Object.entries(user.preferences).forEach(([itemId, rating]) => {
        if (!(itemId in userPreferences)) {
          recommendations[itemId] = (recommendations[itemId] || 0) + 
            rating * similarity;
        }
      });
    });
    
    // Sort and return top N
    return Object.entries(recommendations)
      .map(([itemId, score]) => ({ itemId, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }

  /**
   * Content-based filtering
   */
  static recommendByContent(
    itemFeatures: Record<string, number[]>,
    userLikedItems: string[],
    topN: number = 5
  ): Array<{ itemId: string; score: number }> {
    // Create user profile from liked items
    const userProfile = this.createUserProfile(
      userLikedItems.map(id => itemFeatures[id]).filter(Boolean)
    );
    
    // Calculate similarity for all items
    const scores = Object.entries(itemFeatures)
      .filter(([itemId]) => !userLikedItems.includes(itemId))
      .map(([itemId, features]) => ({
        itemId,
        score: this.cosineSimilarity(
          userProfile,
          this.arrayToRecord(features)
        )
      }));
    
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }

  private static cosineSimilarity(
    vec1: Record<string, number>,
    vec2: Record<string, number>
  ): number {
    const keys1 = Object.keys(vec1);
    const keys2 = Object.keys(vec2);
    const allKeys = new Set([...keys1, ...keys2]);
    
    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;
    
    allKeys.forEach(key => {
      const val1 = vec1[key] || 0;
      const val2 = vec2[key] || 0;
      
      dotProduct += val1 * val2;
      mag1 += val1 * val1;
      mag2 += val2 * val2;
    });
    
    const magnitude = Math.sqrt(mag1) * Math.sqrt(mag2);
    return magnitude === 0 ? 0 : dotProduct / magnitude;
  }

  private static createUserProfile(
    itemFeatures: number[][]
  ): Record<string, number> {
    if (itemFeatures.length === 0) return {};
    
    const profile: Record<string, number> = {};
    const featureLength = itemFeatures[0].length;
    
    for (let i = 0; i < featureLength; i++) {
      const sum = itemFeatures.reduce((acc, features) => acc + features[i], 0);
      profile[`feature_${i}`] = sum / itemFeatures.length;
    }
    
    return profile;
  }

  private static arrayToRecord(arr: number[]): Record<string, number> {
    const record: Record<string, number> = {};
    arr.forEach((val, idx) => {
      record[`feature_${idx}`] = val;
    });
    return record;
  }
}
```

### 2.4 AI Assistant Core

```typescript
// server/ai-core/assistant/chat-handler.ts
import { TextProcessor } from '../nlp/text-processor';
import { IntentClassifier } from '../nlp/intent-classifier';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
  context: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export class ChatHandler {
  private conversations: Map<string, Conversation> = new Map();
  private intentClassifier = new IntentClassifier();
  private responseTemplates: Record<string, string[]> = {
    greeting: [
      "Hello! Welcome to DIG|LIT. How can I assist you today?",
      "Hi there! I'm here to help with our services. What can I do for you?",
      "Greetings! Ready to explore DIG|LIT solutions?"
    ],
    help_request: [
      "I'm here to help! I can assist with Virtual Assistance, AI Solutions, Expert Teams, Digital Transformation, or Quantum ERP. What interests you?",
      "Happy to help! What would you like to know about our services?",
      "I can guide you through our offerings. What specific area are you interested in?"
    ],
    pricing_inquiry: [
      "Our pricing varies by service:\n• Virtual Assistance: Starting at $899/month\n• AI Automation: From $2,499/month\n• Expert Teams: $15,000+ per project\n• Digital Transformation: Custom pricing\n• Quantum ERP: Enterprise pricing\n\nWhich service would you like details on?",
      "I'd be happy to discuss pricing! Which solution are you interested in?"
    ],
    product_inquiry: [
      "We offer 5 core solutions:\n1. Virtual Assistance - AI-powered business support\n2. AI Solutions - Custom automation\n3. Expert Teams - On-demand specialists\n4. Digital Transformation - Complete modernization\n5. Quantum ERP - Next-gen business management\n\nWhich would you like to explore?",
      "Let me tell you about our solutions! Which area interests you most?"
    ],
    complaint: [
      "I'm sorry to hear you're experiencing issues. Let me help resolve this right away. Can you provide more details?",
      "I apologize for the inconvenience. Your satisfaction is our priority. Please describe the problem so I can assist."
    ],
    compliment: [
      "Thank you so much! We're delighted to serve you. Is there anything else I can help with?",
      "We appreciate your kind words! Let us know if you need anything else."
    ],
    general: [
      "I'm here to help with DIG|LIT services. What can I assist you with today?",
      "How can I help you with our platform?"
    ]
  };

  createConversation(userId: string): string {
    const conversationId = `conv_${Date.now()}_${userId}`;
    
    this.conversations.set(conversationId, {
      id: conversationId,
      userId,
      messages: [],
      context: {},
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return conversationId;
  }

  async handleMessage(
    conversationId: string,
    userMessage: string
  ): Promise<{
    response: string;
    intent: string;
    confidence: number;
    suggestions?: string[];
  }> {
    const conversation = this.conversations.get(conversationId);
    
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // Add user message
    conversation.messages.push({
      id: `msg_${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    // Classify intent
    const { intent, confidence } = this.intentClassifier.classify(userMessage);

    // Extract entities for context
    const entities = TextProcessor.extractEntities(userMessage);
    conversation.context = {
      ...conversation.context,
      lastIntent: intent,
      entities,
      messageCount: conversation.messages.length
    };

    // Generate response
    const response = this.generateResponse(intent, userMessage, conversation);

    // Add assistant message
    conversation.messages.push({
      id: `msg_${Date.now() + 1}`,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      metadata: { intent, confidence }
    });

    conversation.updatedAt = new Date();

    // Generate suggestions
    const suggestions = this.generateSuggestions(intent, conversation);

    return { response, intent, confidence, suggestions };
  }

  private generateResponse(
    intent: string,
    message: string,
    conversation: Conversation
  ): string {
    const templates = this.responseTemplates[intent] || this.responseTemplates.general;
    const template = templates[Math.floor(Math.random() * templates.length)];

    // Context-aware enhancements
    if (conversation.context.messageCount === 1) {
      return template; // First message - use template as-is
    }

    // Check for follow-up context
    const keywords = TextProcessor.extractKeywords(message);
    
    if (keywords.some(k => ['virtual', 'assistant', 'va'].includes(k))) {
      return this.getServiceDetails('virtual_assistance');
    }
    
    if (keywords.some(k => ['ai', 'automation', 'intelligent'].includes(k))) {
      return this.getServiceDetails('ai_solutions');
    }
    
    if (keywords.some(k => ['team', 'expert', 'specialist'].includes(k))) {
      return this.getServiceDetails('expert_teams');
    }

    return template;
  }

  private getServiceDetails(service: string): string {
    const details: Record<string, string> = {
      virtual_assistance: "Our Virtual Assistance service provides 24/7 AI-powered support for your business operations. Features include:\n• Intelligent task automation\n• Customer service support\n• Document processing\n• Calendar & email management\n• Starting at $899/month\n\nWould you like to schedule a demo?",
      
      ai_solutions: "Our AI Solutions offer custom automation tailored to your needs:\n• Process automation\n• Predictive analytics\n• Natural language processing\n• Computer vision\n• From $2,499/month\n\nInterested in a consultation?",
      
      expert_teams: "Access top-tier specialists on-demand:\n• Software developers\n• Data scientists\n• Business analysts\n• Project managers\n• Flexible engagement models\n• Starting at $15,000/project\n\nReady to build your dream team?"
    };

    return details[service] || "Let me get you more information about that service.";
  }

  private generateSuggestions(
    intent: string,
    conversation: Conversation
  ): string[] {
    const suggestionMap: Record<string, string[]> = {
      greeting: [
        "Tell me about your services",
        "What are your pricing options?",
        "How can you help my business?"
      ],
      help_request: [
        "Show me Virtual Assistance features",
        "Explain AI Solutions",
        "What makes you different?"
      ],
      pricing_inquiry: [
        "Compare pricing plans",
        "Schedule a consultation",
        "View case studies"
      ],
      product_inquiry: [
        "See customer testimonials",
        "Request a demo",
        "Compare solutions"
      ]
    };

    return suggestionMap[intent] || [
      "Learn more about our services",
      "Contact sales",
      "Browse our shop"
    ];
  }

  getConversationHistory(conversationId: string): Message[] {
    const conversation = this.conversations.get(conversationId);
    return conversation?.messages || [];
  }

  deleteConversation(conversationId: string): boolean {
    return this.conversations.delete(conversationId);
  }

  // Export conversation for analysis
  exportConversation(conversationId: string): Conversation | null {
    const conversation = this.conversations.get(conversationId);
    return conversation ? { ...conversation } : null;
  }
}
```

### Acceptance Criteria - Phase 2

- ✅ Text analysis works without external NLP libraries
- ✅ Sentiment analysis achieves 70%+ accuracy on test data
- ✅ Intent classification correctly identifies 80%+ of common intents
- ✅ Workflow engine can execute complex multi-step workflows
- ✅ Workflow error handling and rollback works correctly
- ✅ Pattern prediction provides reasonable forecasts
- ✅ Anomaly detection identifies outliers accurately
- ✅ Recommendation system generates relevant suggestions
- ✅ Chat handler maintains conversation context
- ✅ All AI features work without third-party AI APIs
- ✅ Response time under 200ms for text processing
- ✅ Memory usage stays below 512MB under load

---

## Phase 3: Backend Architecture

### Objective
Build a robust, scalable API layer with proper authentication, validation, and data persistence.

### Database Schema

```typescript
// server/db/schema.ts
import { pgTable, text, integer, decimal, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name'),
  role: text('role').default('user'), // user, admin, partner
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  category: text('category').notNull(),
  imageUrl: text('image_url'),
  featured: boolean('featured').default(false),
  stock: integer('stock').default(0),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow()
});

export const solutions = pgTable('solutions', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  features: jsonb('features').notNull(),
  pricing: jsonb('pricing').notNull(),
  icon: text('icon'),
  category: text('category'),
  createdAt: timestamp('created_at').defaultNow()
});

export const services = pgTable('services', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  pricing: text('pricing'),
  duration: text('duration'),
  availability: boolean('availability').default(true),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow()
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  items: jsonb('items').notNull(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: text('status').default('pending'), // pending, processing, completed, cancelled
  paymentMethod: text('payment_method'),
  shippingAddress: jsonb('shipping_address'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const cart = pgTable('cart', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  items: jsonb('items').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
```

### Authentication System

```typescript
// server/auth/password.ts
import { createHash, randomBytes, pbkdf2 } from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(pbkdf2);

export class PasswordManager {
  private static readonly ITERATIONS = 100000;
  private static readonly KEY_LENGTH = 64;
  private static readonly DIGEST = 'sha512';

  /**
   * Hash password using PBKDF2
   */
  static async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    
    const derivedKey = await pbkdf2Async(
      password,
      salt,
      this.ITERATIONS,
      this.KEY_LENGTH,
      this.DIGEST
    );

    return `${salt}:${derivedKey.toString('hex')}`;
  }

  /**
   * Verify password against hash
   */
  static async verify(password: string, hash: string): Promise<boolean> {
    const [salt, key] = hash.split(':');
    
    const derivedKey = await pbkdf2Async(
      password,
      salt,
      this.ITERATIONS,
      this.KEY_LENGTH,
      this.DIGEST
    );

    return key === derivedKey.toString('hex');
  }

  /**
   * Generate secure random token
   */
  static generateToken(): string {
    return randomBytes(32).toString('hex');
  }
}
```

```typescript
// server/auth/session.ts
interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}

export class SessionManager {
  private sessions: Map<string, Session> = new Map();
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  createSession(userId: string): string {
    const sessionId = this.generateSessionId();
    
    this.sessions.set(sessionId, {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + this.SESSION_DURATION),
      createdAt: new Date()
    });

    // Clean up expired sessions
    this.cleanupExpired();

    return sessionId;
  }

  getSession(sessionId: string): Session | null {
    const session = this.sessions.get(sessionId);
    
    if (!session) return null;
    
    if (session.expiresAt < new Date()) {
      this.sessions.delete(sessionId);
      return null;
    }

    return session;
  }

  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  private cleanupExpired(): void {
    const now = new Date();
    
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.expiresAt < now) {
        this.sessions.delete(sessionId);
      }
    }
  }
}
```

### API Routes Implementation

```typescript
// server/routes.ts
import express from 'express';
import { z } from 'zod';
import { db } from './db';
import { products, solutions, services, orders, users, cart } from './db/schema';
import { PasswordManager } from './auth/password';
import { SessionManager } from './auth/session';
import { eq } from 'drizzle-orm';

const router = express.Router();
const sessionManager = new SessionManager();

// Middleware: Authentication
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const sessionId = req.headers.authorization?.replace('Bearer ', '');
  
  if (!sessionId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const session = sessionManager.getSession(sessionId);
  
  if (!session) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }

  (req as any).userId = session.userId;
  next();
};

// Middleware: Validation
const validate = (schema: z.ZodSchema) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: error.errors 
        });
      }
      next(error);
    }
  };
};

// === AUTH ROUTES ===

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().optional()
});

router.post('/api/cart', requireAuth, validate(cartSchema), async (req, res) => {
  try {
    const userId = (req as any).userId;
    const { items } = req.body;
    
    // Check if cart exists
    const [existingCart] = await db.select()
      .from(cart)
      .where(eq(cart.userId, userId));
    
    if (existingCart) {
      // Update existing cart
      await db.update(cart)
        .set({ items, updatedAt: new Date() })
        .where(eq(cart.userId, userId));
    } else {
      // Create new cart
      await db.insert(cart).values({
        id: `cart_${Date.now()}`,
        userId,
        items
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

router.delete('/api/cart', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).userId;
    await db.delete(cart).where(eq(cart.userId, userId));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// === ORDERS ROUTES ===

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })),
  totalAmount: z.number().positive(),
  paymentMethod: z.string(),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string()
  })
});

router.post('/api/orders', requireAuth, validate(orderSchema), async (req, res) => {
  try {
    const userId = (req as any).userId;
    const orderId = `order_${Date.now()}`;
    
    await db.insert(orders).values({
      id: orderId,
      userId,
      ...req.body,
      status: 'pending'
    });

    // Clear cart after order
    await db.delete(cart).where(eq(cart.userId, userId));

    res.json({ success: true, orderId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.get('/api/orders', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).userId;
    
    const userOrders = await db.select()
      .from(orders)
      .where(eq(orders.userId, userId));

    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.get('/api/orders/:id', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).userId;
    
    const [order] = await db.select()
      .from(orders)
      .where(eq(orders.id, req.params.id));
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Ensure user owns this order
    if (order.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

export default router;post('/api/auth/register', validate(registerSchema), async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if user exists
    const existing = await db.select().from(users).where(eq(users.email, email));
    
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await PasswordManager.hash(password);

    // Create user
    const userId = `user_${Date.now()}`;
    await db.insert(users).values({
      id: userId,
      email,
      passwordHash,
      fullName
    });

    // Create session
    const sessionId = sessionManager.createSession(userId);

    res.json({ 
      success: true, 
      sessionId,
      user: { id: userId, email, fullName }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

router.post('/api/auth/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const [user] = await db.select().from(users).where(eq(users.email, email));
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const valid = await PasswordManager.verify(password, user.passwordHash);
    
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create session
    const sessionId = sessionManager.createSession(user.id);

    res.json({ 
      success: true, 
      sessionId,
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/api/auth/logout', requireAuth, (req, res) => {
  const sessionId = req.headers.authorization?.replace('Bearer ', '');
  
  if (sessionId) {
    sessionManager.deleteSession(sessionId);
  }

  res.json({ success: true });
});

// === PRODUCTS ROUTES ===

router.get('/api/products', async (req, res) => {
  try {
    const { category, featured, search } = req.query;
    
    let query = db.select().from(products);
    
    // Apply filters (simplified - use query builder in production)
    const allProducts = await query;
    
    let filtered = allProducts;
    
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (featured === 'true') {
      filtered = filtered.filter(p => p.featured);
    }
    
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/api/products/:id', async (req, res) => {
  try {
    const [product] = await db.select()
      .from(products)
      .where(eq(products.id, req.params.id));
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

const productSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string(),
  imageUrl: z.string().optional(),
  stock: z.number().int().min(0).default(0),
  featured: z.boolean().default(false)
});

router.post('/api/products', requireAuth, validate(productSchema), async (req, res) => {
  try {
    const productId = `prod_${Date.now()}`;
    
    await db.insert(products).values({
      id: productId,
      ...req.body
    });

    res.json({ success: true, id: productId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/api/products/:id', requireAuth, validate(productSchema.partial()), async (req, res) => {
  try {
    await db.update(products)
      .set(req.body)
      .where(eq(products.id, req.params.id));

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/api/products/:id', requireAuth, async (req, res) => {
  try {
    await db.delete(products).where(eq(products.id, req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// === SOLUTIONS ROUTES ===

router.get('/api/solutions', async (req, res) => {
  try {
    const allSolutions = await db.select().from(solutions);
    res.json(allSolutions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch solutions' });
  }
});

router.get('/api/solutions/:id', async (req, res) => {
  try {
    const [solution] = await db.select()
      .from(solutions)
      .where(eq(solutions.id, req.params.id));
    
    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }

    res.json(solution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch solution' });
  }
});

// === SERVICES ROUTES ===

router.get('/api/services', async (req, res) => {
  try {
    const { category, available } = req.query;
    
    let allServices = await db.select().from(services);
    
    if (category) {
      allServices = allServices.filter(s => s.category === category);
    }
    
    if (available === 'true') {
      allServices = allServices.filter(s => s.availability);
    }

    res.json(allServices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// === CART ROUTES ===

router.get('/api/cart', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).userId;
    
    const [userCart] = await db.select()
      .from(cart)
      .where(eq(cart.userId, userId));
    
    if (!userCart) {
      return res.json({ items: [] });
    }

    res.json(userCart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

const cartSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  }))
});

router.