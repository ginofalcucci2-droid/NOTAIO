// src/components/views/PatientDetailView.jsx

import React from 'react';
import './PatientDetailView.css';

function PatientDetailView({ patient, onBack }) {
    if (!patient) {
        return (
            <div className="patient-detail-view">
                <p>No se ha seleccionado ningún paciente.</p>
                <button onClick={onBack} className="back-button">Volver</button>
            </div>
        );
    }

    return (
        <div className="patient-detail-view">
            <button onClick={onBack} className="back-button">← Volver a la lista</button>
            <div className="patient-header">
                <h2>{patient.name}</h2>
            </div>
            <div className="patient-content">
                <div className="patient-data-card">
                    <h3>Información Personal</h3>
                    <p><strong>Edad:</strong> {patient.age}</p>
                    <p><strong>DNI:</strong> {patient.dni}</p>
                    <p><strong>Teléfono:</strong> {patient.phone}</p>
                </div>
                <div className="patient-history-card">
                    <h3>Historia Clínica</h3>
                    <p>Próximamente...</p>
                </div>
            </div>
        </div>
    );
}

export default PatientDetailView;
