// src/components/views/PatientsView.jsx - VERSIÓN CONECTADA AL BACKEND

import React, { useState, useEffect } from 'react'; // ¡Importamos useEffect!
// YA NO NECESITAMOS LOS DATOS FALSOS -> import { patientsData } from '../../data/patients';
import PatientDetailView from './PatientDetailView.jsx';
import './Patients.css';

function PatientsView({ onNavigateToStudy }) {
    const [selectedPatient, setSelectedPatient] = useState(null);
    
    // NUEVO ESTADO: Guardará la lista de pacientes que venga del backend.
    // Empieza como un array vacío.
    const [patients, setPatients] = useState([]);

    // NUEVO HOOK: useEffect se ejecuta una vez, justo cuando el componente se monta en la pantalla.
    // Es el lugar perfecto para pedir datos a una API.
    useEffect(() => {
        // Hacemos la petición (fetch) a nuestro backend
        fetch('http://127.0.0.1:8000/patients')
            .then(response => response.json()) // Convertimos la respuesta a formato JSON
            .then(data => setPatients(data)) // Guardamos los datos recibidos en nuestro estado
            .catch(error => console.error("Error al obtener los pacientes:", error)); // Manejo de errores
    }, []); // El array vacío [] asegura que esto se ejecute solo una vez.

    if (selectedPatient) {
        return (
            <PatientDetailView 
                patient={selectedPatient} 
                onBack={() => setSelectedPatient(null)}
                onGoToStudyArea={onNavigateToStudy}
            />
        );
    }

    return (
        <div className="content-view">
            <h2>Mis Pacientes</h2>
            {/* Ahora hacemos el .map() sobre la variable de estado 'patients' */}
            {patients.map(patient => (
                <div key={patient.id} className="card patient-card" onClick={() => setSelectedPatient(patient)}>
                    <h4>{patient.nombre}</h4>
                    <button className="btn">Ver Detalle</button>
                </div>
            ))}
        </div>
    );
}

export default PatientsView;