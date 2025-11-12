import React from 'react';

const ReadOnlyAnalysis: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Análisis de Sistemas de Archivos Solo Lectura</h2>
            <p>
                Este componente se encarga de analizar el comportamiento de sistemas de archivos que están montados en modo solo lectura.
                Aquí se presentarán los resultados del análisis y se ofrecerán herramientas para la evaluación forense.
            </p>
            {/* Aquí se pueden agregar gráficos y resultados del análisis */}
        </div>
    );
};

export default ReadOnlyAnalysis;