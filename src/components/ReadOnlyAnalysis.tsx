import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Zap,
  HardDrive,
  FileText,
  Database,
  Terminal,
  BookOpen,
  BarChart3,
  Archive
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReadOnlyAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'theory' | 'types' | 'squashfs' | 'performance'>('theory');

  // Datos de comparación de compresión
  const compressionData = [
    { tipo: 'Original', tamaño: 100, color: '#ef4444' },
    { tipo: 'gzip', tamaño: 40, color: '#3b82f6' },
    { tipo: 'xz', tamaño: 30, color: '#8b5cf6' },
    { tipo: 'lz4', tamaño: 52, color: '#10b981' },
  ];

  // Datos de rendimiento
  const performanceData = [
    { filesystem: 'ext4', lectura: 450, escritura: 400, memoria: 15 },
    { filesystem: 'SquashFS (gzip)', lectura: 280, escritura: 0, memoria: 35 },
    { filesystem: 'SquashFS (lz4)', lectura: 420, escritura: 0, memoria: 32 },
    { filesystem: 'ISO 9660', lectura: 500, escritura: 0, memoria: 10 },
  ];

  // Datos de comparación de filesystems
  const filesystemComparison = [
    {
      name: 'SquashFS',
      compression: 'gzip, lzo, xz, lz4',
      blockSize: '4KB-1MB',
      useCase: 'Linux embebido, Live CD',
      maxSize: '2⁶⁴ bytes',
      efficiency: '60-70%',
    },
    {
      name: 'ISO 9660',
      compression: 'No',
      blockSize: '2KB',
      useCase: 'CD/DVD',
      maxSize: '8TB',
      efficiency: '0%',
    },
    {
      name: 'CRAMFS',
      compression: 'zlib',
      blockSize: '4KB',
      useCase: 'Dispositivos embebidos',
      maxSize: '256MB',
      efficiency: '40-50%',
    },
    {
      name: 'EROFS',
      compression: 'lz4, lzma',
      blockSize: '4KB',
      useCase: 'Android, sistemas modernos',
      maxSize: '16EB',
      efficiency: '50-60%',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h2 className="text-4xl font-display font-bold text-gray-900 mb-3 tracking-tight">
          Read-Only <span className="text-gradient">File Systems</span>
        </h2>
        <p className="text-lg text-gray-600 font-light leading-relaxed">
          Sistemas de archivos inmutables: teoría, implementación y análisis de rendimiento en producción
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-soft border border-gray-100 animate-fade-in">
        {[
          { id: 'theory', label: 'Fundamentos', icon: BookOpen },
          { id: 'types', label: 'Comparativa', icon: BarChart3 },
          { id: 'squashfs', label: 'SquashFS', icon: Archive },
          { id: 'performance', label: 'Performance', icon: Zap },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center space-x-2.5 px-6 py-3.5 font-semibold transition-all rounded-xl flex-1 justify-center group ${
              activeTab === id
                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-soft'
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
        <div className="space-y-6 animate-fade-in">
          {/* Fundamento Teórico */}
          <div className="card group">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-5">
                <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-gray-200 transition-colors">
                  <BookOpen className="w-7 h-7 text-gray-700" />
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900">¿Qué es Read-Only?</h3>
              </div>
              <p className="text-gray-700 mb-5 text-lg leading-relaxed">
                Un <strong className="text-gray-900">filesystem read-only</strong> es aquel que <strong>no permite modificaciones</strong> después 
                de su creación. Los datos se escriben una sola vez durante la construcción de la imagen y posteriormente 
                solo pueden ser leídos.
              </p>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-l-4 border-gray-600 p-5 rounded-xl shadow-inner-soft">
                <p className="text-base text-gray-800 leading-relaxed">
                  <strong className="text-gray-900">💡 Analogía:</strong> Es como un libro publicado vs un cuaderno:<br />
                  <span className="ml-6 block mt-3 space-y-2">
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span><strong>Cuaderno (Read-Write):</strong> Puedes escribir, borrar, modificar páginas</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                      <span><strong>Libro (Read-Only):</strong> Solo puedes leer, no modificar el contenido</span>
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Problema que Resuelve */}
          <div className="card group">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-5">
                <div className="p-2 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                  <Shield className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900">Problemas que Resuelve</h3>
              </div>
            
              <div className="mb-6">
                <h4 className="font-display font-semibold text-xl text-gray-900 mb-4">Desafíos en Sistemas Tradicionales:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Modificaciones accidentales de archivos críticos',
                    'Malware que modifica ejecutables',
                    'Corrupción de datos por fallos de hardware',
                    'Desperdicio de espacio en archivos estáticos',
                    'Inconsistencia en despliegues múltiples',
                  ].map((problem, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-gray-700 p-3 rounded-lg hover:bg-red-50 transition-colors">
                      <span className="text-red-500 font-bold text-xl">✗</span>
                      <span className="text-base leading-relaxed">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Solución Read-Only:</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  'Inmutabilidad garantizada',
                  'Protección contra modificaciones maliciosas',
                  'Compresión eficiente',
                  'Distribución consistente',
                  'Menor uso de memoria RAM',
                ].map((solution, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-gray-800">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-base">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modelo Matemático */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Modelo Formal de Inmutabilidad</h3>
            </div>
            
            <p className="text-gray-700 mb-4 text-base">
              Sea <strong>F</strong> un sistema de archivos con conjunto de operaciones <strong>O</strong>:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-gray-900 text-lg">Sistema Read-Write tradicional:</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm text-gray-800 space-y-1">
                  <div>F_rw: O → {'{permitido, denegado}'}</div>
                  <div>F_rw(read) = permitido</div>
                  <div>F_rw(write) = permitido</div>
                  <div>F_rw(delete) = permitido</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-gray-900 text-lg">Sistema Read-Only:</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm text-gray-800 space-y-1">
                  <div>F_ro: O → {'{permitido, denegado}'}</div>
                  <div>F_ro(read) = permitido</div>
                  <div className="text-red-600">F_ro(write) = denegado</div>
                  <div className="text-red-600">F_ro(delete) = denegado</div>
                  <div className="text-red-600">F_ro(modify) = denegado</div>
                  <div className="text-red-600">F_ro(create) = denegado</div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2 text-lg">Invarianza Temporal:</h4>
              <div className="bg-white p-3 rounded font-mono text-sm text-gray-800 mb-2">
                Estado(t₀) = Estado(t₁) = Estado(tₙ)
              </div>
              <p className="text-gray-800 text-base">
                El contenido del filesystem es <strong>idéntico</strong> en cualquier momento.
              </p>
            </div>
          </div>

          {/* Comparación Visual */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Comparación Visual</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-blue-300 p-4 rounded-xl bg-blue-50">
                <h4 className="font-semibold text-blue-700 mb-3 flex items-center text-lg">
                  <HardDrive className="w-5 h-5 mr-2" />
                  Read-Write (ext4)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-blue-400 p-2 rounded text-center font-semibold text-gray-900 text-xs">App</div>
                    <span className="text-gray-700 font-bold">→</span>
                    <div className="w-16 bg-yellow-400 p-2 rounded text-center font-semibold text-gray-900 text-xs">Cache</div>
                    <span className="text-gray-700 font-bold">→</span>
                    <div className="w-16 bg-green-400 p-2 rounded text-center font-semibold text-gray-900 text-xs">Disco</div>
                  </div>
                  <div className="mt-3 space-y-1 text-base">
                    <div className="text-green-700">✓ Modificar: Permitido</div>
                    <div className="text-green-700">✓ Escribir: Permitido</div>
                    <div className="text-yellow-700">⚠ Corrupción: Posible</div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-300 p-4 rounded-xl bg-gray-50">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center text-lg">
                  <Lock className="w-5 h-5 mr-2" />
                  Read-Only (SquashFS)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-12 bg-blue-400 p-2 rounded text-center text-xs font-semibold text-gray-900">App</div>
                    <span className="text-gray-700 font-bold text-xs">→</span>
                    <div className="w-12 bg-purple-400 p-2 rounded text-center text-xs font-semibold text-gray-900">Decomp</div>
                    <span className="text-gray-700 font-bold text-xs">→</span>
                    <div className="w-12 bg-yellow-400 p-2 rounded text-center text-xs font-semibold text-gray-900">Buffer</div>
                    <span className="text-gray-700 font-bold text-xs">→</span>
                    <div className="w-12 bg-green-400 p-2 rounded text-center text-xs font-semibold text-gray-900">Disco</div>
                  </div>
                  <div className="mt-3 space-y-1 text-base">
                    <div className="text-green-700">✓ Leer: Permitido</div>
                    <div className="text-red-700">✗ Modificar: EROFS</div>
                    <div className="text-green-700">✓ Inmutable: Garantizado</div>
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
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Comparación de Filesystems Read-Only</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left text-gray-900 font-semibold">Filesystem</th>
                    <th className="p-4 text-left text-gray-900 font-semibold">Compresión</th>
                    <th className="p-4 text-left text-gray-900 font-semibold">Tamaño Bloque</th>
                    <th className="p-4 text-left text-gray-900 font-semibold">Uso Típico</th>
                    <th className="p-4 text-left text-gray-900 font-semibold">Eficiencia</th>
                  </tr>
                </thead>
                <tbody>
                  {filesystemComparison.map((fs, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="p-4 font-semibold text-gray-900">{fs.name}</td>
                      <td className="p-4 text-gray-700 text-sm">{fs.compression}</td>
                      <td className="p-4 text-gray-700 text-sm">{fs.blockSize}</td>
                      <td className="p-4 text-gray-700 text-sm">{fs.useCase}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          parseInt(fs.efficiency) > 50 
                            ? 'bg-green-100 text-green-800'
                            : parseInt(fs.efficiency) > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {fs.efficiency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fórmula de Compresión */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Fórmula de Compresión</h3>
            
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4 text-gray-800">
              Ratio = Tamaño_Original / Tamaño_Comprimido
            </div>

            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="text-lg font-semibold text-gray-900">Ejemplo práctico:</div>
                <div className="text-gray-700 mt-2 space-y-1 text-base">
                  <div>Tamaño original: <strong>1000 MB</strong></div>
                  <div>Tamaño comprimido (SquashFS): <strong>400 MB</strong></div>
                  <div>Ratio: <strong>1000/400 = 2.5×</strong></div>
                  <div className="text-green-700 font-semibold">Reducción: 60%</div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Eficiencia por Tipo de Archivo:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-gray-800 text-base">
                  <div>• Archivos de texto: <strong>70-80%</strong></div>
                  <div>• Archivos binarios: <strong>20-40%</strong></div>
                  <div>• Archivos multimedia: <strong>5-10%</strong></div>
                  <div>• Promedio mixto: <strong>50-60%</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfica de Compresión */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Comparación de Compresión</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={compressionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis label={{ value: 'Tamaño (MB)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="tamaño" fill="#6b7280" name="Tamaño (MB)">
                  {compressionData.map((entry, index) => (
                    <Bar key={`bar-${index}`} dataKey="tamaño" fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center text-gray-700 text-base">
              Dataset: 100MB de archivos mixtos (texto + binarios)
            </div>
          </div>
        </div>
      )}

      {/* SquashFS Tab */}
      {activeTab === 'squashfs' && (
        <div className="space-y-6">
          {/* Arquitectura Interna */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Archive className="w-6 h-6 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-900">Arquitectura Interna de SquashFS</h3>
            </div>
            
            <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 font-mono text-sm text-gray-800">
              <div className="space-y-2">
                {[
                  { title: 'Superblock (96 bytes)', desc: 'Versión, compresión, tamaño bloques' },
                  { title: 'Índice de Inodos', desc: 'Metadata de archivos/directorios' },
                  { title: 'Índice de Directorios', desc: 'Estructura jerárquica' },
                  { title: 'Tabla de Fragmentos', desc: 'Archivos pequeños agrupados' },
                  { title: 'Datos Comprimidos', desc: 'Contenido real de archivos' },
                  { title: 'Índice de UID/GID', desc: 'Usuarios/grupos únicos' },
                ].map((section, idx) => (
                  <div key={idx} className="border-l-4 border-orange-500 pl-3 py-2 bg-white rounded">
                    <div className="font-bold text-gray-900">{section.title}</div>
                    <div className="text-gray-600 text-xs">{section.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Algoritmo de Compresión */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Algoritmo de Compresión</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">Proceso de Escritura:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-800 text-base">
                  <li>Entrada: Archivo de N bytes</li>
                  <li>Dividir en bloques de B bytes (ej: 128KB)</li>
                  <li>Para cada bloque:
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                      <li>Comprimir con algoritmo A (gzip/xz/lz4)</li>
                      <li>Si C_bloque {'<'} B: guardar comprimido</li>
                      <li>Si C_bloque ≥ B: guardar sin comprimir</li>
                    </ul>
                  </li>
                  <li>Crear índice de bloques</li>
                  <li>Escribir metadata</li>
                </ol>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 text-lg">Ejemplo Numérico:</h4>
                <div className="text-gray-800 text-base space-y-2">
                  <div><strong>Archivo:</strong> 500KB dividido en 4 bloques de 128KB</div>
                  <div className="ml-4 space-y-1 text-sm">
                    <div>Bloque 1 (texto): 128KB → <strong>30KB</strong> (23% compresión)</div>
                    <div>Bloque 2 (texto): 128KB → <strong>35KB</strong> (27% compresión)</div>
                    <div>Bloque 3 (binario): 128KB → <strong>120KB</strong> (94% compresión)</div>
                    <div>Bloque 4 (binario): 116KB → <strong>110KB</strong> (95% compresión)</div>
                  </div>
                  <div className="pt-2 border-t border-blue-300">
                    <strong>Tamaño final:</strong> 30 + 35 + 120 + 110 + 5 (metadata) = <strong className="text-blue-700">300KB</strong>
                  </div>
                  <div className="text-green-700 font-semibold">Reducción: 40% del tamaño original</div>
                </div>
              </div>
            </div>
          </div>

          {/* Comando Práctico */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Terminal className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Ejemplo Práctico</h3>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto border-2 border-gray-700">
              <div className="space-y-2">
                <div className="text-gray-400"># 1. Crear imagen SquashFS con gzip</div>
                <div>mksquashfs rootfs/ rootfs.sqfs.gz \</div>
                <div>  -comp gzip \</div>
                <div>  -b 128K \</div>
                <div>  -no-xattrs</div>
                
                <div className="mt-3 text-gray-400"># 2. Montar como read-only</div>
                <div>sudo mount -t squashfs -o ro,loop rootfs.sqfs.gz /mnt/squash</div>
                
                <div className="mt-3 text-gray-400"># 3. Intentar modificar (fallará)</div>
                <div>touch /mnt/squash/test.txt</div>
                <div className="text-red-400"># Error: Read-only file system</div>
              </div>
            </div>
          </div>

          {/* Casos de Uso */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Casos de Uso Principales</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Live CD/USB',
                  icon: <HardDrive className="w-8 h-8 text-blue-600" />,
                  points: ['Sistema operativo completo', 'Distribución inmutable', 'Arranque rápido'],
                },
                {
                  title: 'Sistemas Embebidos',
                  icon: <Zap className="w-8 h-8 text-yellow-600" />,
                  points: ['IoT devices', 'Routers', 'Menor uso de flash'],
                },
                {
                  title: 'Contenedores Docker',
                  icon: <Database className="w-8 h-8 text-purple-600" />,
                  points: ['Capas más pequeñas', 'Distribución eficiente', 'Inmutabilidad garantizada'],
                },
                {
                  title: 'Snapshots del Sistema',
                  icon: <FileText className="w-8 h-8 text-green-600" />,
                  points: ['Backups comprimidos', 'Recuperación rápida', 'Integridad garantizada'],
                },
              ].map((useCase, idx) => (
                <div key={idx} className="border-2 border-gray-200 p-4 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    {useCase.icon}
                    <h4 className="font-bold text-lg text-gray-900">{useCase.title}</h4>
                  </div>
                  <ul className="space-y-1 text-gray-700 text-base">
                    {useCase.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Comparación de Rendimiento */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Comparación de Rendimiento</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="filesystem" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lectura" fill="#3b82f6" name="Lectura (MB/s)" />
                <Bar dataKey="memoria" fill="#ef4444" name="Memoria (MB)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Fórmulas de Rendimiento */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Fórmulas de Rendimiento</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-semibold mb-2 text-blue-800 text-lg">Tiempo de Acceso</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mb-2 text-gray-800">
                  T_acceso_ro = T_descompresión + T_lectura_disco
                </div>
                <div className="text-base text-gray-700 space-y-1">
                  <div>Para bloques de 128KB con gzip:</div>
                  <div className="ml-4">T_descompresión ≈ 2-5ms por bloque</div>
                  <div className="ml-4">T_lectura_disco ≈ 5-10ms (HDD) o 0.1ms (SSD)</div>
                  <div className="mt-2 font-semibold">T_total ≈ 7-15ms (HDD) o 2-5ms (SSD)</div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-semibold mb-2 text-green-800 text-lg">Throughput Efectivo</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mb-2 text-gray-800">
                  Throughput = min(Velocidad_Disco, Velocidad_Descompresión)
                </div>
                <div className="text-base text-gray-700 space-y-1">
                  <div>Para SSD a 500 MB/s:</div>
                  <div className="ml-4">• Con gzip: Throughput = min(500, 100) = <strong>100 MB/s</strong></div>
                  <div className="ml-4">• Con lz4: Throughput = min(500, 800) = <strong>500 MB/s</strong></div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h4 className="font-semibold mb-2 text-purple-800 text-lg">Uso de Memoria</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mb-2 text-gray-800">
                  Memoria = Cache_Bloques + Buffer_Descompresión
                </div>
                <div className="text-base text-gray-700 space-y-1">
                  <div>Para bloques de 128KB:</div>
                  <div className="ml-4">Cache = 256 bloques × 128KB = <strong>32 MB</strong></div>
                  <div className="ml-4">Buffer = 2 × 128KB = <strong>256 KB</strong></div>
                  <div className="mt-2 font-semibold">Total ≈ 32.25 MB por punto de montaje</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Trade-offs */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ventajas vs Desventajas</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left text-gray-900 font-semibold">Métrica</th>
                    <th className="p-4 text-left text-gray-900 font-semibold">Read-Write (ext4)</th>
                    <th className="p-4 text-left text-gray-900 font-semibold">Read-Only (SquashFS)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'Modificaciones', rw: '∞', ro: '0', roGood: false },
                    { metric: 'Compresión', rw: 'No', ro: '50-70%', roGood: true },
                    { metric: 'Velocidad lectura', rw: '100%', ro: '70-90%', roGood: false },
                    { metric: 'Uso memoria', rw: '10-20 MB', ro: '30-50 MB', roGood: false },
                    { metric: 'Integridad', rw: 'Media', ro: 'Alta', roGood: true },
                    { metric: 'Fragmentación', rw: 'Alta', ro: 'Cero', roGood: true },
                    { metric: 'Tiempo boot', rw: '5-10s', ro: '2-4s', roGood: true },
                    { metric: 'Seguridad', rw: 'Vulnerable', ro: 'Inmune', roGood: true },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="p-4 font-semibold text-gray-900">{row.metric}</td>
                      <td className="p-4 text-gray-700">{row.rw}</td>
                      <td className={`p-4 font-medium ${row.roGood ? 'text-green-700' : 'text-gray-700'}`}>
                        {row.ro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Experimento Numérico */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Experimento: 10,000 Archivos Pequeños</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-blue-300 p-5 rounded-xl bg-blue-50">
                <h4 className="font-semibold mb-3 text-blue-900 text-lg">ext4 (Read-Write)</h4>
                <div className="space-y-2 text-base text-gray-800">
                  <div>Dataset: 10,000 archivos × 5KB = <strong>50 MB</strong></div>
                  <div className="border-t border-blue-200 pt-2 mt-2">
                    <div>Tamaño en disco: <strong className="text-blue-700">80 MB</strong></div>
                    <div className="text-sm text-gray-600">(overhead de inodos)</div>
                  </div>
                  <div>Bloques usados: <strong>20,000</strong> (4KB c/u)</div>
                  <div>Fragmentación: <strong className="text-red-600">Alta</strong></div>
                  <div className="border-t border-blue-200 pt-2 mt-2">
                    Tiempo lectura total: <strong>2.5 segundos</strong>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-300 p-5 rounded-xl bg-gray-50">
                <h4 className="font-semibold mb-3 text-gray-900 text-lg">SquashFS (Read-Only)</h4>
                <div className="space-y-2 text-base text-gray-800">
                  <div>Dataset: 10,000 archivos × 5KB = <strong>50 MB</strong></div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div>Tamaño en disco: <strong className="text-green-700">18 MB</strong></div>
                    <div className="text-sm text-gray-600">(comprimido + packing)</div>
                  </div>
                  <div className="text-green-700 font-semibold">Reducción: 77.5%</div>
                  <div>Fragmentación: <strong className="text-green-600">Cero</strong></div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    Tiempo lectura total: <strong>1.8 segundos</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <p className="text-green-800 font-semibold text-base">
                SquashFS es más eficiente en archivos pequeños debido al packing de fragmentos, 
                resultando en menos seeks de disco y mejor uso del espacio.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOnlyAnalysis;