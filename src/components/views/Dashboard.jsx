import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa los estilos por defecto del calendario
import './Dashboard.css'; // Importaremos nuestros estilos personalizados

function Dashboard() {
    // 'useState' es un "gancho" de React para guardar un valor.
    // Lo inicializamos con la fecha de hoy.
    const [date, setDate] = useState(new Date());

    return (
        <div className="content-view">
            <div className="card">
                <h2>Calendario</h2>
                <div className="calendar-container">
                    <Calendar 
                        onChange={setDate} // Esta función actualiza la fecha cuando haces clic
                        value={date}      // Este es el valor de la fecha seleccionada
                    />
                </div>
            </div>
            {/* Aquí podrías añadir más tarjetas para el dashboard */}
        </div>
    );
}

export default Dashboard;