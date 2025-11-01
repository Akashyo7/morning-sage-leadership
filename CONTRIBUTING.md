# 🤝 Contributing to Morning Sage Leadership AI

Thank you for your interest in contributing to the Morning Sage Leadership AI Agent! This guide will help you get started with development and contributions.

## 🚀 Quick Start for Contributors

### Prerequisites

- Node.js 18+ and npm
- Git
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/morning-sage-leadership.git
   cd morning-sage-leadership
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Test Your Changes**
   ```bash
   npm test
   npm run lint
   ```

## 🏗️ Project Structure

```
src/
├── index.ts              # Main agent configuration
├── tools/                # AI tools for the agent
│   ├── index.ts         # Tool exports
│   ├── motivational-quotes.ts
│   ├── music-selection.ts
│   └── weather.ts
├── workflows/            # Multi-step workflows
│   ├── index.ts         # Workflow exports
│   ├── morning-motivation.ts
│   └── expense-approval.ts (example)
└── types/               # TypeScript type definitions
```

## 🛠️ Adding New Features

### Creating a New Tool

1. **Create Tool File**
   ```typescript
   // src/tools/my-new-tool.ts
   import { createTool } from '@voltagent/core';
   import { z } from 'zod';

   export const myNewTool = createTool({
     name: 'myNewTool',
     description: 'Description of what this tool does',
     parameters: z.object({
       input: z.string().describe('Input parameter description'),
       optional: z.boolean().optional().describe('Optional parameter'),
     }),
     execute: async ({ input, optional }) => {
       // Tool implementation
       return {
         result: 'Tool output',
         metadata: { /* additional data */ }
       };
     },
   });
   ```

2. **Export Tool**
   ```typescript
   // src/tools/index.ts
   export { myNewTool } from './my-new-tool';
   ```

3. **Add to Agent**
   ```typescript
   // src/index.ts
   import { myNewTool } from './tools';

   const morningSageAgent = new Agent({
     // ... other config
     tools: [motivationalQuotesTool, musicSelectionTool, myNewTool],
   });
   ```

### Creating a New Workflow

1. **Create Workflow File**
   ```typescript
   // src/workflows/my-workflow.ts
   import { createWorkflow } from '@voltagent/core';
   import { z } from 'zod';

   export const myWorkflow = createWorkflow({
     name: 'myWorkflow',
     description: 'Workflow description',
     inputSchema: z.object({
       param: z.string(),
     }),
     steps: [
       {
         name: 'step1',
         description: 'First step',
         execute: async ({ input, context }) => {
           // Step implementation
           return { output: 'step result' };
         },
       },
       // More steps...
     ],
   });
   ```

2. **Export and Add to Agent** (similar to tools)

## 🎯 Contribution Areas

### High-Priority Areas

1. **New Philosophical Sources**
   - Add quotes from other wisdom traditions
   - Implement dynamic quote generation
   - Add quote categorization by themes

2. **Enhanced Music Selection**
   - Integration with Spotify/Apple Music APIs
   - Binaural beats and focus music
   - Mood-based tempo adjustment

3. **Team Features**
   - Team mood tracking
   - Collaborative goal setting
   - Team performance analytics

4. **Personalization**
   - User preference learning
   - Historical session analysis
   - Adaptive recommendations

### Medium-Priority Areas

1. **Additional Tools**
   - Calendar integration
   - Task management
   - Habit tracking
   - Meditation timers

2. **Workflow Enhancements**
   - Conditional workflow paths
   - Scheduled workflows
   - Workflow templates

3. **UI/UX Improvements**
   - Web interface
   - Mobile app
   - Voice interactions

### Documentation & Testing

1. **Documentation**
   - API documentation
   - Tutorial videos
   - Use case examples

2. **Testing**
   - Unit tests for tools
   - Integration tests for workflows
   - Performance benchmarks

## 📝 Code Style Guidelines

### TypeScript Standards

- Use strict TypeScript configuration
- Prefer explicit types over `any`
- Use Zod schemas for validation
- Follow functional programming patterns

### Code Organization

- One tool/workflow per file
- Clear, descriptive function names
- Comprehensive JSDoc comments
- Consistent error handling

### Example Code Style

```typescript
/**
 * Generates personalized motivational content based on user preferences
 * @param philosophy - The philosophical tradition to draw from
 * @param mood - The desired emotional outcome
 * @param context - Optional team or personal context
 * @returns Formatted motivational content with source attribution
 */
export const generateMotivation = async ({
  philosophy,
  mood,
  context,
}: MotivationParams): Promise<MotivationResult> => {
  // Implementation with proper error handling
  try {
    const quotes = await getQuotesByPhilosophy(philosophy);
    const selectedQuote = selectQuoteByMood(quotes, mood);
    
    return {
      quote: selectedQuote.text,
      author: selectedQuote.author,
      context: contextualizeQuote(selectedQuote, context),
      source: selectedQuote.source,
    };
  } catch (error) {
    throw new Error(`Failed to generate motivation: ${error.message}`);
  }
};
```

## 🧪 Testing Guidelines

### Unit Tests

```typescript
// tests/tools/motivational-quotes.test.ts
import { describe, it, expect } from 'vitest';
import { motivationalQuotesTool } from '../src/tools/motivational-quotes';

describe('Motivational Quotes Tool', () => {
  it('should generate stoic quotes for leadership mood', async () => {
    const result = await motivationalQuotesTool.execute({
      philosophy: 'stoicism',
      mood: 'leadership',
    });
    
    expect(result.quote).toBeDefined();
    expect(result.author).toBeDefined();
    expect(result.philosophy).toBe('stoicism');
  });
});
```

### Integration Tests

```typescript
// tests/workflows/morning-motivation.test.ts
import { describe, it, expect } from 'vitest';
import { morningMotivationWorkflow } from '../src/workflows/morning-motivation';

describe('Morning Motivation Workflow', () => {
  it('should complete full workflow with valid inputs', async () => {
    const result = await morningMotivationWorkflow.execute({
      teamSize: 5,
      workType: 'creative',
      desiredMood: 'energetic',
      timeOfDay: 'morning',
    });
    
    expect(result.status).toBe('completed');
    expect(result.wisdomParams).toBeDefined();
    expect(result.musicParams).toBeDefined();
  });
});
```

## 🔄 Pull Request Process

### Before Submitting

1. **Code Quality**
   ```bash
   npm run lint        # Fix linting issues
   npm run type-check  # Ensure TypeScript compliance
   npm test           # All tests pass
   ```

2. **Documentation**
   - Update README if adding features
   - Add JSDoc comments to new functions
   - Update CHANGELOG.md

3. **Testing**
   - Add tests for new functionality
   - Ensure existing tests still pass
   - Test manually with `npm run dev`

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 🐛 Bug Reports

### Bug Report Template

```markdown
**Describe the Bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen

**Environment**
- OS: [e.g. macOS, Ubuntu]
- Node.js version: [e.g. 18.17.0]
- Agent version: [e.g. 1.0.0]

**Additional Context**
Any other context about the problem
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Alternative solutions or features considered

**Additional context**
Any other context or screenshots
```

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special mentions for innovative features

## 📞 Getting Help

- **Discord**: Join our community server
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Email**: maintainers@morning-sage.ai

## 📜 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

Thank you for contributing to Morning Sage Leadership AI! 🌅✨