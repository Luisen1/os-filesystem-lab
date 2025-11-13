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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Sidebar */}
      <div className="w-72 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-soft">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-3 rounded-2xl shadow-soft">
              <HardDrive className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-gray-900 tracking-tight">FS Laboratory</h1>
              <p className="text-xs text-gray-500 font-medium">Sistemas Operativos</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
                className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-xl transition-all duration-300 group animate-slide-up ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 font-semibold shadow-inner-soft'
                    : 'text-gray-700 hover:bg-gray-50 hover:shadow-soft'
                }`}
              >
                <div className={`transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                </div>
                <span className="font-medium">{item.title}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600 animate-scale-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-soft">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Laboratorio FS</p>
              <p className="text-xs text-gray-500">8vo Semestre • 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{activeView === 'home' && (
          <div className="p-10 animate-fade-in">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12">
                <h2 className="text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
                  File System <span className="text-gradient">Analysis</span> Lab
                </h2>
                <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl">
                  Laboratorio interactivo de análisis profundo de sistemas de archivos modernos: 
                  journaling, read-only y técnicas forenses avanzadas
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="card group cursor-pointer animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-primary-600 rounded-2xl flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                      Journaling File Systems
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Análisis completo de sistemas con journaling: ext3, ext4, XFS. 
                      Simulaciones interactivas y benchmarks de rendimiento.
                    </p>
                    <div className="mt-4 flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Explorar módulo →
                    </div>
                  </div>
                </div>

                <div className="card group cursor-pointer animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                      Read-Only Systems
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Sistemas de solo lectura: SquashFS, ISO 9660. 
                      Análisis de compresión y optimización de espacio.
                    </p>
                    <div className="mt-4 flex items-center text-gray-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Explorar módulo →
                    </div>
                  </div>
                </div>

                <div className="card group cursor-pointer animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-accent-600 rounded-2xl flex items-center justify-center mb-5 shadow-soft group-hover:scale-110 transition-transform duration-300">
                      <Search className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                      Forensic Analysis
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Análisis forense profesional: recuperación de datos, 
                      timeline reconstruction y técnicas de carving.
                    </p>
                    <div className="mt-4 flex items-center text-accent-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Explorar módulo →
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 card p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-gray-900 mb-2">
                      Laboratorio Interactivo
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Este proyecto combina teoría académica con simulaciones prácticas. 
                      Cada módulo incluye visualizaciones en tiempo real, análisis comparativos 
                      y ejemplos de código real utilizados en sistemas operativos modernos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'journaling' && (
          <div className="p-10 animate-fade-in">
            <JournalingAnalysis />
          </div>
        )}

        {activeView === 'readonly' && (
          <div className="p-10 animate-fade-in">
            <ReadOnlyAnalysis />
          </div>
        )}

        {activeView === 'forensics' && (
          <div className="p-10 animate-fade-in">
            <ForensicsPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;