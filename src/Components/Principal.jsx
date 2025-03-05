import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Principal() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/login'); // Redirige a login si no hay token
        }
    }, [navigate]);

    return (
        <div>
            <h1>Página Principal</h1>
            {/* Tu contenido principal */}
        </div>
    );
}

export default Principal;