# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<<<<<<< HEAD
## [Unreleased]

### Added
- **Modern UI Design** ([c9cdcb9](https://github.com/Luisen1/os-filesystem-lab/commit/c9cdcb9)): Complete interface redesign with custom typography
  - Custom fonts: Space Grotesk (display), Inter (sans), JetBrains Mono (code)
  - Custom color palette: primary blues (#0ea5e9), accent purples (#d946ef)
  - Soft shadows system (shadow-soft, shadow-soft-lg, inner-soft)
  - Microanimations: fade-in, slide-up, scale-in with staggered delays
  - Glass-effect and backdrop-blur for modern depth
  - Text-gradient utility for eye-catching headings
  - Card component with hover elevation and transitions
  - Tailwind Typography plugin for better text rendering

### Changed
- **Sidebar** ([c9cdcb9](https://github.com/Luisen1/os-filesystem-lab/commit/c9cdcb9)): Improved with gradient icons, better spacing, and hover states
- **Navigation tabs** ([c9cdcb9](https://github.com/Luisen1/os-filesystem-lab/commit/c9cdcb9)): Enhanced with smooth transitions and scale effects
- **Home page** ([c9cdcb9](https://github.com/Luisen1/os-filesystem-lab/commit/c9cdcb9)): Redesigned with larger typography and better visual hierarchy
- **Component headers** ([c9cdcb9](https://github.com/Luisen1/os-filesystem-lab/commit/c9cdcb9)): Updated to use display font with tracking-tight
- **Interactive elements** ([c9cdcb9](https://github.com/Luisen1/os-filesystem-lab/commit/c9cdcb9)): Added hover effects and microanimations
- **Grid layouts** ([c9cdcb9](https://github.com/Luisen1/os-filesystem-lab/commit/c9cdcb9)): Improved with better gaps and responsive design
- **Background** ([c9cdcb9](https://github.com/Luisen1/os-filesystem-lab/commit/c9cdcb9)): Gradient from gray-50 via blue-50 to purple-50

### Refactor
- **Repository cleanup** ([1502bf1](https://github.com/Luisen1/os-filesystem-lab/commit/1502bf1)): Remove unused components and utilities to optimize repository
  - Removed Dashboard.tsx, FileSystemComparison.tsx, src/types, src/utils
  - Updated README.md with accurate project structure

### Documentation
- **CHANGELOG updates** ([7c863e4](https://github.com/Luisen1/os-filesystem-lab/commit/7c863e4)): Modern UI design implementation
- **CHANGELOG updates** ([688d6db](https://github.com/Luisen1/os-filesystem-lab/commit/688d6db)): Repository cleanup and ForensicsPanel implementation

## [0.3.0] - 2024

### Added
- **ForensicsPanel Component** ([6c93ceb](https://github.com/Luisen1/os-filesystem-lab/commit/6c93ceb)): Complete implementation with forensic analysis
  - Theory tab: File deletion fundamentals and mathematical models
  - Lifecycle tab: Visual representation of file states
  - Recovery tab: Techniques comparison and practical commands
  - Timeline tab: Timestamp analysis and anomaly detection
- **State-based navigation** ([191e160](https://github.com/Luisen1/os-filesystem-lab/commit/191e160)): Implement state-based navigation menu
- **Journaling Analysis** ([441b865](https://github.com/Luisen1/os-filesystem-lab/commit/441b865)): Complete journaling analysis component

### Changed
- **Dashboard layout** ([c3c7823](https://github.com/Luisen1/os-filesystem-lab/commit/c3c7823)): Transformed to sidebar navigation pattern
- **ReadOnlyAnalysis** ([9348ca5](https://github.com/Luisen1/os-filesystem-lab/commit/9348ca5)): Improved with tab navigation and data visualization

### Refactor
- **Professional appearance** ([91accdb](https://github.com/Luisen1/os-filesystem-lab/commit/91accdb)): Remove emojis and improve professional appearance
- **Changelog config** ([1890378](https://github.com/Luisen1/os-filesystem-lab/commit/1890378)): Remove emojis from changelog configuration

### Fixed
- **Root div ID** ([22ac1e4](https://github.com/Luisen1/os-filesystem-lab/commit/22ac1e4)): Correct root div ID in index.html
- **Workflow permissions** ([ce421a7](https://github.com/Luisen1/os-filesystem-lab/commit/ce421a7)): Adjust pull-request permissions in changelog workflow
- **Git-cliff version** ([1848ffc](https://github.com/Luisen1/os-filesystem-lab/commit/1848ffc)): Correct git-cliff version command
- **Changelog workflow** ([41d8fe1](https://github.com/Luisen1/os-filesystem-lab/commit/41d8fe1)): Improve changelog generation workflow
- **Breaking commits** ([80d1e8a](https://github.com/Luisen1/os-filesystem-lab/commit/80d1e8a)): Remove duplicate protect_breaking_commits key
- **GitHub Actions** ([7112456](https://github.com/Luisen1/os-filesystem-lab/commit/7112456)): Replace git-cliff-action with manual installation
- **Actions versions** ([9e52997](https://github.com/Luisen1/os-filesystem-lab/commit/9e52997)): Use stable versions for GitHub Actions

### Documentation
- **Complete history** ([9d83d60](https://github.com/Luisen1/os-filesystem-lab/commit/9d83d60)): Manually generate complete CHANGELOG
- **Initial CHANGELOG** ([4c716db](https://github.com/Luisen1/os-filesystem-lab/commit/4c716db)): Add initial CHANGELOG.md
- **Project documentation** ([39f2645](https://github.com/Luisen1/os-filesystem-lab/commit/39f2645)): Add project documentation
- **Updates** ([9b41887](https://github.com/Luisen1/os-filesystem-lab/commit/9b41887), [f179a3a](https://github.com/Luisen1/os-filesystem-lab/commit/f179a3a), [64e6347](https://github.com/Luisen1/os-filesystem-lab/commit/64e6347), [043cb2a](https://github.com/Luisen1/os-filesystem-lab/commit/043cb2a), [cf999d2](https://github.com/Luisen1/os-filesystem-lab/commit/cf999d2), [597d50c](https://github.com/Luisen1/os-filesystem-lab/commit/597d50c)): Various CHANGELOG updates

## [0.2.0] - 2024

### Added
- **CI/CD** ([6f6ec24](https://github.com/Luisen1/os-filesystem-lab/commit/6f6ec24)): GitHub Actions workflow for automatic changelog
- **Git-cliff config** ([0bbbe7d](https://github.com/Luisen1/os-filesystem-lab/commit/0bbbe7d)): Configuration for changelog generation

### Refactor
- **Project structure** ([8e38c12](https://github.com/Luisen1/os-filesystem-lab/commit/8e38c12)): Move files to root directory

### Added
- **Gitignore** ([4a3313b](https://github.com/Luisen1/os-filesystem-lab/commit/4a3313b)): Add gitignore file

## [0.1.0] - 2024

### Added
- **Core Components**:
  - **Main Dashboard** ([d957a38](https://github.com/Luisen1/os-filesystem-lab/commit/d957a38)): Implement main dashboard component
  - **Filesystem Comparison** ([963d2dc](https://github.com/Luisen1/os-filesystem-lab/commit/963d2dc)): Implement filesystem comparison component
  - **Forensics Panel** ([822b080](https://github.com/Luisen1/os-filesystem-lab/commit/822b080)): Implement forensics analysis panel component
  - **Read-Only Analysis** ([6589c5a](https://github.com/Luisen1/os-filesystem-lab/commit/6589c5a)): Implement read-only filesystem analysis component
  - **Journaling Analysis** ([e7ac842](https://github.com/Luisen1/os-filesystem-lab/commit/e7ac842)): Implement journaling filesystem analysis component
- **Infrastructure**:
  - **HTML Entry** ([961dedc](https://github.com/Luisen1/os-filesystem-lab/commit/961dedc)): Add HTML entry point
  - **Application Entry** ([741256c](https://github.com/Luisen1/os-filesystem-lab/commit/741256c)): Add application entry points
  - **Global Styles** ([5525b24](https://github.com/Luisen1/os-filesystem-lab/commit/5525b24)): Add global styles with Tailwind
  - **Utilities** ([73c1f1a](https://github.com/Luisen1/os-filesystem-lab/commit/73c1f1a)): Add utility functions and chart configurations
  - **TypeScript Types** ([86012ae](https://github.com/Luisen1/os-filesystem-lab/commit/86012ae)): Define TypeScript types for filesystem analysis
- **Configuration**:
  - **Build Setup** ([54cff4c](https://github.com/Luisen1/os-filesystem-lab/commit/54cff4c)): Setup build and styling configuration
  - **Project Init** ([bded430](https://github.com/Luisen1/os-filesystem-lab/commit/bded430)): Initialize project with dependencies

=======
<!-- generado por git-cliff -->
>>>>>>> c107aa3e0e5d0c99eaf37ca620b98fb194c84d5d
