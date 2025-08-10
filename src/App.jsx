// src/App.jsx - VERSIÓN CORREGIDA Y SIMPLIFICADA

import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import StudyArea from './components/views/StudyArea.jsx';
import Dashboard from './components/views/Dashboard.jsx';
import AgendaView from './components/views/AgendaView.jsx';
import PatientsView from './components/views/PatientsView.jsx';
import PatientDetailView from './components/views/PatientDetailView.jsx';
import './App.css';

function App() {
    const [activeView, setActiveView] = useState('dashboard');
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleNavigate = (viewId) => {
        setActiveView(viewId);
        setSelectedPatient(null); 
    };

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setActiveView('patient-detail');
    };

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'Agenda':
                return <AgendaView />;
            case 'patients':
                return <PatientsView onPatientSelect={handlePatientSelect} />;
            case 'patient-detail':
                return <PatientDetailView patient={selectedPatient} onBack={() => handleNavigate('patients')} />;
            case 'study-area':
                return <StudyArea />;
            default:
                return <div className="card"><h2>{activeView.replace('-', ' ')}</h2></div>;
        }
    };

    return (
        <div className="app-container">
            <Sidebar activeView={activeView} setActiveView={handleNavigate} />
            <main className="main-content">
                {activeView !== 'study-area' && (
                    <header className="main-header">
                        <h1>{selectedPatient ? `Detalle de: ${selectedPatient.name}` : activeView.replace('-', ' ')}</h1>
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