import React from 'react';
import './Study.css'; 
import { patientsData } from '../../data/patients.js';

function StudyPatientList({ onPatientSelect }) {
    return (
        <div className="content-view">
            <h2>Seleccionar Paciente para Análisis</h2>
            <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>
                Haz clic en un paciente para abrir su área de estudio.
            </p>
            {patientsData.map(p => (
                <div key={p.id} className="card study-select-patient-card" onClick={() => onPatientSelect(p)}>
                    <h4>{p.name}</h4>
                    <p>Seleccionar para estudio</p>
                </div>
            ))}
        </div>
    );
}
export default StudyPatientList;