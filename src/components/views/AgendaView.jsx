// src/components/views/AgendaView.jsx

import React, { useState } from 'react'; // Importamos 'useState' para darle memoria al componente
import './AgendaView.css'; // Importaremos un nuevo archivo de estilos

function AgendaView() {
    // --- ESTADOS ---
    // 1. Un estado para guardar el array (la lista) de todas las tareas.
    //    Cada tarea será un objeto con id, texto y si está completada.
    const [tasks, setTasks] = useState([]);

    // 2. Un estado para guardar el texto que se está escribiendo en el campo de input.
    const [inputValue, setInputValue] = useState('');

    // --- FUNCIONES (La Lógica) ---
    // Se ejecuta cuando se envía el formulario (con Enter o el botón)
    const handleAddTask = (e) => {
        e.preventDefault(); // Previene que la página se recargue
        if (inputValue.trim() === '') return; // No añade tareas vacías

        const newTask = {
            id: Date.now(), // Usamos la fecha actual como un ID único y simple
            text: inputValue,
            completed: false,
        };

        setTasks([...tasks, newTask]); // Añade la nueva tarea a la lista existente
        setInputValue(''); // Limpia el campo de input después de añadir la tarea
    };

    // Se ejecuta cuando se hace clic en el checkbox de una tarea
    const handleToggleTask = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // --- RENDERIZADO (Lo que se dibuja en pantalla) ---
    return (
        <div className="content-view">
            <div className="card">
                <h2>Agenda / Checklist</h2>
                
                <div className="checklist-container">
                    {/* FORMULARIO PARA AÑADIR NUEVAS TAREAS */}
                    <form onSubmit={handleAddTask} className="add-task-form">
                        <input
                            type="text"
                            className="task-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escribe una nueva tarea..."
                        />
                        <button type="submit" className="add-task-button">+</button>
                    </form>

                    {/* LISTA DE TAREAS */}
                    <ul className="task-list">
                        {tasks.map(task => (
                            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                                <div className="checkbox" onClick={() => handleToggleTask(task.id)}>
                                    {task.completed && <i className="fas fa-check"></i>}
                                </div>
                                <span className="task-text">{task.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AgendaView;