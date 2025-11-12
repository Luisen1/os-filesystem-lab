# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Features
- **navigation**: implement state-based navigation menu ([191e160](https://github.com/Luisen1/os-filesystem-lab/commit/191e160))
  - Replace react-router with state-based navigation system
  - Create elegant dark-themed main menu with 3 module cards
  - Add gradient backgrounds and hover effects
  - Implement back button for navigation consistency
- **journaling**: implement complete journaling analysis component ([441b865](https://github.com/Luisen1/os-filesystem-lab/commit/441b865))
  - Add comprehensive theory section with ACID properties
  - Include journaling types comparison (journal, ordered, writeback)
  - Create interactive simulation with failure recovery
  - Add performance charts and numerical examples

### Bug Fixes
- **changelog**: remove --unreleased flag to generate full commit history ([cb78707](https://github.com/Luisen1/os-filesystem-lab/commit/cb78707))
- **changelog**: use --unreleased flag instead of invalid --tag-pattern argument ([97b8b3f](https://github.com/Luisen1/os-filesystem-lab/commit/97b8b3f))
- **changelog**: force changelog regeneration in GitHub Actions workflow ([5a80228](https://github.com/Luisen1/os-filesystem-lab/commit/5a80228))
- **html**: correct root div ID in index.html ([22ac1e4](https://github.com/Luisen1/os-filesystem-lab/commit/22ac1e4))
- **workflow**: ajustar permisos de pull-requests en el flujo de trabajo de changelog ([ce421a7](https://github.com/Luisen1/os-filesystem-lab/commit/ce421a7))
- **workflow**: correct git-cliff version command in workflow ([1848ffc](https://github.com/Luisen1/os-filesystem-lab/commit/1848ffc))
- **workflow**: corregir comando de versión de git-cliff y agregar nueva línea en README.md ([067f656](https://github.com/Luisen1/os-filesystem-lab/commit/067f656))
- **workflow**: improve changelog generation workflow ([41d8fe1](https://github.com/Luisen1/os-filesystem-lab/commit/41d8fe1))
- **config**: remove duplicate protect_breaking_commits key in cliff.toml ([80d1e8a](https://github.com/Luisen1/os-filesystem-lab/commit/80d1e8a))
- **ci**: replace git-cliff-action with manual installation ([7112456](https://github.com/Luisen1/os-filesystem-lab/commit/7112456))
- **ci**: use stable versions for GitHub Actions ([9e52997](https://github.com/Luisen1/os-filesystem-lab/commit/9e52997))

### Documentation
- update CHANGELOG.md ([cf999d2](https://github.com/Luisen1/os-filesystem-lab/commit/cf999d2))
- update CHANGELOG.md with complete commit history ([549c1fa](https://github.com/Luisen1/os-filesystem-lab/commit/549c1fa))
- update CHANGELOG.md ([597d50c](https://github.com/Luisen1/os-filesystem-lab/commit/597d50c))
- add initial CHANGELOG.md ([4c716db](https://github.com/Luisen1/os-filesystem-lab/commit/4c716db))

### Refactor
- remove emojis from changelog configuration ([1890378](https://github.com/Luisen1/os-filesystem-lab/commit/1890378))
- move files to root directory ([8e38c12](https://github.com/Luisen1/os-filesystem-lab/commit/8e38c12))

### Configuration
- add git-cliff configuration for changelog generation ([0bbbe7d](https://github.com/Luisen1/os-filesystem-lab/commit/0bbbe7d))

### Miscellaneous Tasks
- add GitHub Actions workflow for automatic changelog ([6f6ec24](https://github.com/Luisen1/os-filesystem-lab/commit/6f6ec24))

<!-- generado por git-cliff -->
