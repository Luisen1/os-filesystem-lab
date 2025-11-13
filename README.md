# OS File Systems Laboratory

Laboratorio interactivo para el análisis de sistemas de archivos modernos: journaling, read-only y análisis forense.

## Tecnologías Utilizadas

- **React 18**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Tipado estático para JavaScript
- **Vite**: Herramienta de construcción y desarrollo rápido
- **Tailwind CSS 3**: Framework CSS para diseño responsivo
- **Recharts 2**: Biblioteca de gráficos para visualizaciones
- **Lucide React**: Conjunto de iconos modernos

## Estructura del Proyecto

```
os-filesystem-lab
├── src
│   ├── main.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── JournalingAnalysis.tsx
│   │   ├── ReadOnlyAnalysis.tsx
│   │   └── ForensicsPanel.tsx
│   └── styles
│       └── index.css
├── public
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── CHANGELOG.md
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Luisen1/os-filesystem-lab.git
   cd os-filesystem-lab
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

Para iniciar la aplicación en modo de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Módulos Implementados

### 1. Journaling Analysis
- Teoría de journaling en sistemas de archivos
- Simulación de transacciones
- Comparación de ext4, XFS, Btrfs
- Análisis de rendimiento y recuperación

### 2. Read-Only Analysis
- Teoría de sistemas de archivos read-only
- Análisis de SquashFS
- Comparación de compresión
- Benchmarks de rendimiento

### 3. Forensic Analysis
- Ciclo de vida de archivos borrados
- Técnicas de recuperación (metadata, carving, journal)
- Timeline forense y timestamps
- Detección de anomalías

## Contribuciones

Las contribuciones son bienvenidas. Por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. 