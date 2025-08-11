import React from 'react';
import StudyPatientList from '../study/StudyPatientList';
import StudyPatientDetail from '../study/StudyPatientDetail';

// NUEVOS PROPS: `patient` para recibir el paciente a estudiar
// y `onPatientSelect` para comunicar la selección hacia arriba
function StudyArea({ patient, onPatientSelect }) {
    // Si ya tenemos un paciente, mostramos su detalle directamente
    if (patient) {
        return (
            <StudyPatientDetail 
                patient={patient} 
                // Al volver, le decimos a App.jsx que ya no hay paciente seleccionado
                onBack={() => onPatientSelect(null)} 
            />
        );
    }

    // Si no, mostramos la lista para que el usuario elija
    return <StudyPatientList onPatientSelect={onPatientSelect} />;
}

export default StudyArea;