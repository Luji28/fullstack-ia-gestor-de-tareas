/*
Autora: Lucía Jiménez Lozano
Fecha última revisión: 22/06/2026
Descripción: Front del proyecto "gestor de tareas"

Cambios futuros a tener en cuenta: 
- separar el css a un fichero aparte
- El uso de "index" está desaconsejado en su mayoría. Aquí es simple y funciona pero mejor crear un id único a cada tarea.
*/
import { useState } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const añadirTarea = () => {
    if (nuevaTarea.trim() === '') return;
    setTareas([...tareas, { texto: nuevaTarea, completada: false }]);
    setNuevaTarea('');
  };

  const toggleTarea = (index) => {
    const copia = [...tareas];
    copia[index].completada = !copia[index].completada;
    setTareas(copia);
  };

  const eliminarTarea = (index) => {
    setTareas(tareas.filter((_, i) => i !== index));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Gestor de Tareas</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && añadirTarea()}
          placeholder="Escribe una tarea..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={añadirTarea}>Añadir</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tareas.map((tarea, index) => (
          <li
            key={index}
            onClick={() => toggleTarea(index)}
            style={{
              padding: '10px',
              marginBottom: '8px',
              background: '#f0f0f0',
              cursor: 'pointer',
              textDecoration: tarea.completada ? 'line-through' : 'none',
              color: tarea.completada ? '#999' : '#000'
            }}
          >
            {tarea.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;