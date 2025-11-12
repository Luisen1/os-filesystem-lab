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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Journaling File Systems</h2>
        <p className="text-blue-100">
          Análisis completo de sistemas de archivos con journaling: teoría, tipos y experimentación
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b">
        {[
          { id: 'theory', label: 'Teoría', icon: BookOpen },
          { id: 'types', label: 'Tipos de Journal', icon: Database },
          { id: 'demo', label: 'Simulación', icon: Terminal },
          { id: 'performance', label: 'Rendimiento', icon: Zap },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center space-x-2 px-4 py-2 font-medium transition-colors ${
              activeTab === id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Theory Tab */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          {/* Fundamento Teórico */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold">¿Qué es el Journaling?</h3>
            </div>
            <p className="text-gray-700 mb-4">
              El <strong>journaling</strong> es una técnica que registra los cambios que se van a realizar 
              en el sistema de archivos <strong>antes</strong> de aplicarlos realmente. Funciona como un 
              "diario" o "bitácora" donde se anotan las operaciones pendientes.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Analogía:</strong> Imagina que vas a reorganizar tu habitación. Antes de mover nada, 
                escribes en un papel: "Voy a mover la cama de A a B". Si algo te interrumpe (corte de luz), 
                al volver puedes leer tu papel y saber exactamente qué estabas haciendo.
              </p>
            </div>
          </div>

          {/* Problema que Resuelve */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h3 className="text-xl font-bold">Problema de la Inconsistencia</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Cuando guardas un archivo, el sistema operativo debe hacer <strong>múltiples operaciones</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
              <li>Actualizar el inodo (metadatos del archivo)</li>
              <li>Modificar el bitmap de bloques (marcar espacio usado)</li>
              <li>Escribir los datos reales en el disco</li>
              <li>Actualizar el directorio padre</li>
            </ol>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-sm text-gray-700 mb-2">
                <strong>⚠️ Si hay un fallo entre estas operaciones:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>El sistema puede pensar que un bloque está libre cuando realmente tiene datos</li>
                <li>Puede haber inodos huérfanos</li>
                <li>Directorios corruptos</li>
              </ul>
            </div>
          </div>

          {/* Modelo Matemático */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold">Modelo Formal del Journaling</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Sin Journaling:</h4>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                  S₀ → S₀.₁ → S₀.₂ → S₀.₃ → S₁
                </div>
                <p className="text-sm text-red-600 mt-2">
                  ❌ Si falla en cualquier punto intermedio → Estado inconsistente Sᵢ
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Con Journaling:</h4>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm space-y-1">
                  <div>1. Write-Ahead Log: Registrar T en el journal</div>
                  <div>2. Journal Commit: Marcar como completa</div>
                  <div>3. Checkpoint: Aplicar cambios al filesystem</div>
                  <div>4. Journal Clear: Limpiar entrada</div>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  ✅ Sistema siempre en estado consistente (S₀ o S₁)
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Propiedades ACID:</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Atomicidad:</strong> La transacción se aplica completamente o no se aplica</li>
                  <li><strong>Consistencia:</strong> El sistema siempre está en estado válido</li>
                  <li><strong>Durabilidad:</strong> Si T está committed, sobrevive a fallos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Diagrama Visual */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Comparación Visual</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-red-300 p-4 rounded">
                <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Sin Journaling
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-blue-200 p-2 rounded text-center">App</div>
                    <span>→</span>
                    <div className="w-16 bg-yellow-200 p-2 rounded text-center">Cache</div>
                    <span>→</span>
                    <div className="w-16 bg-green-200 p-2 rounded text-center">Disco</div>
                  </div>
                  <div className="text-center text-red-600 font-bold mt-4">
                    ⚡ FALLO = 💥 CORRUPCIÓN
                  </div>
                </div>
              </div>

              <div className="border-2 border-green-300 p-4 rounded">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Con Journaling
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 bg-blue-200 p-2 rounded text-center text-xs">App</div>
                    <span>→</span>
                    <div className="w-12 bg-yellow-200 p-2 rounded text-center text-xs">Cache</div>
                    <span>→</span>
                    <div className="w-16 bg-purple-200 p-2 rounded text-center text-xs">Journal</div>
                    <span>→</span>
                    <div className="w-12 bg-green-200 p-2 rounded text-center text-xs">Disco</div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="text-center text-green-600">⚡ FALLO → Rollback/Replay</div>
                    <div className="text-center text-green-600 font-bold">✅ Sistema Consistente</div>
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Tipos de Journaling (ext3/ext4)</h3>
            
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
                  className={`border-2 p-4 rounded-lg cursor-pointer transition-all ${
                    journalingMode === mode
                      ? `border-${color}-500 bg-${color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setJournalingMode(mode as any)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-lg">{name}</h4>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Overhead: <strong>{overhead}</strong></div>
                      <div className="text-sm text-gray-600">Seguridad: <strong>{security}</strong></div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{description}</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Fórmula de Overhead */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Ecuación de Overhead</h3>
            <div className="bg-gray-50 p-4 rounded font-mono text-center mb-4">
              Overhead = (Escrituras_Journal / Escrituras_Totales) × 100
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600">Journal mode</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">15-20%</div>
                <div className="text-sm text-gray-600">Ordered mode</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded">
                <div className="text-2xl font-bold text-yellow-600">5-10%</div>
                <div className="text-sm text-gray-600">Writeback mode</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Tab */}
      {activeTab === 'demo' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Simulación: Crear archivo "nota.txt"</h3>
            
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
                    } ${step.id === failurePoint ? 'ring-4 ring-red-500' : ''}`}
                  >
                    {step.id === failurePoint ? '⚡' : step.id + 1}
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
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
              <h4 className="font-bold text-lg mb-1">{simulationSteps[simulationStep].title}</h4>
              <p className="text-gray-700">{simulationSteps[simulationStep].description}</p>
            </div>

            {/* Failure Info */}
            {failurePoint !== null && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
                <h4 className="font-bold text-red-700 flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Fallo Simulado en Paso {failurePoint + 1}
                </h4>
                <p className="text-gray-700 mb-2">
                  <strong>Acción de Recuperación:</strong>
                </p>
                <p className="text-gray-700">{getRecoveryAction(failurePoint)}</p>
              </div>
            )}

            {/* Controls */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleSimulationStep('prev')}
                disabled={simulationStep === 0}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Anterior
              </button>
              <button
                onClick={() => handleSimulationStep('next')}
                disabled={simulationStep === simulationSteps.length - 1}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente →
              </button>
              <button
                onClick={simulateFailure}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
              >
                <Zap className="w-4 h-4 mr-2" />
                Simular Fallo
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Reiniciar
              </button>
            </div>
          </div>

          {/* Recovery Table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Tabla de Recuperación</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Fallo en Fase</th>
                    <th className="p-3 text-left">Estado del Journal</th>
                    <th className="p-3 text-left">Acción de Recuperación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">Fase 1 (antes de commit)</td>
                    <td className="p-3">Transacción incompleta</td>
                    <td className="p-3 text-yellow-600">Ignorar transacción, rollback</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Fase 2 (datos)</td>
                    <td className="p-3">Commit OK, datos parciales</td>
                    <td className="p-3 text-blue-600">Reescribir datos</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Fase 3 (checkpoint)</td>
                    <td className="p-3">Commit OK</td>
                    <td className="p-3 text-green-600">Replay: aplicar ops del journal</td>
                  </tr>
                  <tr>
                    <td className="p-3">Fase 4 (limpieza)</td>
                    <td className="p-3">Todo completo</td>
                    <td className="p-3 text-green-600">No hacer nada</td>
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Comparación de Rendimiento</h3>
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Tiempo de Recuperación</h3>
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Ejemplo Numérico: Escribir 1GB en 1000 archivos</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-2 border-gray-300 p-4 rounded">
                <h4 className="font-semibold mb-2">Sin Journaling</h4>
                <div className="text-sm space-y-1 text-gray-700">
                  <div>Escrituras directas:</div>
                  <div className="font-mono bg-gray-50 p-2 rounded">1000 ops × 10ms = 10s</div>
                </div>
              </div>
              <div className="border-2 border-green-300 p-4 rounded">
                <h4 className="font-semibold mb-2">Ordered Mode ⭐</h4>
                <div className="text-sm space-y-1 text-gray-700">
                  <div>1. Datos: 1000 × 10ms = 10s</div>
                  <div>2. Journal: 1000 × 2ms = 2s</div>
                  <div>3. Checkpoint: 1000 × 2ms = 2s</div>
                  <div className="font-mono bg-green-50 p-2 rounded font-bold">Total: 14s (40% overhead)</div>
                </div>
              </div>
              <div className="border-2 border-blue-300 p-4 rounded">
                <h4 className="font-semibold mb-2">Journal Mode</h4>
                <div className="text-sm space-y-1 text-gray-700">
                  <div>1. Journal: 1000 × 10ms = 10s</div>
                  <div>2. Checkpoint: 1000 × 10ms = 10s</div>
                  <div className="font-mono bg-blue-50 p-2 rounded font-bold">Total: 20s (100% overhead)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulas */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Fórmulas Importantes</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-2">Tiempo de Recuperación</h4>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm mb-2">
                  T_recuperación = T_scan_journal + T_replay
                </div>
                <div className="text-sm text-gray-600">
                  <div>Donde:</div>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>T_scan_journal = n_transacciones × t_lectura</li>
                    <li>T_replay = n_ops_pendientes × t_aplicar_op</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-2">Probabilidad de Corrupción</h4>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm mb-2">
                  P(corrupción) = P(fallo) × P(inconsistente | fallo)
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Sin journaling:</strong> P ≈ 75% (para 4 operaciones)</div>
                  <div><strong>Con journaling:</strong> P ≈ 0% (si journal committed)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Experiment Proposal */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-4">
              <Terminal className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold">Propuesta de Experimentación</h3>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
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