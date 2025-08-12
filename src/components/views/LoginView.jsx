// src/components/views/LoginView.jsx - VERSIÓN CONECTADA

import React, { useState } from 'react';
import './Auth.css';

function LoginView({ onLoginSuccess, onSwitchToRegister }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        setError('');

        try {
            // FastAPI espera los datos del login en un formato especial (form data)
            const formBody = new URLSearchParams();
            formBody.append('username', formData.email); // El 'username' para la API es nuestro 'email'
            formBody.append('password', formData.password);

            const response = await fetch('http://127.0.0.1:8000/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formBody,
            });

            if (response.ok) {
                const data = await response.json();
                onLoginSuccess(data.access_token); // ¡Enviamos el token recibido al componente App!
            } else {
                // Si el backend devuelve un error (ej. 401 Unauthorized)
                const errorData = await response.json();
                setError(errorData.detail || 'Email o contraseña incorrectos.');
            }
        } catch (err) {
            setError('No se pudo conectar con el servidor. ¿Está encendido?');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="auth-button">Entrar</button>
                </form>
                <p className="switch-form-text">
                    ¿No tienes una cuenta?{' '}
                    <button onClick={onSwitchToRegister} className="switch-form-button">
                        Regístrate aquí
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginView;