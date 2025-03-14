import React from 'react';
import {useSearchParams} from "react-router-dom";

function VerificationPage() {

    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    let message = "";
    let messageType = "info";

    if (status !== "success" || status === "invalid-token" || status === "expired" || status === "error") {
        message = "Verificando...";
        messageType = "info";
    }
    if (status === "success") {
        message = "Email verificado con exito!";
        messageType = "success";
    }
    if (status === "invalid-token") {
        message = "El token de verificacion es invalido";
        messageType = "error";
    }
    if (status === "expired") {
        message = "Su token ah expirado, por favor, solicite uno nuevo";
        messageType = "error";
    }
    if (status === "error") {
        message = "Email verificado con exito!";
        messageType = "error";
    }

    return (
        <div className={`verification-container ${messageType}`}>

            <h1>Verificacion Email</h1>
            <p>{message}</p>
            {messageType === "success" && (
                <button onClick={() => window.location="/login"}>
                    Ir a iniciar sesion</button>
            )}
        </div>
    );
}

export default VerificationPage;