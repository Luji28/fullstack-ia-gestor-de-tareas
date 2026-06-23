/*
Autora: Lucía Jiménez Lozano
Fecha última revisión: 22/06/2026
Descripción: Front del proyecto "gestor de tareas"

Cambios futuros a tener en cuenta: 
- separar el css a un fichero aparte
- El uso de "index" está desaconsejado en su mayoría. Aquí es simple y funciona pero mejor crear un id único a cada tarea.
*/
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  useEffect(() => {
    fetch("http://localhost:8000/tareas")
        .then(res => res.json())
        .then(data => setTareas(data));
  }, []);

  const añadirTarea = () => {
    if (nuevaTarea.trim() === '') return;
    fetch("http://localhost:8000/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: nuevaTarea, completada: false })
    })
    .then(res => res.json())
    .then(data => {
        setTareas(data);
        setNuevaTarea('');
    });
  };

  const toggleTarea = (index) => {
    const copia = [...tareas];
    copia[index].completada = !copia[index].completada;
    setTareas(copia);
  };

  const eliminarTarea = (index) => {
    fetch("http://localhost:8000/tareas/"+index, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => {
        setTareas(data);
    });
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
            onClick={() => toggleTarea(index) }
            style={{
              padding: '10px',
              marginBottom: '8px',
              background: '#f0f0f0',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span style={{
              textDecoration: tarea.completada ? 'line-through' : 'none',
              color: tarea.completada ? '#999' : '#000'
            }}>
              {tarea.texto}
            </span>
          <button onClick={(e) => {
            e.stopPropagation();
            eliminarTarea(index);
          }}>
            Eliminar
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;