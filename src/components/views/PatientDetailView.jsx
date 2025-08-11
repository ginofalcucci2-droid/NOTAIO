// src/components/views/PatientDetailView.jsx - VERSIÓN CORREGIDA

import React from 'react';
import './Patients.css';

// ¡Se han eliminado las importaciones incorrectas!
// Este componente ahora solo depende de las props que recibe.

function PatientDetailView({ patient, onBack, onGoToStudyArea }) {
    // Esta comprobación es importante por si algo sale mal
    if (!patient) {
        return <div className="card"><p>No se ha seleccionado ningún paciente.</p></div>;
    }

    // El resto del código ya estaba perfecto
    return (
        <div className="content-view">
            <h2>Detalle De: {patient.nombre}</h2>
            <div className="card">
                <div className="detail-header-actions">
                    <button className="btn btn-secondary" onClick={onBack}>
                        <i className="fas fa-arrow-left"></i> Volver a la lista
                    </button>
                    <button className="btn btn-primary" onClick={() => onGoToStudyArea(patient)}>
                        <i className="fas fa-microscope"></i> Ir al Área de Estudio
                    </button>
                </div>

                <h3 style={{ marginTop: '1.5rem' }}>{patient.nombre}</h3>

                <div className="detail-cards-container">
                    <div className="inner-card">
                        <h4>Información Personal</h4>
                        <p><strong>Edad:</strong> {patient.edad}</p>
                        <p><strong>DNI:</strong> {patient.dni}</p>
                        <p><strong>Teléfono:</strong> {patient.telefono}</p>
                    </div>
                    <div className="inner-card">
                        <h4>Historia Clínica</h4>
                        <p>Próximamente...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientDetailView;