import React from 'react';

const FileSystemComparison: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Comparación de Sistemas de Archivos</h1>
            <p className="mb-2">Este componente permite comparar el comportamiento de sistemas de archivos con y sin journaling.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Sistemas de Archivos con Journaling</h2>
                    <p>Aquí se presentarán los resultados y análisis de sistemas de archivos que implementan journaling.</p>
                    {/* Aquí se pueden agregar gráficos y análisis específicos */}
                </div>
                <div className="border p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Sistemas de Archivos Solo Lectura</h2>
                    <p>Aquí se presentarán los resultados y análisis de sistemas de archivos montados como solo lectura.</p>
                    {/* Aquí se pueden agregar gráficos y análisis específicos */}
                </div>
            </div>
        </div>
    );
};

export default FileSystemComparison;