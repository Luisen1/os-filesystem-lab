import React from 'react';

const ForensicsPanel: React.FC = () => {
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Panel de Análisis Forense</h2>
            <p className="mb-2">Aquí puedes encontrar herramientas y resultados de análisis forense de sistemas de archivos.</p>
            {/* Aquí se pueden agregar más componentes o herramientas relacionadas con el análisis forense */}
        </div>
    );
};

export default ForensicsPanel;