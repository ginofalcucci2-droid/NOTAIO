// src/components/views/RegisterView.jsx

import React, { useState } from 'react';
import './Auth.css'; // Crearemos un archivo de estilos compartido

function RegisterView({ onRegisterSuccess, onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'psicologo', // Valor por defecto
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiamos errores anteriores

        try {
            const response = await fetch('http://127.0.0.1:8000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Si la respuesta es exitosa (ej. 200 OK)
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                onRegisterSuccess(); // Notificamos al padre (App.jsx) que el registro fue exitoso
            } else {
                // Si el backend devuelve un error (ej. 400)
                const errorData = await response.json();
                setError(errorData.detail || 'Ocurrió un error en el registro.');
            }
        } catch (err) {
            // Si hay un error de red (ej. el backend no está corriendo)
            setError('No se pudo conectar con el servidor. Inténtalo más tarde.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Crear Cuenta en Notaio</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Soy un</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange}>
                            <option value="psicologo">Psicólogo</option>
                            <option value="paciente">Paciente</option>
                        </select>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="auth-button">Registrarse</button>
                </form>
                <p className="switch-form-text">
                    ¿Ya tienes una cuenta?{' '}
                    <button onClick={onSwitchToLogin} className="switch-form-button">
                        Inicia sesión aquí
                    </button>
                </p>
            </div>
        </div>
    );
}

export default RegisterView;