// src/App.jsx - VERSIÓN FINAL CON PERFIL INTEGRADO

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/views/Dashboard.jsx';
import PatientsView from './components/views/PatientsView.jsx';
import StudyArea from './components/views/StudyArea.jsx';
import AgendaView from './components/views/AgendaView.jsx';
import LoginView from './components/views/LoginView.jsx';
import RegisterView from './components/views/RegisterView.jsx';
import ProfileView from './components/views/ProfileView.jsx'; // <-- 1. IMPORTAR LA NUEVA VISTA
import './App.css';

function App() {
    // --- ESTADOS PRINCIPALES ---
    const [activeView, setActiveView] = useState('dashboard');
    const [studyPatient, setStudyPatient] = useState(null);
    
    // ESTADO DE AUTENTICACIÓN
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    
    // ESTADO PARA LA VISTA DE AUTH
    const [isLoginView, setIsLoginView] = useState(true);

    // --- LÓGICA DE AUTENTICACIÓN ---
    const handleLoginSuccess = (token) => {
        console.log("LOGIN EXITOSO! Recibido token:", token);
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
    };

    const handleRegisterSuccess = () => {
        setIsLoginView(true);
    };
    
    // --- NAVEGACIÓN DENTRO DE LA APP ---
    const handleNavigate = (viewId) => {
        setActiveView(viewId);
        setStudyPatient(null);
    };

    const handleNavigateToStudy = (patient) => {
        setStudyPatient(patient);
        setActiveView('study-area');
    };

    // --- RENDERIZADO CONDICIONAL ---

    if (!authToken) {
        if (isLoginView) {
            return (
                <LoginView 
                    onLoginSuccess={handleLoginSuccess}
                    onSwitchToRegister={() => setIsLoginView(false)}
                />
            );
        } else {
            return (
                <RegisterView 
                    onRegisterSuccess={handleRegisterSuccess}
                    onSwitchToLogin={() => setIsLoginView(true)}
                />
            );
        }
    }

    const renderMainView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'agenda':
                return <AgendaView />;
            case 'patients':
                return <PatientsView onNavigateToStudy={handleNavigateToStudy} />;
            case 'study-area':
                return <StudyArea patient={studyPatient} onPatientSelect={setStudyPatient} />;
            
            // <-- 2. AÑADIR EL CASE PARA EL PERFIL -->
            case 'profile':
                return <ProfileView />;
                
            default:
                return <div className="card"><h2>{activeView.replace('-', ' ')}</h2></div>;
        }
    };

    return (
        <div className="app-container">
            <Sidebar activeView={activeView} setActiveView={handleNavigate} />
            <main className="main-content">
                <header className="main-header">
                    <h1>{activeView.replace('-', ' ')}</h1>
                    <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
                </header>
                <div className="content-wrapper">
                    {renderMainView()}
                </div>
            </main>
        </div>
    );
}

export default App;