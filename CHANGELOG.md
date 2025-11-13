# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- generado por git-cliff -->

## [Unreleased]

### Added
- **Modern UI Design**: Complete interface redesign with custom typography
  - Custom fonts: Space Grotesk (display), Inter (sans), JetBrains Mono (code)
  - Custom color palette: primary blues (#0ea5e9), accent purples (#d946ef)
  - Soft shadows system (shadow-soft, shadow-soft-lg, inner-soft)
  - Microanimations: fade-in, slide-up, scale-in with staggered delays
  - Glass-effect and backdrop-blur for modern depth
  - Text-gradient utility for eye-catching headings
  - Card component with hover elevation and transitions
  - Tailwind Typography plugin for better text rendering

### Changed
- **Sidebar**: Improved with gradient icons, better spacing, and hover states
- **Navigation tabs**: Enhanced with smooth transitions and scale effects
- **Home page**: Redesigned with larger typography and better visual hierarchy
- **Component headers**: Updated to use display font with tracking-tight
- **Interactive elements**: Added hover effects and microanimations
- **Grid layouts**: Improved with better gaps and responsive design
- **Background**: Gradient from gray-50 via blue-50 to purple-50

### Refactor
- **repository cleanup**: Remove unused components and utilities to optimize repository (1502bf1)
  - Removed Dashboard.tsx (unused legacy component)
  - Removed FileSystemComparison.tsx (empty placeholder)
  - Removed src/types directory (unused TypeScript interfaces)
  - Removed src/utils directory (chartConfig and fileSystemHelpers not used)
  - Updated README.md with accurate project structure

### Added (Previous)
- **ForensicsPanel**: Complete implementation with forensic analysis theory
  - Theory tab: File deletion fundamentals and mathematical models
  - Lifecycle tab: Visual representation of file states
  - Recovery tab: Techniques comparison and practical commands
  - Timeline tab: Timestamp analysis and anomaly detection

### Changed (Previous)
- Dashboard layout: Transformed to sidebar navigation pattern
- Updated README.md with accurate module descriptions

