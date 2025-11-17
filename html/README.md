# Training Design Platform

A training management system with admin and student interfaces built using HTML, CSS (Tailwind), and JavaScript.

## Tailwind CSS Setup

This project uses Tailwind CSS with a local build process instead of the CDN for production use.

### Prerequisites

- Node.js and npm installed

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the CSS:
   ```bash
   # For production (minified)
   npm run build:prod
   
   # For development (with watch mode)
   npm run build
   ```

### Project Structure

- `src/input.css` - Tailwind CSS directives
- `dist/output.css` - Compiled CSS file (generated)
- `tailwind.config.js` - Tailwind configuration
- `Admin/` - Admin interface HTML files
- `Student/` - Student interface HTML files

### Adding New Tailwind Classes

If you add new Tailwind classes to your HTML files, you'll need to rebuild the CSS:

```bash
npm run build:prod
```

### Why Not CDN?

The CDN version of Tailwind CSS:
- Is not recommended for production
- Can cause layout shifts
- Has slower loading times
- Doesn't allow customization

The local build process:
- Generates only the CSS classes you actually use
- Provides better performance
- Allows for customization
- Is production-ready
