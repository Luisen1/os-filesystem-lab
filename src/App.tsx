import React, { useState } from 'react';
import JournalingAnalysis from './components/JournalingAnalysis';
import ReadOnlyAnalysis from './components/ReadOnlyAnalysis';
import ForensicsPanel from './components/ForensicsPanel';
import { BookOpen, Shield, Search, HardDrive, Home, Users } from 'lucide-react';

type MenuOption = 'home' | 'journaling' | 'readonly' | 'forensics';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<MenuOption>('journaling');

  const menuItems = [
    {
      id: 'home' as MenuOption,
      title: 'Inicio',
      icon: Home,
    },
    {
      id: 'journaling' as MenuOption,
      title: 'Journaling FS',
      icon: BookOpen,
    },
    {
      id: 'readonly' as MenuOption,
      title: 'Read-Only FS',
      icon: Shield,
    },
    {
      id: 'forensics' as MenuOption,
      title: 'Forensic Analysis',
      icon: Search,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <HardDrive className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">FS Lab</h1>
              <p className="text-xs text-gray-500">Sistemas Operativos</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Laboratorio</p>
              <p className="text-xs text-gray-500">8vo Semestre</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeView === 'home' && (
          <div className="p-8">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                File System Analysis Laboratory
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Laboratorio interactivo para el análisis de sistemas de archivos modernos
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Journaling File Systems
                  </h3>
                  <p className="text-sm text-gray-600">
                    Análisis de sistemas de archivos con journaling como ext3/ext4
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Read-Only Systems
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sistemas de archivos de solo lectura: SquashFS, ISO 9660
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Forensic Analysis
                  </h3>
                  <p className="text-sm text-gray-600">
                    Análisis forense y recuperación de archivos eliminados
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'journaling' && (
          <div className="p-8">
            <JournalingAnalysis />
          </div>
        )}

        {activeView === 'readonly' && (
          <div className="p-8">
            <ReadOnlyAnalysis />
          </div>
        )}

        {activeView === 'forensics' && (
          <div className="p-8">
            <ForensicsPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;