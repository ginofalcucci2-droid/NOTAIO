// src/components/views/PatientsView.jsx

import React from 'react';
import './PatientsView.css'; // Importamos un CSS que crearemos ahora
import { patientsData } from '../../data/patients.js';

function PatientsView({ onPatientSelect }) {
    return (
        <div className="content-view">
            <div className="patient-list">
                {patientsData.map((patient) => (
                    // Cada tarjeta es un "botón". Usamos una etiqueta <a> por semántica.
                    // En el futuro, onClick llevará al detalle del paciente.
                    <div key={patient.id} className="patient-card" onClick={() => onPatientSelect(patient)}>
                        <div className="patient-info">
                            <h3 className="patient-name">{patient.name}</h3>
                            <p className="patient-details">Edad: {patient.age}</p>
                        </div>
                        <div className="patient-contact">
                            <p className="patient-details">DNI: {patient.dni}</p>
                            <p className="patient-details">Teléfono: {patient.phone}</p>
                        </div>
                        <div className="patient-arrow">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PatientsView;