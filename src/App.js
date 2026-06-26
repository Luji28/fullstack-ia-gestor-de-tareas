/*
Autora: Lucía Jiménez Lozano
Fecha última revisión: 22/06/2026
Descripción: Front del proyecto "gestor de tareas"

Cambios futuros a tener en cuenta: 
- separar el css a un fichero aparte
*/

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [cargando, setCargando] = useState(false); // Estado para impedir que se creen varias tareas iguales mientras se crea una

  useEffect(() => {
    fetch("http://localhost:8000/tareas")
        .then(res => res.json())
        .then(data => setTareas(data));
  }, []);

  const añadirTarea = () => {
    if (nuevaTarea.trim() === '') return;
    setCargando(true)
    fetch("http://localhost:8000/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: nuevaTarea, completada: false })
    })
    .then(res => res.json())
    .then(data => {
        setTareas(data);
        setNuevaTarea('');
      setCargando(false)
    });
  };

  const toggleTarea = (id) => {
    fetch("http://localhost:8000/tareas/"+id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => {
        setTareas(data);
    });
  };


  const eliminarTarea = (id) => {
    fetch("http://localhost:8000/tareas/"+id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => {
        setTareas(data);
    });
  };

  return (
    <div className='app'>
      <h1>Gestor de Tareas</h1>

      <div className='anyadir'>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !cargando && añadirTarea()}
          placeholder="Escribe una tarea..."
          className='txtanyadir'
        />
        <button onClick={añadirTarea} disabled={cargando} className='botonanyadir'>Añadir</button>
      </div>

      <ul className='lista'>
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            onClick={() => toggleTarea(tarea.id) }
            className="tarea"
          >
            <span className={`tarea-texto ${tarea.completada ? 'tarea-completada' : ''}`}>
              {tarea.texto}
            </span>
          <button onClick={(e) => {
            e.stopPropagation();
            eliminarTarea(tarea.id);
          }}
          className='botoneliminar'>
            Eliminar
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;