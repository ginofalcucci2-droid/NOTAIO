// src/components/views/ProfileView.jsx

import React, { useState, useEffect } from 'react';
import './Auth.css'; // Reutilizaremos los estilos de la vista de login/registro

function ProfileView() {
    // Estado para guardar los datos del perfil que vienen de la API
    const [profileData, setProfileData] = useState({
        nombre_completo: '',
        descripcion: '',
        foto_url: '',
        numero_licencia: '',
    });

    // Estados para manejar la UI
    const [isLoading, setIsLoading] = useState(true); // Empezamos cargando
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // --- EFECTO PARA CARGAR LOS DATOS DEL PERFIL ---
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            setError('');
            const token = localStorage.getItem('authToken');

            if (!token) {
                setError('No estás autenticado. Por favor, inicia sesión de nuevo.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/users/me/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else if (response.status === 404) {
                    // El perfil no existe, es un estado normal, no un error.
                    setError('Aún no has creado tu perfil. ¡Rellena los campos y guárdalo!');
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Error al cargar el perfil.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez, al montar el componente

    // --- MANEJADORES DE EVENTOS ---
    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch('http://127.0.0.1:8000/users/me/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                const updatedProfile = await response.json();
                setProfileData(updatedProfile);
                setSuccessMessage('¡Perfil guardado con éxito!');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'No se pudo guardar el perfil.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // --- RENDERIZADO DEL COMPONENTE ---
    if (isLoading) {
        return <div className="auth-container">Cargando perfil...</div>;
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Tu Perfil</h2>
                <p>Aquí puedes ver y editar la información de tu perfil público.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="nombre_completo">Nombre Completo</label>
                        <input type="text" id="nombre_completo" name="nombre_completo" value={profileData.nombre_completo || ''} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="descripcion">Descripción o Biografía</label>
                        <textarea id="descripcion" name="descripcion" value={profileData.descripcion || ''} onChange={handleChange} rows="4"></textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="foto_url">URL de tu Foto</label>
                        <input type="text" id="foto_url" name="foto_url" value={profileData.foto_url || ''} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="numero_licencia">Número de Licencia (si aplica)</label>
                        <input type="text" id="numero_licencia" name="numero_licencia" value={profileData.numero_licencia || ''} onChange={handleChange} />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <button type="submit" className="auth-button">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
}

export default ProfileView;