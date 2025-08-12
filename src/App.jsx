// src/App.jsx - VERSIÓN CON LÓGICA DE AUTENTICACIÓN

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/views/Dashboard.jsx';
import PatientsView from './components/views/PatientsView.jsx';
import StudyArea from './components/views/StudyArea.jsx';
import AgendaView from './components/views/AgendaView.jsx';
import LoginView from './components/views/LoginView.jsx';
import RegisterView from './components/views/RegisterView.jsx';
import './App.css';

function App() {
    // --- ESTADOS PRINCIPALES ---
    const [activeView, setActiveView] = useState('dashboard');
    const [studyPatient, setStudyPatient] = useState(null);
    
    // ESTADO DE AUTENTICACIÓN: El "guardia de seguridad"
    // Buscamos en localStorage si ya existe un token guardado.
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    
    // ESTADO PARA LA VISTA DE AUTH: Nos permite cambiar entre Login y Registro
    const [isLoginView, setIsLoginView] = useState(true);

    // --- LÓGICA DE AUTENTICACIÓN ---
    const handleLoginSuccess = (token) => {
        localStorage.setItem('authToken', token); // Guardamos el token en el navegador
        setAuthToken(token); // Actualizamos el estado para que la app reaccione
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Borramos el token
        setAuthToken(null);
    };

    const handleRegisterSuccess = () => {
        setIsLoginView(true); // Después de un registro exitoso, mostramos el Login
    };
    
    // --- NAVEGACIÓN DENTRO DE LA APP (una vez logueado) ---
    const handleNavigate = (viewId) => {
        setActiveView(viewId);
        setStudyPatient(null);
    };

    const handleNavigateToStudy = (patient) => {
        setStudyPatient(patient);
        setActiveView('study-area');
    };

    // --- RENDERIZADO CONDICIONAL ---

    // Si NO hay token de autenticación, mostramos las vistas de Login/Registro
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

    // Si SÍ hay token, mostramos la aplicación principal
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
            default:
                return <div className="card"><h2>{activeView.replace('-', ' ')}</h2></div>;
        }
    };

    return (
        <div className="app-container">
            <Sidebar activeView={activeView} setActiveView={handleNavigate} />
            <main className="main-content">
                <header className="main-header">
                    {/* Podríamos añadir un botón de Logout aquí */}
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