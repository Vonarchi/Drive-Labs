# Testing Guide

This project includes comprehensive testing setup with unit tests, E2E tests, and performance testing.

## Test Types

### 1. Unit Tests (Vitest + RTL)
- **Framework**: Vitest with React Testing Library
- **Location**: `tests/unit/`
- **Command**: `pnpm test`
- **Coverage**: ≥80% lines required

### 2. E2E Tests (Playwright)
- **Framework**: Playwright
- **Location**: `tests/e2e/`
- **Command**: `pnpm test:e2e`
- **Browser**: Chromium (configurable)

### 3. Performance Tests (Lighthouse CI)
- **Framework**: Lighthouse CI
- **Command**: `pnpm test:lh`
- **Thresholds**: ≥90% on Performance, SEO, Best Practices

## Quick Start

```bash
# Install dependencies
pnpm install

# Run unit tests
pnpm test

# Run E2E tests (requires app running)
pnpm start &
pnpm test:e2e

# Run performance tests
pnpm test:lh

# Run all tests
pnpm test && pnpm test:e2e && pnpm test:lh
```

## Test Configuration

### Vitest Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/unit/setup.ts'],
    coverage: { 
      reporter: ['text', 'json', 'lcov'], 
      lines: 0.8 
    }
  },
  resolve: { alias: { '@': '/src' } }
});
```

### Playwright Configuration
```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
```

### Lighthouse CI Configuration
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/"],
      "numberOfRuns": 1,
      "startServerCommand": "pnpm start:preview",
      "startServerReadyPattern": "listening on"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.90 }],
        "categories:seo": ["error", { "minScore": 0.90 }],
        "categories:best-practices": ["error", { "minScore": 0.90 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

## Writing Tests

### Unit Tests
```typescript
// tests/unit/button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders label & is focusable', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: /save/i })).toBeVisible();
  });
});
```

### E2E Tests
```typescript
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('renders title and primary CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Drive/i);
    await expect(page.getByRole('button', { name: /new project/i })).toBeVisible();
  });
});
```

## Environment Variables

### E2E Testing
```bash
# Optional: Override base URL
E2E_BASE_URL=http://localhost:3000

# Required for auth tests
E2E_EMAIL=test@example.com
E2E_PASSWORD=testpassword
```

## CI/CD Integration

### GitHub Actions
The CI pipeline runs three test suites:

1. **Unit Tests**: Fast feedback on component behavior
2. **E2E Tests**: Full user journey validation
3. **Lighthouse**: Performance and accessibility checks

### Test Artifacts
- **Playwright traces**: Uploaded on test failures
- **Coverage reports**: Generated for unit tests
- **Lighthouse reports**: Performance metrics

## Best Practices

### Unit Testing
- Test component behavior, not implementation
- Use semantic queries (`getByRole`, `getByLabelText`)
- Test accessibility features
- Mock external dependencies

### E2E Testing
- Test critical user journeys
- Use data-testid sparingly (prefer semantic queries)
- Test across different screen sizes
- Include error scenarios

### Performance Testing
- Test on production-like builds
- Monitor Core Web Vitals
- Set realistic performance budgets
- Test on different network conditions

## Debugging Tests

### Unit Tests
```bash
# Run with UI
pnpm test:ui

# Run specific test
pnpm test button.test.tsx

# Run with coverage
pnpm test --coverage
```

### E2E Tests
```bash
# Run with headed browser
npx playwright test --headed

# Run specific test
npx playwright test home.spec.ts

# Debug mode
npx playwright test --debug
```

### Lighthouse Tests
```bash
# Run locally
pnpm test:lh

# View detailed report
npx lhci autorun --upload.target=temporary-public-storage
```

## Troubleshooting

### Common Issues

1. **E2E tests failing**: Ensure app is running on correct port
2. **Unit tests failing**: Check test environment setup
3. **Lighthouse failing**: Verify production build is optimized
4. **Coverage below threshold**: Add more test cases

### Debug Commands
```bash
# Check test environment
pnpm test --reporter=verbose

# Debug E2E with browser
npx playwright test --headed --debug

# Check Lighthouse configuration
npx lhci autorun --dry-run
```

## Test Data

### Mock Data
- Use consistent test data across tests
- Avoid hardcoded values
- Use factories for complex objects

### Test Database
- Use separate test database
- Clean up after each test
- Use transactions for isolation

## Continuous Integration

### Pre-commit Hooks
```bash
# Run tests before commit
pnpm test
pnpm lint
```

### Branch Protection
- Require all tests to pass
- Require coverage threshold
- Require performance benchmarks

## Performance Monitoring

### Metrics Tracked
- **Performance**: LCP, FID, CLS
- **SEO**: Meta tags, structured data
- **Best Practices**: Security, accessibility

### Thresholds
- Performance: ≥90%
- SEO: ≥90%
- Best Practices: ≥90%
- Unit Test Coverage: ≥80%

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
