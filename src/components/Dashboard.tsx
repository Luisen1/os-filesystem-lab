import React from 'react';
import FileSystemComparison from './FileSystemComparison';
import JournalingAnalysis from './JournalingAnalysis';
import ReadOnlyAnalysis from './ReadOnlyAnalysis';
import ForensicsPanel from './ForensicsPanel';

const Dashboard: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard de Análisis de Sistemas de Archivos</h1>
            <FileSystemComparison />
            <JournalingAnalysis />
            <ReadOnlyAnalysis />
            <ForensicsPanel />
        </div>
    );
};

export default Dashboard;