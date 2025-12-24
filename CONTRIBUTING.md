# Contributing to generic-form-create

Thank you for your interest in contributing to `generic-form-create`! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/generic-form-create.git
   cd generic-form-create
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Run tests:
   ```bash
   npm test
   ```

## Development Workflow

### Making Changes

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the code style guidelines

3. Add or update tests for your changes

4. Ensure all tests pass:
   ```bash
   npm test
   ```

5. Build the project to verify TypeScript compilation:
   ```bash
   npm run build
   ```

6. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add new field type helper"
   ```

### Commit Message Format

Use conventional commits format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Test additions or changes
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

## Code Style

- Use TypeScript for all code
- Follow the existing code style (2-space indentation)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Testing

- Write tests for all new functionality
- Ensure existing tests pass
- Aim for high test coverage
- Use descriptive test names

Example test:
```typescript
test('addField throws error for duplicate field with different content', () => {
  const field1 = createTextField('username', 'Username', { minLength: 3 });
  const field2 = createTextField('username', 'Username', { minLength: 5 });

  form = addField(form, field1);
  expect(() => addField(form, field2)).toThrow(DuplicateFieldError);
});
```

## Documentation

- Update README.md if you add new features
- Add examples for new functionality
- Keep documentation clear and concise
- Include code examples where appropriate

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update tests and ensure they pass
3. Update documentation
4. Push to your fork and submit a pull request
5. Wait for review and address any feedback

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Provide a clear description of the changes
- Reference any related issues
- Ensure CI passes
- Be responsive to feedback

## Issue Reporting

When reporting issues:

1. Check existing issues first
2. Use the issue template if available
3. Provide a clear description
4. Include steps to reproduce
5. Specify your environment (OS, Node version, etc.)
6. Include error messages and stack traces

## Feature Requests

Feature requests are welcome! Please:

1. Check if the feature already exists or is planned
2. Describe the use case clearly
3. Explain why the feature would be useful
4. Consider providing a pull request

## Compliance with GFF Specification

All changes must be compliant with the [Generic Form Format Specification](https://github.com/wearehere-labs/generic-form-format). When adding new features:

1. Reference the relevant section of the spec
2. Ensure type definitions match the spec
3. Add examples that demonstrate spec compliance
4. Update tests to validate spec compliance

## Questions?

If you have questions about contributing, feel free to:
- Open a discussion on GitHub
- Comment on relevant issues
- Reach out to the maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
