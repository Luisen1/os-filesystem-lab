# File System Forensics App

Este proyecto es una aplicación React diseñada para comparar el comportamiento de sistemas de archivos con journaling y solo lectura, así como para realizar análisis forenses de sistemas de archivos.

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de construcción y desarrollo rápido para aplicaciones web.
- **Lucide React**: Conjunto de iconos para React.
- **Recharts**: Biblioteca de gráficos para React.
- **Tailwind CSS**: Framework CSS para un diseño rápido y responsivo.

## Estructura del Proyecto

```
filesystem-forensics-app
├── src
│   ├── main.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── Dashboard.tsx
│   │   ├── FileSystemComparison.tsx
│   │   ├── JournalingAnalysis.tsx
│   │   ├── ReadOnlyAnalysis.tsx
│   │   └── ForensicsPanel.tsx
│   ├── utils
│   │   ├── fileSystemHelpers.ts
│   │   └── chartConfig.ts
│   ├── types
│   │   └── index.ts
│   └── styles
│       └── index.css
├── public
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd filesystem-forensics-app
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Para iniciar la aplicación en modo de desarrollo, ejecuta:
```
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.