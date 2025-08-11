// src/App.jsx - VERSIÓN CORREGIDA Y COMPLETA

import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/views/Dashboard.jsx'; // Asegúrate de que este archivo existe
import PatientsView from './components/views/PatientsView.jsx';
import StudyArea from './components/views/StudyArea.jsx';
import AgendaView from './components/views/AgendaView.jsx';
import './App.css';

function App() {
    const [activeView, setActiveView] = useState('dashboard'); // Empezamos en pacientes para probar
    
    // NUEVO ESTADO: Este estado es específico para el Área de Estudio.
    // Guarda qué paciente queremos analizar.
    const [studyPatient, setStudyPatient] = useState(null);

    // NUEVA FUNCIÓN "PUENTE": Esta es la lógica que conecta el detalle con el área de estudio.
    const handleNavigateToStudy = (patient) => {
        setStudyPatient(patient);  // 1. Guarda el paciente que queremos estudiar.
        setActiveView('study-area'); // 2. Cambia la vista activa al área de estudio.
    };

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            
            case 'Agenda':
            return <AgendaView />;    
            
            case 'patients':
                // A PatientsView le pasamos la función "puente" para que la pueda usar.
                return <PatientsView onNavigateToStudy={handleNavigateToStudy} />;
            
            case 'study-area':
                // A StudyArea le pasamos el paciente que guardamos y la función para limpiarlo.
                return <StudyArea patient={studyPatient} onPatientSelect={setStudyPatient} />;
            
            default:
                // Renombramos 'Agenda' para que coincida con el id del sidebar
                return <div className="card"><h2>{activeView.replace('-', ' ')}</h2></div>;
        }
    };

    return (
        <div className="app-container">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="main-content">
                {/* Ocultamos la cabecera en el área de estudio para tener pantalla completa */}
                {activeView !== 'study-area' && (
                     <header className="main-header">
                        <h1>{activeView.replace('-', ' ')}</h1>
                    </header>
                )}
                <div className="content-wrapper">
                    {renderView()}
                </div>
            </main>
        </div>
    );
}

export default App;
