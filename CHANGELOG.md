# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- generado por git-cliff -->

## [Unreleased]

### Refactor
- **repository cleanup**: Remove unused components and utilities to optimize repository (1502bf1)
  - Removed Dashboard.tsx (unused legacy component)
  - Removed FileSystemComparison.tsx (empty placeholder)
  - Removed src/types directory (unused TypeScript interfaces)
  - Removed src/utils directory (chartConfig and fileSystemHelpers not used)
  - Updated README.md with accurate project structure

### Added
- **ForensicsPanel**: Complete implementation with forensic analysis theory
  - Theory tab: File deletion fundamentals and mathematical models
  - Lifecycle tab: Visual representation of file states
  - Recovery tab: Techniques comparison and practical commands
  - Timeline tab: Timestamp analysis and anomaly detection

### Changed
- Dashboard layout: Transformed to sidebar navigation pattern
- Updated README.md with accurate module descriptions

