import React, { useState } from 'react';
import StudyPatientList from '../study/StudyPatientList';
import StudyPatientDetail from '../study/StudyPatientDetail';

function StudyArea() {
    // Este estado controla si vemos la lista o el detalle de un paciente
    const [selectedPatient, setSelectedPatient] = useState(null);

    // Si no hay paciente seleccionado, mostramos la lista
    if (!selectedPatient) {
        return <StudyPatientList onPatientSelect={setSelectedPatient} />;
    }

    // Si hay un paciente seleccionado, mostramos su detalle
    return <StudyPatientDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
}
export default StudyArea;