import React, { useState } from 'react';
import { 
  FileText, 
  Shield, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  BookOpen,
  Terminal,
  Database,
  Clock
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const JournalingAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'theory' | 'types' | 'demo' | 'performance'>('theory');
  const [journalingMode, setJournalingMode] = useState<'journal' | 'ordered' | 'writeback'>('ordered');
  const [simulationStep, setSimulationStep] = useState(0);
  const [failurePoint, setFailurePoint] = useState<number | null>(null);

  // Datos de rendimiento comparativo
  const performanceData = [
    { name: 'Sin Journal', tiempo: 10, overhead: 0, seguridad: 20 },
    { name: 'Writeback', tiempo: 11, overhead: 10, seguridad: 60 },
    { name: 'Ordered', tiempo: 14, overhead: 40, seguridad: 85 },
    { name: 'Journal', tiempo: 20, overhead: 100, seguridad: 100 },
  ];

  // Datos de tiempo de recuperación
  const recoveryData = [
    { transacciones: 10, sinJournal: 5000, conJournal: 50 },
    { transacciones: 50, sinJournal: 25000, conJournal: 150 },
    { transacciones: 100, sinJournal: 50000, conJournal: 350 },
    { transacciones: 500, sinJournal: 250000, conJournal: 1500 },
  ];

  // Pasos de la simulación
  const simulationSteps = [
    { id: 0, title: 'Inicio', description: 'Solicitud de creación de archivo "nota.txt"' },
    { id: 1, title: 'Journal Start', description: 'Escribir transacción T1 en el journal' },
    { id: 2, title: 'Journal Commit', description: 'Marcar transacción como committed (checksum: ABC123)' },
    { id: 3, title: 'Escribir Datos', description: 'Escribir "Hola mundo" en el bloque 789' },
    { id: 4, title: 'Checkpoint', description: 'Aplicar cambios al sistema de archivos' },
    { id: 5, title: 'Journal Clear', description: 'Limpiar entrada del journal' },
    { id: 6, title: 'Completado', description: 'Archivo creado exitosamente' },
  ];

  const handleSimulationStep = (direction: 'next' | 'prev') => {
    if (direction === 'next' && simulationStep < simulationSteps.length - 1) {
      setSimulationStep(simulationStep + 1);
    } else if (direction === 'prev' && simulationStep > 0) {
      setSimulationStep(simulationStep - 1);
    }
  };

  const simulateFailure = () => {
    setFailurePoint(simulationStep);
  };

  const resetSimulation = () => {
    setSimulationStep(0);
    setFailurePoint(null);
  };

  const getRecoveryAction = (step: number): string => {
    if (step <= 1) return 'Rollback: Ignorar transacción incompleta';
    if (step === 2) return 'Replay: Reescribir datos desde journal';
    if (step >= 3 && step < 5) return 'Replay: Aplicar operaciones del journal';
    if (step >= 5) return 'No requiere acción: Transacción completa';
    return 'Sistema consistente';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Journaling File Systems</h2>
        <p className="text-gray-600">
          Análisis completo de sistemas de archivos con journaling: teoría, tipos y experimentación
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 bg-white rounded-xl p-2 shadow border border-gray-200">
        {[
          { id: 'theory', label: 'Teoría', icon: BookOpen },
          { id: 'types', label: 'Tipos de Journal', icon: Database },
          { id: 'demo', label: 'Simulación', icon: Terminal },
          { id: 'performance', label: 'Rendimiento', icon: Zap },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all rounded-lg flex-1 justify-center ${
              activeTab === id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Theory Tab */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          {/* Fundamento Teórico */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">¿Qué es el Journaling?</h3>
            </div>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              El <strong>journaling</strong> es una técnica que registra los cambios que se van a realizar 
              en el sistema de archivos <strong>antes</strong> de aplicarlos realmente. Funciona como un 
              "diario" o "bitácora" donde se anotan las operaciones pendientes.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-base text-gray-800 leading-relaxed">
                <strong>Analogía:</strong> Imagina que vas a reorganizar tu habitación. Antes de mover nada, 
                escribes en un papel: "Voy a mover la cama de A a B". Si algo te interrumpe (corte de luz), 
                al volver puedes leer tu papel y saber exactamente qué estabas haciendo.
              </p>
            </div>
          </div>

          {/* Problema que Resuelve */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h3 className="text-2xl font-bold text-gray-900">Problema de la Inconsistencia</h3>
            </div>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Cuando guardas un archivo, el sistema operativo debe hacer <strong>múltiples operaciones</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 text-base">
              <li>Actualizar el inodo (metadatos del archivo)</li>
              <li>Modificar el bitmap de bloques (marcar espacio usado)</li>
              <li>Escribir los datos reales en el disco</li>
              <li>Actualizar el directorio padre</li>
            </ol>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="text-base text-gray-800 mb-2">
                <strong>Consecuencias de un fallo durante estas operaciones:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-base text-gray-700">
                <li>El sistema puede pensar que un bloque está libre cuando realmente tiene datos</li>
                <li>Puede haber inodos huérfanos</li>
                <li>Directorios corruptos</li>
              </ul>
            </div>
          </div>

          {/* Modelo Matemático */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Modelo Formal del Journaling</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-gray-900 text-lg">Sin Journaling:</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-base text-gray-800">
                  S₀ → S₀.₁ → S₀.₂ → S₀.₃ → S₁
                </div>
                <p className="text-base text-red-600 mt-2 font-medium">
                  Si falla en cualquier punto intermedio resulta en estado inconsistente Sᵢ
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-gray-900 text-lg">Con Journaling:</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-base space-y-1 text-gray-800">
                  <div>1. Write-Ahead Log: Registrar T en el journal</div>
                  <div>2. Journal Commit: Marcar como completa</div>
                  <div>3. Checkpoint: Aplicar cambios al filesystem</div>
                  <div>4. Journal Clear: Limpiar entrada</div>
                </div>
                <p className="text-base text-green-600 mt-2 font-medium">
                  Sistema siempre en estado consistente (S₀ o S₁)
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold mb-2 text-purple-900 text-lg">Propiedades ACID:</h4>
                <ul className="space-y-2 text-base text-gray-700">
                  <li><strong>Atomicidad:</strong> La transacción se aplica completamente o no se aplica</li>
                  <li><strong>Consistencia:</strong> El sistema siempre está en estado válido</li>
                  <li><strong>Durabilidad:</strong> Si T está committed, sobrevive a fallos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Diagrama Visual */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Comparación Visual</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-red-300 p-4 rounded-xl bg-red-50">
                <h4 className="font-semibold text-red-700 mb-3 flex items-center text-lg">
                  <XCircle className="w-5 h-5 mr-2" />
                  Sin Journaling
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-blue-400 p-2 rounded text-center font-semibold text-gray-900">App</div>
                    <span className="text-gray-700 font-bold">→</span>
                    <div className="w-16 bg-yellow-400 p-2 rounded text-center font-semibold text-gray-900">Cache</div>
                    <span className="text-gray-700 font-bold">→</span>
                    <div className="w-16 bg-green-400 p-2 rounded text-center font-semibold text-gray-900">Disco</div>
                  </div>
                  <div className="text-center text-red-700 font-bold mt-4 text-base">
                    FALLO = CORRUPCIÓN
                  </div>
                </div>
              </div>

              <div className="border-2 border-green-300 p-4 rounded-xl bg-green-50">
                <h4 className="font-semibold text-green-700 mb-3 flex items-center text-lg">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Con Journaling
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 bg-blue-400 p-2 rounded text-center text-xs font-semibold text-gray-900">App</div>
                    <span className="text-gray-700 font-bold">→</span>
                    <div className="w-12 bg-yellow-400 p-2 rounded text-center text-xs font-semibold text-gray-900">Cache</div>
                    <span className="text-gray-700 font-bold">→</span>
                    <div className="w-16 bg-purple-400 p-2 rounded text-center text-xs font-semibold text-gray-900">Journal</div>
                    <span className="text-gray-700 font-bold">→</span>
                    <div className="w-12 bg-green-400 p-2 rounded text-center text-xs font-semibold text-gray-900">Disco</div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="text-center text-green-700 text-base">FALLO → Rollback/Replay</div>
                    <div className="text-center text-green-700 font-bold text-base">Sistema Consistente</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Types Tab */}
      {activeTab === 'types' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Tipos de Journaling (ext3/ext4)</h3>
            
            <div className="space-y-4">
              {[
                {
                  mode: 'journal',
                  name: 'Journal (Completo)',
                  color: 'blue',
                  overhead: '~100%',
                  security: 'Máxima',
                  description: 'Registra METADATOS + DATOS',
                  details: [
                    'Más seguro, más lento',
                    'Escritura doble: journal → filesystem',
                    'Garantiza integridad total'
                  ]
                },
                {
                  mode: 'ordered',
                  name: 'Ordered (Ordenado)',
                  color: 'green',
                  overhead: '~15-20%',
                  security: 'Alta',
                  description: 'Registra solo METADATOS (por defecto en ext4)',
                  details: [
                    'Los datos se escriben ANTES que metadatos',
                    'Balance entre seguridad y rendimiento',
                    'Opción recomendada para uso general'
                  ]
                },
                {
                  mode: 'writeback',
                  name: 'Writeback',
                  color: 'yellow',
                  overhead: '~5-10%',
                  security: 'Media',
                  description: 'Registra solo METADATOS (sin orden)',
                  details: [
                    'Los datos se escriben cuando sea',
                    'Más rápido, menos seguro',
                    'Puede tener datos corruptos tras fallo'
                  ]
                }
              ].map(({ mode, name, color, overhead, security, description, details }) => (
                <div
                  key={mode}
                  className={`border-2 p-5 rounded-xl cursor-pointer transition-all shadow-md hover:shadow-lg ${
                    journalingMode === mode
                      ? `border-${color}-500 bg-${color}-50`
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  }`}
                  onClick={() => setJournalingMode(mode as any)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-xl text-gray-900">{name}</h4>
                    <div className="text-right">
                      <div className="text-sm text-gray-700">Overhead: <strong className="text-base">{overhead}</strong></div>
                      <div className="text-sm text-gray-700">Seguridad: <strong className="text-base">{security}</strong></div>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-3 text-base font-medium">{description}</p>
                  <ul className="list-disc list-inside space-y-1 text-base text-gray-700">
                    {details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Fórmula de Overhead */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ecuación de Overhead</h3>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4 text-gray-800 text-lg">
              Overhead = (Escrituras_Journal / Escrituras_Totales) × 100
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-5 bg-blue-50 rounded-xl border-2 border-blue-300">
                <div className="text-3xl font-bold text-blue-700">100%</div>
                <div className="text-base text-gray-700 mt-1">Journal mode</div>
              </div>
              <div className="text-center p-5 bg-green-50 rounded-xl border-2 border-green-300">
                <div className="text-3xl font-bold text-green-700">15-20%</div>
                <div className="text-base text-gray-700 mt-1">Ordered mode</div>
              </div>
              <div className="text-center p-5 bg-yellow-50 rounded-xl border-2 border-yellow-300">
                <div className="text-3xl font-bold text-yellow-700">5-10%</div>
                <div className="text-base text-gray-700 mt-1">Writeback mode</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Tab */}
      {activeTab === 'demo' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Simulación: Crear archivo "nota.txt"</h3>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                {simulationSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.id === simulationStep
                        ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                        : step.id < simulationStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    } ${step.id === failurePoint ? 'ring-4 ring-red-500 bg-red-600 text-white' : ''}`}
                  >
                    {step.id + 1}
                  </div>
                ))}
              </div>
              <div className="relative h-2 bg-gray-200 rounded">
                <div
                  className="absolute h-full bg-blue-600 rounded transition-all"
                  style={{ width: `${(simulationStep / (simulationSteps.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Step Info */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <h4 className="font-bold text-xl mb-1 text-blue-900">{simulationSteps[simulationStep].title}</h4>
              <p className="text-gray-800 text-base">{simulationSteps[simulationStep].description}</p>
            </div>

            {/* Failure Info */}
            {failurePoint !== null && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-red-800 flex items-center mb-2 text-lg">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Fallo Simulado en Paso {failurePoint + 1}
                </h4>
                <p className="text-gray-800 mb-2 text-base">
                  <strong>Acción de Recuperación:</strong>
                </p>
                <p className="text-gray-800 text-base">{getRecoveryAction(failurePoint)}</p>
              </div>
            )}

            {/* Controls */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleSimulationStep('prev')}
                disabled={simulationStep === 0}
                className="px-5 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                ← Anterior
              </button>
              <button
                onClick={() => handleSimulationStep('next')}
                disabled={simulationStep === simulationSteps.length - 1}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Siguiente →
              </button>
              <button
                onClick={simulateFailure}
                className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center transition-colors font-medium"
              >
                <Zap className="w-4 h-4 mr-2" />
                Simular Fallo
              </button>
              <button
                onClick={resetSimulation}
                className="px-5 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
              >
                Reiniciar
              </button>
            </div>
          </div>

          {/* Recovery Table */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Tabla de Recuperación</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left text-gray-900 font-semibold text-base">Fallo en Fase</th>
                    <th className="p-4 text-left text-gray-900 font-semibold text-base">Estado del Journal</th>
                    <th className="p-4 text-left text-gray-900 font-semibold text-base">Acción de Recuperación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-800 text-base">Fase 1 (antes de commit)</td>
                    <td className="p-4 text-gray-800 text-base">Transacción incompleta</td>
                    <td className="p-4 text-yellow-700 font-medium text-base">Ignorar transacción, rollback</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-800 text-base">Fase 2 (datos)</td>
                    <td className="p-4 text-gray-800 text-base">Commit OK, datos parciales</td>
                    <td className="p-4 text-blue-700 font-medium text-base">Reescribir datos</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 text-gray-800 text-base">Fase 3 (checkpoint)</td>
                    <td className="p-4 text-gray-800 text-base">Commit OK</td>
                    <td className="p-4 text-green-700 font-medium text-base">Replay: aplicar ops del journal</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-800 text-base">Fase 4 (limpieza)</td>
                    <td className="p-4 text-gray-800 text-base">Todo completo</td>
                    <td className="p-4 text-green-700 font-medium text-base">No hacer nada</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Comparative Performance */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Comparación de Rendimiento</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tiempo" fill="#3b82f6" name="Tiempo (s)" />
                <Bar dataKey="overhead" fill="#ef4444" name="Overhead (%)" />
                <Bar dataKey="seguridad" fill="#10b981" name="Seguridad (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recovery Time */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Tiempo de Recuperación</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={recoveryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="transacciones" label={{ value: 'Número de Transacciones', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Tiempo (ms)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sinJournal" stroke="#ef4444" strokeWidth={2} name="Sin Journaling" />
                <Line type="monotone" dataKey="conJournal" stroke="#10b981" strokeWidth={2} name="Con Journaling" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Numerical Example */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ejemplo Numérico: Escribir 1GB en 1000 archivos</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-2 border-gray-300 p-5 rounded-xl bg-gray-50">
                <h4 className="font-semibold mb-3 text-gray-900 text-lg">Sin Journaling</h4>
                <div className="text-base space-y-2 text-gray-800">
                  <div>Escrituras directas:</div>
                  <div className="font-mono bg-white p-3 rounded-lg border border-gray-300 font-semibold">1000 ops × 10ms = 10s</div>
                </div>
              </div>
              <div className="border-2 border-green-400 p-5 rounded-xl bg-green-50">
                <h4 className="font-semibold mb-3 text-gray-900 text-lg">Ordered Mode (Recomendado)</h4>
                <div className="text-base space-y-2 text-gray-800">
                  <div>1. Datos: 1000 × 10ms = 10s</div>
                  <div>2. Journal: 1000 × 2ms = 2s</div>
                  <div>3. Checkpoint: 1000 × 2ms = 2s</div>
                  <div className="font-mono bg-green-100 p-3 rounded-lg font-bold text-green-800 border border-green-300">Total: 14s (40% overhead)</div>
                </div>
              </div>
              <div className="border-2 border-blue-400 p-5 rounded-xl bg-blue-50">
                <h4 className="font-semibold mb-3 text-gray-900 text-lg">Journal Mode</h4>
                <div className="text-base space-y-2 text-gray-800">
                  <div>1. Journal: 1000 × 10ms = 10s</div>
                  <div>2. Checkpoint: 1000 × 10ms = 10s</div>
                  <div className="font-mono bg-blue-100 p-3 rounded-lg font-bold text-blue-800 border border-blue-300">Total: 20s (100% overhead)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulas */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Fórmulas Importantes</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-semibold mb-2 text-blue-800 text-lg">Tiempo de Recuperación</h4>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-base mb-2 text-gray-800">
                  T_recuperación = T_scan_journal + T_replay
                </div>
                <div className="text-base text-gray-700">
                  <div className="font-semibold mb-1">Donde:</div>
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>T_scan_journal = n_transacciones × t_lectura</li>
                    <li>T_replay = n_ops_pendientes × t_aplicar_op</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-semibold mb-2 text-green-800 text-lg">Probabilidad de Corrupción</h4>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-base mb-2 text-gray-800">
                  P(corrupción) = P(fallo) × P(inconsistente | fallo)
                </div>
                <div className="text-base text-gray-700 space-y-1">
                  <div><strong>Sin journaling:</strong> P ≈ 75% (para 4 operaciones)</div>
                  <div><strong>Con journaling:</strong> P ≈ 0% (si journal committed)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Experiment Proposal */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Terminal className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Propuesta de Experimentación</h3>
            </div>
            <div className="bg-gray-900 text-green-400 p-5 rounded-lg font-mono text-base overflow-x-auto border-2 border-gray-700">
              <div># 1. Crear disco virtual</div>
              <div>dd if=/dev/zero of=disk.img bs=1M count=100</div>
              <div className="mt-2"># 2. Crear filesystem con journaling</div>
              <div>mkfs.ext4 -J size=16 disk.img</div>
              <div className="mt-2"># 3. Montar</div>
              <div>mount -o loop disk.img /mnt/test</div>
              <div className="mt-2"># 4. Simular escrituras</div>
              <div>for i in {'{1..100}'}; do</div>
              <div>  echo "Dato $i" &gt; /mnt/test/file_$i.txt</div>
              <div>done &</div>
              <div className="mt-2"># 5. Forzar fallo (apagar VM o kill proceso)</div>
              <div>kill -9 $PID_ESCRITURA</div>
              <div className="mt-2"># 6. Verificar recuperación</div>
              <div>fsck.ext4 -fy disk.img</div>
              <div>mount -o loop disk.img /mnt/test</div>
              <div>ls /mnt/test  # Verificar integridad</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalingAnalysis;