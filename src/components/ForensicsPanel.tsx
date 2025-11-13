import React, { useState } from 'react';
import {
  Search,
  AlertTriangle,
  Clock,
  Shield,
  FileText,
  Database,
  Terminal,
  BookOpen,
  HardDrive,
  Activity,
  Zap,
  Lock
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ForensicsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'theory' | 'lifecycle' | 'recovery' | 'timeline'>('theory');
  const [deletionStep, setDeletionStep] = useState(0);

  // Datos de probabilidad de recuperación por tiempo
  const recoveryProbability = [
    { tiempo: '< 1 min', total: 98, parcial: 99 },
    { tiempo: '< 1 hora', total: 80, parcial: 95 },
    { tiempo: '< 1 día', total: 50, parcial: 80 },
    { tiempo: '< 1 semana', total: 20, parcial: 50 },
    { tiempo: '> 1 mes', total: 3, parcial: 10 },
  ];

  // Datos de técnicas forenses
  const forensicTechniques = [
    { name: 'Metadata Recovery', exito: 85, tiempo: 5, complejidad: 'Baja' },
    { name: 'File Carving', exito: 60, tiempo: 30, complejidad: 'Media' },
    { name: 'Journal Analysis', exito: 75, tiempo: 15, complejidad: 'Media' },
    { name: 'Slack Space', exito: 35, tiempo: 10, complejidad: 'Baja' },
  ];

  // Datos del ciclo de vida
  const lifecycleStages = [
    {
      id: 0,
      stage: 'ACTIVO',
      status: 'success',
      details: [
        'Inodo válido',
        'Entrada en directorio',
        'Bloques marcados como usados',
        'Datos en disco',
      ],
    },
    {
      id: 1,
      stage: 'BORRADO',
      status: 'warning',
      details: [
        'Inodo marcado libre',
        'Entrada directorio removida',
        'Bloques marcados libres',
        'Datos SIGUEN en disco (RECUPERABLE)',
      ],
    },
    {
      id: 2,
      stage: 'SOBRESCRITO PARCIAL',
      status: 'danger',
      details: [
        'Algunos bloques reutilizados',
        'Metadatos parcialmente válidos',
        'Datos parciales en disco',
      ],
    },
    {
      id: 3,
      stage: 'SOBRESCRITO COMPLETO',
      status: 'critical',
      details: [
        'Inodo reutilizado',
        'Bloques completamente sobrescritos',
        'Datos irrecuperables',
      ],
    },
  ];

  // Datos de distribución de técnicas
  const techniqueDistribution = [
    { name: 'Metadata', value: 35, color: '#3b82f6' },
    { name: 'Carving', value: 25, color: '#10b981' },
    { name: 'Journal', value: 30, color: '#8b5cf6' },
    { name: 'Slack', value: 10, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h2 className="text-4xl font-display font-bold text-gray-900 mb-3 tracking-tight">
          File System <span className="text-gradient">Forensics</span>
        </h2>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          Análisis forense profesional: recuperación de datos borrados, timeline reconstruction y técnicas avanzadas de carving
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-soft border border-gray-100 animate-fade-in">
        {[
          { id: 'theory', label: 'Fundamentos', icon: BookOpen },
          { id: 'lifecycle', label: 'Ciclo de Vida', icon: Activity },
          { id: 'recovery', label: 'Recuperación', icon: Search },
          { id: 'timeline', label: 'Timeline', icon: Clock },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center space-x-2.5 px-6 py-3.5 font-semibold transition-all rounded-xl flex-1 justify-center group ${
              activeTab === id
                ? 'bg-gradient-to-r from-purple-600 to-accent-600 text-white shadow-soft'
                : 'text-gray-700 hover:bg-gray-50 hover:shadow-inner-soft'
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform ${activeTab !== id ? 'group-hover:scale-110' : ''}`} />
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
              <BookOpen className="w-6 h-6 text-slate-700" />
              <h3 className="text-2xl font-bold text-gray-900">¿Qué es el Borrado de Archivos?</h3>
            </div>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Cuando "borras" un archivo, el sistema operativo <strong>NO elimina los datos del disco</strong>. 
              Solo marca el espacio como disponible y elimina las referencias en las estructuras de metadatos.
            </p>
            <div className="bg-slate-50 border-l-4 border-slate-500 p-4 rounded-lg">
              <p className="text-base text-gray-800 leading-relaxed">
                <strong>Analogía:</strong> Es como arrancar la portada de un libro en una biblioteca:<br />
                <span className="ml-4 block mt-2 space-y-1">
                  <span className="block">• El libro sigue en el estante (datos en disco)</span>
                  <span className="block">• Ya no aparece en el catálogo (entrada de directorio eliminada)</span>
                  <span className="block">• Alguien puede encontrarlo físicamente (recuperación forense)</span>
                  <span className="block">• Con el tiempo, otro libro puede ocupar ese espacio (sobrescritura)</span>
                </span>
              </p>
            </div>
          </div>

          {/* Modelo Matemático */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Modelo Formal de Recuperación</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-gray-900 text-lg">Estados del Sistema:</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                    <div className="font-semibold text-green-900 mb-1">Estado ACTIVO</div>
                    <div className="font-mono text-xs text-gray-700">
                      S_activo = {'{I_válido, E_presente,'}
                      <br />
                      {'           D_asignado, C_íntegro}'}
                    </div>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                    <div className="font-semibold text-yellow-900 mb-1">Estado BORRADO</div>
                    <div className="font-mono text-xs text-gray-700">
                      S_borrado = {'{I_libre, E_ausente,'}
                      <br />
                      {'            D_libre, C_presente}'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2 text-lg">Probabilidad de Recuperación:</h4>
                <div className="bg-white p-3 rounded font-mono text-sm text-gray-800 mb-2">
                  P(recuperación) = P(I_recuperable) × P(D_recuperable) × P(C_íntegro)
                </div>
                <div className="text-base text-gray-700">
                  <div className="mb-2"><strong>Modelo temporal:</strong></div>
                  <div className="font-mono text-sm bg-white p-2 rounded mb-2">
                    P(D_recuperable | tiempo=t) = e^(-λt)
                  </div>
                  <div className="text-sm space-y-1">
                    <div>Donde λ = tasa de escritura del sistema</div>
                    <div className="mt-2 border-t pt-2">
                      <strong>Ejemplo:</strong> Sistema con 100 MB/s de escritura, disco de 100 GB
                    </div>
                    <div className="ml-4">λ = 100 MB/s / 100,000 MB = 0.001/s</div>
                    <div className="ml-4 text-green-700">P(1 minuto) = e^(-0.001 × 60) ≈ 94.2%</div>
                    <div className="ml-4 text-red-700">P(1 hora) = e^(-0.001 × 3600) ≈ 2.7%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estructura de Inodo */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <HardDrive className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Anatomía de ext4 para Forense</h3>
            </div>

            <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-900 font-bold mb-2">struct ext4_inode {'{'}</div>
              <div className="ml-4 space-y-1 text-gray-700">
                <div>__u16   i_mode;          <span className="text-gray-500">// Permisos y tipo</span></div>
                <div>__u32   i_size;          <span className="text-gray-500">// Tamaño en bytes</span></div>
                <div>__u32   i_atime;         <span className="text-gray-500">// Tiempo de acceso</span></div>
                <div>__u32   i_ctime;         <span className="text-gray-500">// Tiempo de cambio</span></div>
                <div>__u32   i_mtime;         <span className="text-gray-500">// Tiempo de modificación</span></div>
                <div className="text-red-600">__u32   i_dtime;         <span className="text-red-700">// ⭐ Tiempo de BORRADO</span></div>
                <div>__u16   i_links_count;   <span className="text-gray-500">// Número de hard links</span></div>
                <div className="text-blue-600">__u32   i_block[15];     <span className="text-blue-700">// ⭐ Punteros a bloques</span></div>
              </div>
              <div className="text-gray-900 font-bold mt-2">{'};'}</div>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <div className="font-semibold text-red-900 mb-1">i_dtime (Deletion Time)</div>
                <div className="text-sm text-gray-700">Timestamp de cuándo fue borrado el archivo</div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <div className="font-semibold text-blue-900 mb-1">i_block (Block Pointers)</div>
                <div className="text-sm text-gray-700">Punteros a bloques de datos (pueden persistir)</div>
              </div>
            </div>
          </div>

          {/* Gráfica de Probabilidad */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Probabilidad de Recuperación por Tiempo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={recoveryProbability}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tiempo" />
                <YAxis label={{ value: 'Probabilidad (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#ef4444" strokeWidth={2} name="Recuperación Total" />
                <Line type="monotone" dataKey="parcial" stroke="#10b981" strokeWidth={2} name="Recuperación Parcial" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center text-gray-700 text-base">
              La probabilidad de recuperación disminuye exponencialmente con el tiempo
            </div>
          </div>
        </div>
      )}

      {/* Lifecycle Tab */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-6">
          {/* Ciclo de Vida */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ciclo de Vida Forense de un Archivo</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {lifecycleStages.map((stage) => (
                <div
                  key={stage.id}
                  onClick={() => setDeletionStep(stage.id)}
                  className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                    deletionStep === stage.id
                      ? 'border-slate-600 shadow-lg'
                      : 'border-gray-300 hover:border-gray-400'
                  } ${
                    stage.status === 'success' ? 'bg-green-50' :
                    stage.status === 'warning' ? 'bg-yellow-50' :
                    stage.status === 'danger' ? 'bg-orange-50' :
                    'bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-bold text-lg ${
                      stage.status === 'success' ? 'text-green-800' :
                      stage.status === 'warning' ? 'text-yellow-800' :
                      stage.status === 'danger' ? 'text-orange-800' :
                      'text-red-800'
                    }`}>
                      {stage.id + 1}. {stage.stage}
                    </span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {stage.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border-l-4 border-slate-600 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-2 text-lg">
                Estado Actual: {lifecycleStages[deletionStep].stage}
              </h4>
              <p className="text-gray-800 text-base">
                {deletionStep === 0 && 'El archivo está completamente activo y accesible. Todos los metadatos y datos están intactos.'}
                {deletionStep === 1 && 'El archivo ha sido borrado, pero los datos permanecen en disco. Alta probabilidad de recuperación exitosa.'}
                {deletionStep === 2 && 'Algunos bloques han sido sobrescritos. Recuperación parcial posible con técnicas avanzadas.'}
                {deletionStep === 3 && 'Los datos han sido completamente sobrescritos. Recuperación prácticamente imposible sin técnicas especializadas.'}
              </p>
            </div>
          </div>

          {/* Diagrama Visual */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Proceso de Borrado Visual</h3>
            
            <div className="space-y-4">
              {/* Archivo Activo */}
              <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
                <div className="font-semibold text-green-800 mb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Archivo Activo: documento.txt
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="bg-green-200 p-2 rounded text-center">Inodo: 1250</div>
                  <div className="bg-green-200 p-2 rounded text-center">Directorio: ✓</div>
                  <div className="bg-green-200 p-2 rounded text-center">Bloques: Usados</div>
                  <div className="bg-green-200 p-2 rounded text-center">Datos: Disco</div>
                </div>
              </div>

              {/* rm comando */}
              <div className="flex justify-center">
                <div className="bg-gray-800 text-green-400 px-6 py-2 rounded-lg font-mono">
                  $ rm documento.txt
                </div>
              </div>

              {/* Archivo Borrado */}
              <div className="border-2 border-yellow-500 rounded-lg p-4 bg-yellow-50">
                <div className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Archivo Borrado (Recuperable)
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="bg-red-200 p-2 rounded text-center">Inodo: Libre</div>
                  <div className="bg-red-200 p-2 rounded text-center">Directorio: ✗</div>
                  <div className="bg-red-200 p-2 rounded text-center">Bloques: Libres</div>
                  <div className="bg-green-200 p-2 rounded text-center font-bold">Datos: DISCO ✓</div>
                </div>
              </div>

              {/* Actividad del Sistema */}
              <div className="flex justify-center">
                <div className="bg-blue-50 border-2 border-blue-300 px-6 py-2 rounded-lg text-blue-800 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Sistema escribe nuevos archivos...
                </div>
              </div>

              {/* Archivo Sobrescrito */}
              <div className="border-2 border-red-500 rounded-lg p-4 bg-red-50">
                <div className="font-semibold text-red-800 mb-2 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Archivo Sobrescrito (Irrecuperable)
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="bg-red-300 p-2 rounded text-center">Inodo: Reutilizado</div>
                  <div className="bg-red-300 p-2 rounded text-center">Directorio: ✗</div>
                  <div className="bg-red-300 p-2 rounded text-center">Bloques: Nuevos</div>
                  <div className="bg-red-300 p-2 rounded text-center font-bold">Datos: PERDIDOS ✗</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recovery Tab */}
      {activeTab === 'recovery' && (
        <div className="space-y-6">
          {/* Técnicas de Recuperación */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Técnicas de Recuperación Forense</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Método 1: Metadata Recovery */}
              <div className="border-2 border-blue-300 rounded-xl p-5 bg-blue-50">
                <div className="flex items-center space-x-3 mb-3">
                  <Database className="w-6 h-6 text-blue-600" />
                  <h4 className="font-bold text-lg text-blue-900">Metadata Recovery</h4>
                </div>
                <p className="text-gray-700 mb-3 text-base">
                  Recuperación usando información del inodo borrado
                </p>
                <div className="bg-white p-3 rounded border border-blue-200 mb-3">
                  <div className="text-sm space-y-1 font-mono text-gray-800">
                    <div>1. Leer inodo desde disco</div>
                    <div>2. Verificar i_links_count == 0</div>
                    <div>3. Extraer i_block[] punteros</div>
                    <div>4. Leer datos de bloques</div>
                    <div>5. Reconstruir archivo</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700 font-semibold">Tasa éxito: 70-95%</span>
                  <span className="text-blue-700">Complejidad: O(n)</span>
                </div>
              </div>

              {/* Método 2: File Carving */}
              <div className="border-2 border-green-300 rounded-xl p-5 bg-green-50">
                <div className="flex items-center space-x-3 mb-3">
                  <Search className="w-6 h-6 text-green-600" />
                  <h4 className="font-bold text-lg text-green-900">File Carving</h4>
                </div>
                <p className="text-gray-700 mb-3 text-base">
                  Búsqueda de firmas de archivos sin metadatos
                </p>
                <div className="bg-white p-3 rounded border border-green-200 mb-3">
                  <div className="text-sm space-y-1 font-mono text-gray-800">
                    <div>1. Escanear disco bloque a bloque</div>
                    <div>2. Buscar HEADER (FF D8 FF para JPG)</div>
                    <div>3. Continuar hasta FOOTER</div>
                    <div>4. Extraer contenido</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700 font-semibold">Tasa éxito: 40-70%</span>
                  <span className="text-green-700">Complejidad: O(n)</span>
                </div>
              </div>

              {/* Método 3: Journal Analysis */}
              <div className="border-2 border-purple-300 rounded-xl p-5 bg-purple-50">
                <div className="flex items-center space-x-3 mb-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <h4 className="font-bold text-lg text-purple-900">Journal Analysis</h4>
                </div>
                <p className="text-gray-700 mb-3 text-base">
                  Recuperación desde el journal de transacciones
                </p>
                <div className="bg-white p-3 rounded border border-purple-200 mb-3">
                  <div className="text-sm space-y-1 font-mono text-gray-800">
                    <div>1. Leer journal del filesystem</div>
                    <div>2. Buscar transacciones committed</div>
                    <div>3. Extraer bloques de datos</div>
                    <div>4. Identificar contenido</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700 font-semibold">Tasa éxito: 60-85%</span>
                  <span className="text-purple-700">Complejidad: O(j)</span>
                </div>
              </div>

              {/* Método 4: Slack Space */}
              <div className="border-2 border-orange-300 rounded-xl p-5 bg-orange-50">
                <div className="flex items-center space-x-3 mb-3">
                  <HardDrive className="w-6 h-6 text-orange-600" />
                  <h4 className="font-bold text-lg text-orange-900">Slack Space Analysis</h4>
                </div>
                <p className="text-gray-700 mb-3 text-base">
                  Análisis de espacio entre EOF y fin de bloque
                </p>
                <div className="bg-white p-3 rounded border border-orange-200 mb-3">
                  <div className="text-sm space-y-1 font-mono text-gray-800">
                    <div>1. Calcular slack space</div>
                    <div>2. Extraer datos residuales</div>
                    <div>3. Analizar entropía</div>
                    <div>4. Identificar contenido</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-700 font-semibold">Tasa éxito: 20-40%</span>
                  <span className="text-orange-700">Complejidad: O(n)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparación de Técnicas */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Comparación de Técnicas</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Gráfica de Barras */}
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">Tasa de Éxito vs Tiempo</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={forensicTechniques}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="exito" fill="#3b82f6" name="Éxito (%)" />
                    <Bar dataKey="tiempo" fill="#ef4444" name="Tiempo (min)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Gráfica de Pie */}
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">Distribución de Uso</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={techniqueDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {techniqueDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Comandos Prácticos */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Terminal className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Comandos Forenses Prácticos</h3>
            </div>

            <div className="space-y-4">
              {/* extundelete */}
              <div>
                <div className="bg-gray-100 px-3 py-1 rounded-t border-b-2 border-blue-500">
                  <span className="font-semibold text-gray-900">extundelete (Metadata Recovery)</span>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-b font-mono text-sm overflow-x-auto">
                  <div className="space-y-1">
                    <div className="text-gray-400"># Listar archivos borrados</div>
                    <div>extundelete /dev/sda1 --ls --inode 2</div>
                    <div className="mt-2 text-gray-400"># Recuperar archivo por inodo</div>
                    <div>extundelete /dev/sda1 --restore-inode 12345</div>
                    <div className="mt-2 text-gray-400"># Recuperar todos los archivos borrados</div>
                    <div>extundelete /dev/sda1 --restore-all</div>
                  </div>
                </div>
              </div>

              {/* Scalpel */}
              <div>
                <div className="bg-gray-100 px-3 py-1 rounded-t border-b-2 border-green-500">
                  <span className="font-semibold text-gray-900">Scalpel (File Carving)</span>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-b font-mono text-sm overflow-x-auto">
                  <div className="space-y-1">
                    <div className="text-gray-400"># Configurar tipos de archivo</div>
                    <div>cat &gt; scalpel.conf &lt;&lt; EOF</div>
                    <div>jpg  y  10M  \xff\xd8\xff\xe0  \xff\xd9</div>
                    <div>pdf  y  10M  \x25\x50\x44\x46  %%EOF</div>
                    <div>EOF</div>
                    <div className="mt-2 text-gray-400"># Ejecutar carving</div>
                    <div>scalpel evidence.img -c scalpel.conf -o carved/</div>
                  </div>
                </div>
              </div>

              {/* debugfs */}
              <div>
                <div className="bg-gray-100 px-3 py-1 rounded-t border-b-2 border-purple-500">
                  <span className="font-semibold text-gray-900">debugfs (Análisis de Bajo Nivel)</span>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-b font-mono text-sm overflow-x-auto">
                  <div className="space-y-1">
                    <div className="text-gray-400"># Inspeccionar inodo borrado</div>
                    <div>debugfs -R "stat &lt;12345&gt;" /dev/sda1</div>
                    <div className="mt-2 text-gray-400"># Analizar journal</div>
                    <div>debugfs -R "logdump -ac" /dev/sda1 &gt; journal.txt</div>
                    <div className="mt-2 text-gray-400"># Listar directorio (incluyendo borrados)</div>
                    <div>debugfs -R "ls -d" /dev/sda1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {/* Timeline Forense */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Análisis de Timeline Forense</h3>
            </div>

            <p className="text-gray-700 mb-4 text-base">
              El análisis de timestamps permite reconstruir la actividad del usuario y detectar manipulaciones.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Timestamps Críticos:</h4>
              <div className="space-y-2 text-gray-800">
                <div className="flex items-start">
                  <span className="font-mono font-bold mr-3 text-blue-700">atime:</span>
                  <span>Tiempo de último acceso (lectura)</span>
                </div>
                <div className="flex items-start">
                  <span className="font-mono font-bold mr-3 text-green-700">mtime:</span>
                  <span>Tiempo de última modificación (contenido)</span>
                </div>
                <div className="flex items-start">
                  <span className="font-mono font-bold mr-3 text-purple-700">ctime:</span>
                  <span>Tiempo de último cambio (metadata)</span>
                </div>
                <div className="flex items-start">
                  <span className="font-mono font-bold mr-3 text-red-700">dtime:</span>
                  <span>Tiempo de borrado (solo en archivos eliminados)</span>
                </div>
              </div>
            </div>

            {/* Reglas de Coherencia */}
            <div className="bg-white border-2 border-gray-300 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Reglas de Coherencia Temporal</h4>
              
              <div className="space-y-3">
                {[
                  {
                    rule: 'mtime ≤ dtime',
                    status: 'valid',
                    description: 'Un archivo no puede modificarse después de ser borrado',
                  },
                  {
                    rule: 'atime ≤ dtime',
                    status: 'valid',
                    description: 'Un archivo no puede accederse después de ser borrado',
                  },
                  {
                    rule: 'ctime ≥ mtime',
                    status: 'valid',
                    description: 'El cambio de metadata ocurre al modificar contenido',
                  },
                  {
                    rule: 'mtime > dtime',
                    status: 'anomaly',
                    description: '⚠️ ANOMALÍA: Modificación post-borrado (manipulación)',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`border-l-4 p-3 rounded ${
                      item.status === 'valid'
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono font-bold text-gray-900">{item.rule}</span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        item.status === 'valid'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}>
                        {item.status === 'valid' ? 'Válido' : 'Anomalía'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ejemplo de Timeline */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ejemplo de Reconstrucción Temporal</h3>

            <div className="relative">
              {/* Timeline visual */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="space-y-6">
                {[
                  {
                    time: '2025-11-12 10:30:15',
                    event: 'FILE_CREATED',
                    icon: FileText,
                    color: 'blue',
                    description: 'Archivo creado: confidential.txt',
                  },
                  {
                    time: '2025-11-12 10:31:44',
                    event: 'FILE_MODIFIED',
                    icon: FileText,
                    color: 'green',
                    description: 'Contenido modificado (mtime actualizado)',
                  },
                  {
                    time: '2025-11-12 10:31:50',
                    event: 'FILE_ACCESSED',
                    icon: Search,
                    color: 'purple',
                    description: 'Archivo accedido para lectura',
                  },
                  {
                    time: '2025-11-12 10:32:05',
                    event: 'FILE_DELETED',
                    icon: AlertTriangle,
                    color: 'red',
                    description: 'Archivo borrado (dtime registrado)',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="relative pl-20">
                      <div className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center ${
                        item.color === 'blue' ? 'bg-blue-100' :
                        item.color === 'green' ? 'bg-green-100' :
                        item.color === 'purple' ? 'bg-purple-100' :
                        'bg-red-100'
                      }`}>
                        <Icon className={`w-8 h-8 ${
                          item.color === 'blue' ? 'text-blue-600' :
                          item.color === 'green' ? 'text-green-600' :
                          item.color === 'purple' ? 'text-purple-600' :
                          'text-red-600'
                        }`} />
                      </div>
                      <div className={`border-l-4 pl-4 py-2 ${
                        item.color === 'blue' ? 'border-blue-500' :
                        item.color === 'green' ? 'border-green-500' :
                        item.color === 'purple' ? 'border-purple-500' :
                        'border-red-500'
                      }`}>
                        <div className="font-mono text-sm text-gray-600">{item.time}</div>
                        <div className="font-semibold text-gray-900 text-lg">{item.event}</div>
                        <div className="text-gray-700">{item.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 bg-slate-50 border-l-4 border-slate-600 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-slate-700" />
                <span className="font-semibold text-slate-900">Análisis Forense:</span>
              </div>
              <div className="text-gray-800 space-y-1 text-base">
                <div>• Ventana de actividad: 110 segundos (10:30:15 → 10:32:05)</div>
                <div>• Timeline coherente: Todos los timestamps son lógicos</div>
                <div>• Sin anomalías detectadas: mtime {'<'} dtime ✓</div>
                <div>• Probabilidad de manipulación: <span className="text-green-700 font-bold">Baja (5%)</span></div>
              </div>
            </div>
          </div>

          {/* Detección de Anomalías */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-2xl font-bold text-gray-900">Detección de Anomalías Temporales</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Paradoja Temporal',
                  severity: 'HIGH',
                  example: 'mtime > dtime',
                  impact: 'Archivo modificado después de borrado',
                  score: -30,
                },
                {
                  title: 'Acceso Post-Borrado',
                  severity: 'HIGH',
                  example: 'atime > dtime',
                  impact: 'Archivo accedido después de borrado',
                  score: -30,
                },
                {
                  title: 'Timestamps Idénticos',
                  severity: 'LOW',
                  example: 'atime = mtime = ctime',
                  impact: 'Posible uso de comando touch',
                  score: -5,
                },
                {
                  title: 'Timestamp Futuro',
                  severity: 'HIGH',
                  example: 'timestamp > now',
                  impact: 'Manipulación del reloj del sistema',
                  score: -30,
                },
              ].map((anomaly, idx) => (
                <div
                  key={idx}
                  className={`border-2 rounded-lg p-4 ${
                    anomaly.severity === 'HIGH'
                      ? 'border-red-300 bg-red-50'
                      : 'border-yellow-300 bg-yellow-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900">{anomaly.title}</span>
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${
                      anomaly.severity === 'HIGH'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {anomaly.severity}
                    </span>
                  </div>
                  <div className="font-mono text-sm text-gray-700 mb-2">{anomaly.example}</div>
                  <div className="text-sm text-gray-700">{anomaly.impact}</div>
                  <div className="mt-2 text-sm font-semibold text-red-700">
                    Impacto en confiabilidad: {anomaly.score} puntos
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Fórmula de Score de Confiabilidad:</h4>
              <div className="font-mono text-sm bg-white p-3 rounded text-gray-800 mb-2">
                Score = 100 - Σ(impacto_anomalía_i)
              </div>
              <div className="text-gray-700 text-sm">
                Un score {'<'} 50 indica alta probabilidad de manipulación forense
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForensicsPanel;