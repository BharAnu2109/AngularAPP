# Shared Resources

This directory contains shared resources, types, and utilities that can be used across all applications.

## Contents

- **Types**: TypeScript interfaces and types shared between frontend and backend
- **Constants**: Configuration constants and enums
- **Utils**: Utility functions used across projects

## Usage

These resources can be imported into any of the applications:

```typescript
// Example: Import shared types
import { Stock, Order, Portfolio } from '../shared/types';
```

## Future Extensions

- Shared validation schemas
- Common API response types
- Utility functions for data transformation
- Shared configuration files
