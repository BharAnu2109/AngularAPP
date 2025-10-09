# Contributing to Trading Application

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Keep discussions professional

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature/fix
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## Development Setup

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

Quick setup:
```bash
git clone https://github.com/YOUR_USERNAME/AngularAPP.git
cd AngularAPP
cd backend && npm install && cd ..
cd angular-frontend && npm install && cd ..
cd react-frontend && npm install && cd ..
cd vue-frontend && npm install && cd ..
```

## Branch Naming

Use descriptive branch names:
- `feature/add-limit-orders` - New features
- `fix/portfolio-calculation` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/api-structure` - Code refactoring

## Commit Messages

Write clear, descriptive commit messages:

Good:
```
Add limit order functionality to backend

- Implement limit order validation
- Add price threshold checks
- Update order status handling
```

Bad:
```
Updated stuff
```

## Code Style

### Backend (Node.js)
- Use ES6+ features
- 2 spaces for indentation
- Semicolons required
- Use descriptive variable names
- Add comments for complex logic

```javascript
// Good
const calculatePortfolioValue = (positions, prices) => {
  return positions.reduce((total, pos) => {
    return total + (pos.quantity * prices[pos.symbol]);
  }, 0);
};

// Bad
const calc = (p, pr) => p.reduce((t, x) => t + x.q * pr[x.s], 0);
```

### Frontend (TypeScript)
- Use TypeScript strict mode
- Define interfaces for all data types
- Use meaningful component names
- Follow framework-specific conventions

```typescript
// Good
interface Stock {
  symbol: string;
  name: string;
  price: number;
}

const getStock = async (symbol: string): Promise<Stock> => {
  // Implementation
};

// Bad
const get = async (s: any): Promise<any> => {
  // Implementation
};
```

## Testing

### Backend Tests

Run backend tests:
```bash
cd backend
npm test
```

Add tests for new features:
```javascript
describe('New Feature', () => {
  it('should do something', async () => {
    const result = await yourFunction();
    expect(result).toBe(expectedValue);
  });
});
```

### Frontend Tests

Run frontend tests:
```bash
# Angular
cd angular-frontend
npm test

# React
cd react-frontend
npm test

# Vue
cd vue-frontend
npm test
```

## Documentation

- Update README.md for major features
- Add JSDoc comments for public functions
- Update API documentation
- Include examples in comments

Example:
```javascript
/**
 * Places a new order in the trading system
 * @param {Order} order - The order to place
 * @returns {Promise<Order>} The executed order with status
 * @throws {Error} If order validation fails
 * 
 * @example
 * const order = {
 *   symbol: 'AAPL',
 *   quantity: 10,
 *   side: 'buy',
 *   orderType: 'market'
 * };
 * const result = await placeOrder(order);
 */
```

## Pull Request Process

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Create pull request**
   - Use a descriptive title
   - Explain what changes you made and why
   - Reference related issues
   - Include screenshots for UI changes

4. **PR Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Unit tests pass
   - [ ] Manual testing completed
   - [ ] New tests added

   ## Screenshots (if applicable)
   [Add screenshots here]

   ## Related Issues
   Closes #123
   ```

## Areas for Contribution

### High Priority
- [ ] Add database integration (PostgreSQL)
- [ ] Implement user authentication
- [ ] Add comprehensive test coverage
- [ ] Improve error handling
- [ ] Add rate limiting

### Features
- [ ] Limit orders and stop-loss
- [ ] Trading algorithms
- [ ] Technical indicators
- [ ] Market data integration
- [ ] Historical data analysis

### Frontend Improvements
- [ ] Dark mode
- [ ] Mobile responsive design
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Animation and transitions

### Backend Improvements
- [ ] WebSocket reconnection logic
- [ ] Data persistence layer
- [ ] Caching strategy
- [ ] API versioning
- [ ] GraphQL API

### DevOps
- [ ] Terraform configurations
- [ ] Kubernetes Helm charts
- [ ] CI/CD improvements
- [ ] Monitoring dashboards
- [ ] Load testing

### Documentation
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Video tutorials
- [ ] Architecture diagrams
- [ ] Troubleshooting guide
- [ ] Performance tuning guide

## Issue Reporting

When reporting issues, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node version, browser
6. **Screenshots**: If applicable
7. **Logs**: Relevant error messages

Example:
```markdown
### Description
Portfolio value calculation is incorrect after selling shares

### Steps to Reproduce
1. Buy 10 shares of AAPL at $175
2. Wait for price to change
3. Sell 5 shares
4. Check portfolio value

### Expected Behavior
Portfolio value should reflect 5 remaining shares at current price plus cash

### Actual Behavior
Portfolio shows incorrect value, seems to use old price

### Environment
- OS: Ubuntu 22.04
- Node: 18.16.0
- Browser: Chrome 114

### Logs
```
[timestamp] Portfolio calculation error: ...
```
```

## Code Review Guidelines

When reviewing PRs:
- Be constructive and respectful
- Test the changes locally
- Check for breaking changes
- Verify documentation updates
- Suggest improvements, don't demand
- Approve when ready

## Security

- Never commit secrets or API keys
- Use environment variables
- Follow OWASP guidelines
- Report security issues privately
- Use dependency scanning

## Performance

- Profile before optimizing
- Use appropriate data structures
- Minimize API calls
- Implement caching
- Optimize bundle sizes

## Accessibility

- Use semantic HTML
- Include ARIA labels
- Test with screen readers
- Ensure keyboard navigation
- Maintain color contrast

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

- Check existing issues and PRs
- Read the documentation
- Ask in discussions
- Contact maintainers

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in commit history

Thank you for contributing! 🎉
