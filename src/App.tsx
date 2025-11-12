import React, { useState } from 'react';
import JournalingAnalysis from './components/JournalingAnalysis';
import ReadOnlyAnalysis from './components/ReadOnlyAnalysis';
import ForensicsPanel from './components/ForensicsPanel';
import { BookOpen, Shield, Search, ChevronRight, HardDrive } from 'lucide-react';

type MenuOption = 'home' | 'journaling' | 'readonly' | 'forensics';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<MenuOption>('home');

  const menuItems = [
    {
      id: 'journaling' as MenuOption,
      title: 'Journaling File Systems',
      description: 'Análisis de sistemas de archivos con journaling (ext3/ext4)',
      icon: BookOpen,
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-700 hover:to-blue-900',
    },
    {
      id: 'readonly' as MenuOption,
      title: 'Read-Only File Systems',
      description: 'Sistemas de archivos de solo lectura (SquashFS, ISO 9660)',
      icon: Shield,
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'hover:from-gray-700 hover:to-gray-900',
    },
    {
      id: 'forensics' as MenuOption,
      title: 'Forensic Analysis',
      description: 'Análisis forense y recuperación de archivos eliminados',
      icon: Search,
      color: 'from-slate-600 to-slate-800',
      hoverColor: 'hover:from-slate-700 hover:to-slate-900',
    },
  ];

  if (activeView === 'journaling') {
    return (
      <div className="min-h-screen bg-gray-50">
        <button
          onClick={() => setActiveView('home')}
          className="m-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Volver al Menú</span>
        </button>
        <div className="container mx-auto px-4 pb-8">
          <JournalingAnalysis />
        </div>
      </div>
    );
  }

  if (activeView === 'readonly') {
    return (
      <div className="min-h-screen bg-gray-50">
        <button
          onClick={() => setActiveView('home')}
          className="m-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Volver al Menú</span>
        </button>
        <div className="container mx-auto px-4 pb-8">
          <ReadOnlyAnalysis />
        </div>
      </div>
    );
  }

  if (activeView === 'forensics') {
    return (
      <div className="min-h-screen bg-gray-50">
        <button
          onClick={() => setActiveView('home')}
          className="m-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Volver al Menú</span>
        </button>
        <div className="container mx-auto px-4 pb-8">
          <ForensicsPanel />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <HardDrive className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">File System Analysis Lab</h1>
              <p className="text-blue-200 mt-1">Laboratorio de Sistemas Operativos - Análisis de Sistemas de Archivos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Selecciona un Módulo de Análisis</h2>
          <p className="text-gray-300 text-lg">Explora diferentes aspectos de los sistemas de archivos modernos</p>
        </div>

        {/* Menu Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`bg-gradient-to-br ${item.color} ${item.hoverColor} p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 text-left group relative overflow-hidden`}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* Icon */}
                <div className="bg-white bg-opacity-10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-all">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center text-white font-medium group-hover:translate-x-2 transition-transform">
                  <span className="text-sm">Explorar</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-3">Acerca de este Laboratorio</h3>
            <p className="text-gray-300 leading-relaxed">
              Este laboratorio interactivo te permite explorar tres aspectos fundamentales de los sistemas de archivos:
              el journaling para garantizar la integridad de datos, los sistemas de solo lectura para distribución eficiente,
              y las técnicas forenses para recuperación y análisis de información.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;