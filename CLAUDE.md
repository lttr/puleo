# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Puleo CSS is a mid-level CSS library that provides a starting point for custom designs. It builds on Open Props and follows ITCSS principles for modular CSS architecture.

## Development Commands

### Package Management
- Use `pnpm` for all package operations (project uses pnpm v9.1.4)
- `pnpm install` - Install dependencies

### Build Commands
- `pnpm build` - Generate files and build all CSS outputs
- `pnpm generate` - Generate CSS files from JavaScript configuration (runs before build)
- `pnpm clean` - Remove all output files

### Development
- `pnpm dev` - Start development server with file watching
- `pnpm watch` - Watch files and rebuild on changes
- `pnpm start` - Start browser-sync server for testing

### Code Quality
- `pnpm lint` - Run ESLint on JavaScript files
- `pnpm lint:styles` - Run Stylelint on CSS files  
- `pnpm format` - Format code with Prettier

### Release
- `pnpm release` - Create a new release (runs lint, build, changelog, and publish)

## Architecture

### Directory Structure
- `css/` - Source CSS files organized by ITCSS layers
  - `generated/` - Auto-generated CSS (props, scales, objects)
  - Individual CSS modules (normalize.css, elements.css, etc.)
- `src/` - JavaScript build scripts for generating CSS
- `output/` - Built CSS files (both .post.css and .min.css versions)
- `examples/` - Example usage and CSS feature demonstrations
- `public/` - Demo/documentation site

### CSS Organization (ITCSS)
1. **Settings** - Design tokens and CSS custom properties
2. **Tools** - Mixins and functions (via PostCSS)
3. **Generic** - CSS reset/normalization
4. **Elements** - Improved HTML element styling
5. **Objects** - Layout patterns and utility classes
6. **Components** - Specific UI components (user-defined)
7. **Utilities** - Helper classes

### Key Features
- Modern CSS with PostCSS processing (nesting, custom properties, color functions)
- Fluid typography and spacing scales based on modular scale
- Dark theme support via `.theme-dark` class
- Source maps for debugging
- Both minified and unminified outputs

### Build System
The build process uses PostCSS with these key plugins:
- postcss-import - Resolving @import statements
- postcss-preset-env - Modern CSS features
- postcss-dark-theme-class - Dark theme transformation
- cssnano (in nano config) - Minification

Files are generated in this order:
1. JavaScript build scripts generate CSS files
2. PostCSS processes all CSS files
3. Both regular and minified versions are output

### Testing CSS Changes
When modifying CSS:
1. Run `pnpm dev` to start the development server
2. Open `http://localhost:3000` to view the demo page
3. Test changes in both light and dark themes
4. Check the prose demo at `/prose.html` for typography