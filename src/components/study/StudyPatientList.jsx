// src/components/study/StudyPatientList.jsx - VERSIÓN CORREGIDA

import React from 'react';
import './Study.css'; 
// ¡AÑADIMOS LA IMPORTACIÓN DE DATOS!
import { patientsData } from '../../data/patients.js';

function StudyPatientList({ onPatientSelect }) {
    return (
        <div className="content-view">
            <h2>Seleccionar Paciente para Análisis</h2>
            <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>
                Haz clic en un paciente para abrir su área de estudio.
            </p>
            {/* Ahora este .map() tiene datos para poder trabajar */}
            {patientsData.map(p => (
                <div key={p.id} className="card study-select-patient-card" onClick={() => onPatientSelect(p)}>
                    <h4>{p.nombre}</h4>
                    <p>Seleccionar para estudio</p>
                </div>
            ))}
        </div>
    );
}

export default StudyPatientList;