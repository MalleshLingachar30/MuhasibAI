# Contributing to MuhasibAI

Thank you for your interest in contributing to MuhasibAI! This document provides guidelines and instructions for contributing.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment. All contributors are expected to:

- Be respectful and considerate
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other contributors

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or personal attacks
- Publishing others' private information
- Other conduct deemed unprofessional

---

## Getting Started

### Prerequisites

- Node.js 18+
- Git
- A code editor (VS Code recommended)
- Basic knowledge of HTML/CSS/JavaScript

### Fork and Clone

1. **Fork the repository**
   - Click "Fork" on GitHub
   - This creates your own copy

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/MuhasibAI.git
   cd MuhasibAI
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/muhasib/MuhasibAI.git
   ```

---

## Development Setup

### Install Dependencies

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your development credentials.

### Run Locally

**Option 1: Vercel CLI (recommended)**
```bash
npm install -g vercel
vercel dev
```

**Option 2: Simple HTTP Server**
```bash
npx serve .
```

Note: API endpoints won't work with simple HTTP server.

### Access the App

Open http://localhost:3000 in your browser.

---

## Project Structure

```
MuhasibAI/
├── api/                    # Serverless functions
│   ├── ocr.js             # OCR processing endpoint
│   └── waitlist.js        # Waitlist registration
├── docs/                   # Documentation
├── sample-invoices/        # Test invoices
├── index.html             # Landing page
├── demo-*.html            # Demo pages
├── package.json           # Dependencies
└── vercel.json            # Deployment config
```

---

## Coding Standards

### HTML

```html
<!-- Use semantic HTML5 elements -->
<section class="feature-section">
  <header>
    <h2>Title</h2>
  </header>
  <article>Content</article>
</section>

<!-- Always include bilingual content -->
<span class="ar">عربي</span>
<span class="en">English</span>

<!-- Use data attributes for JS hooks -->
<button data-action="submit">Submit</button>
```

### CSS

```css
/* Use CSS custom properties for theming */
:root {
  --color-primary: #34d399;
  --color-background: #020617;
}

/* Use BEM-like naming */
.card { }
.card-header { }
.card-header-title { }

/* Mobile-first responsive design */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

### JavaScript

```javascript
// Use modern ES6+ syntax
const processData = async (data) => {
  try {
    const result = await fetch('/api/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return result.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Use descriptive variable names
const isArabic = document.documentElement.lang === 'ar';
const formSubmitButton = document.querySelector('[data-action="submit"]');

// Comment complex logic
// Calculate VAT based on Saudi Arabia's 15% rate
const vatAmount = subtotal * 0.15;
```

### API Functions

```javascript
// api/example.js

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validate method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate input
  const { field } = req.body;
  if (!field) {
    return res.status(400).json({ error: 'Field is required' });
  }

  try {
    // Business logic
    const result = await processField(field);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

---

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-bank-reconciliation`
- `fix/arabic-text-alignment`
- `docs/update-api-documentation`
- `refactor/simplify-form-validation`

### Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```
feat(ocr): add support for PDF invoices
fix(i18n): correct Arabic alignment in reports
docs(api): add examples for waitlist endpoint
```

### Creating a Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

---

## Pull Request Process

### Before Submitting

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes**
   - Verify in both Arabic and English
   - Test on mobile and desktop
   - Check all affected pages

3. **Update documentation**
   - Add JSDoc comments for new functions
   - Update README if needed
   - Add CHANGELOG entry

### Submitting PR

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to GitHub
   - Click "Compare & pull request"
   - Fill out the PR template

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing Done
- [ ] Tested in Arabic
- [ ] Tested in English
- [ ] Tested on mobile
- [ ] Tested API endpoints

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed my code
- [ ] Added necessary documentation
- [ ] No new warnings introduced
```

### Review Process

1. **Automated checks** run on PR
2. **Code review** by maintainers
3. **Requested changes** (if any)
4. **Approval** from maintainer
5. **Merge** to main branch

---

## Testing

### Manual Testing Checklist

**Landing Page:**
- [ ] All sections load correctly
- [ ] Language toggle works
- [ ] Waitlist form submits
- [ ] Links work correctly

**Demo Pages:**
- [ ] Upload functionality works
- [ ] Animations play smoothly
- [ ] Data displays correctly
- [ ] PDF download works

**API Endpoints:**
```bash
# Test waitlist
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"phone":"0512345678","email":"test@test.com","business":"restaurant"}'

# Test OCR (with test image)
curl -X POST http://localhost:3000/api/ocr \
  -H "Content-Type: application/json" \
  -d '{"image":"base64...","filename":"test.jpg"}'
```

### Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Documentation

### Code Documentation

```javascript
/**
 * Process invoice image using OCR
 * @param {string} imageData - Base64 encoded image
 * @param {string} filename - Original filename
 * @returns {Promise<Object>} Extracted invoice data
 */
async function processInvoice(imageData, filename) {
  // ...
}
```

### README Updates

When adding features:
1. Update feature list
2. Add usage examples
3. Document any new environment variables

### API Documentation

Update `docs/API.md` for:
- New endpoints
- Changed request/response formats
- New parameters

---

## Community

### Getting Help

- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: General questions and ideas
- **Email**: contributors@muhasib.ai

### Recognition

Contributors are recognized in:
- CHANGELOG.md
- GitHub contributors page
- Annual contributor appreciation

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to MuhasibAI! 🙏

<p align="center">
  <strong>شكراً لمساهمتك في مُحاسِب!</strong>
</p>
