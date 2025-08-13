// src/components/Sidebar.jsx - VERSIÓN MODIFICADA

import React from 'react';
import './Sidebar.css';

const navItems = [
    { id: 'dashboard', icon: 'fas fa-home', text: 'Dashboard' },
    { id: 'Agenda', icon: 'fas fa-calendar-alt', text: 'Agenda' },
    { id: 'patients', icon: 'fas fa-users', text: 'Mis Pacientes' },
    { id: 'study-area', icon: 'fas fa-microscope', text: 'Área de Estudio' },
    
    // ----> ESTA ES LA LÍNEA QUE DEBE AÑADIR <----
    { id: 'profile', icon: 'fas fa-user-cog', text: 'Mi Perfil' }
];

function Sidebar({ activeView, setActiveView }) {
    return (
        <nav className="sidebar">
            <div className="logo">Notaio</div>
            <ul className="nav-menu">
                {navItems.map(item => (
                    <li key={item.id}>
                        <a href="#" className={activeView === item.id ? 'active' : ''} onClick={() => setActiveView(item.id)}>
                            <i className={item.icon}></i> {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
export default Sidebar;