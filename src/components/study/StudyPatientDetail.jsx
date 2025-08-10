import React from 'react';
import './Study.css';

function StudyPatientDetail({ patient, onBack }) {
    return (
        <div className="study-patient-detail-container">
            <div className="study-header">
                <button onClick={onBack}><i className="fas fa-arrow-left"></i> Volver a Pacientes</button>
            </div>
            <div className="study-area-container">
                <div className="study-column left">
                    <h2>{patient.name}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Fuentes de Sesión</p>
                    {/* Aquí iría la lista de sesiones */}
                </div>
                <div className="study-column center">
                    <h3>Visualizador de Sesión</h3>
                </div>
                <div className="study-column right">
                    <h3>Herramientas IA</h3>
                </div>
            </div>
        </div>
    );
}
export default StudyPatientDetail;