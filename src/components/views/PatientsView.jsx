// src/components/views/PatientsView.jsx

import React, { useState } from 'react';
import { patientsData } from '../../data/patients';
import PatientDetailView from './PatientDetailView.jsx'; // Asegúrate de que el nombre del archivo es este
import './Patients.css';

function PatientsView({ onNavigateToStudy }) {
    const [selectedPatient, setSelectedPatient] = useState(null);

    // Si hemos seleccionado un paciente, mostramos su detalle
    if (selectedPatient) {
        return (
            <PatientDetailView 
                patient={selectedPatient} 
                onBack={() => setSelectedPatient(null)}
                // Le pasamos la función "puente" que recibimos de App.jsx
                onGoToStudyArea={onNavigateToStudy}
            />
        );
    }

    // Si no, mostramos la lista para que el usuario elija
    return (
        <div className="content-view">
            <h2>Mis Pacientes</h2>
            {patientsData.map(patient => (
                <div key={patient.id} className="card patient-card" onClick={() => setSelectedPatient(patient)}>
                    <h4>{patient.nombre}</h4>
                    <button className="btn">Ver Detalle</button>
                </div>
            ))}
        </div>
    );
}

export default PatientsView;