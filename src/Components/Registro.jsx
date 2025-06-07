import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

function Registro() {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTefono] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function save(event) {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        if(password !== "" && password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try{
            const response = await axios.post("http://localhost:8080/api/auth/registrar", {nombre: nombre,apellido,telefono,username, email, password});

            if(response.data.authStatus === 'USER_CREATE_SUCCESSFULLY') {
                setSuccessMessage(response.data.message);

                setTimeout(() => {
                    window.location = '/login';
                }, 4000);
            }else{
             setError(response.data.message || "No se pudo completar el registro");
            }
        }catch(err){
            if(err.response?.data?.message) {
                setError(err.response.data.message);
            }else if(err.response?.data?.authStatus==='USER_NOT_CREATED') {
                setError("No se pudo crear el usuario, por favor intente nuevamente");
            }else{
                setError("Error en el registro. por favor intente nuevamente mas tarde");
            }
            console.error("Error detallado: ",err);
        }

    }

    return (
        <div className={'card'}>
            <form>
                <h2 className={'text-center'}>Crear Cuenta</h2>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}

                <div className={'mb-3'}>
                    <label htmlFor='nombre' className={'form-label'}>Nombre/s</label>
                    <input type="text" className={'form-control'} id='nombre' value={nombre} onChange={(event)=>setNombre(event.target.value)} required/>
                </div>
                <div className={'mb-3'}>
                    <label htmlFor='apellido' className={'form-label'}>Apellido</label>
                    <input type="text" className={'form-control'} id='apellido' value={apellido} onChange={(event)=>setApellido(event.target.value)} required/>
                </div>
                <div className={'mb-3'}>
                    <label htmlFor='telefono' className={'form-label'}>Telefono</label>
                    <input type="text" className={'form-control'} id='telefono' value={telefono} onChange={(event)=>setTefono(event.target.value)} />
                </div>
                <div className={'mb-3'}>
                    <label htmlFor='email' className={'form-label'}>Email</label>
                    <input type="email" className={'form-control'} id='email' value={email} onChange={(event)=>setEmail(event.target.value)} required/>
                </div>
                <div className={'mb-3'}>
                    <label htmlFor='username' className={'form-label'}>Usuario</label>
                    <input type="text" className={'form-control'} id='username' value={username} onChange={(event)=>setUsername(event.target.value)} required/>
                </div>
                <div className={'mb-3'}>
                    <label htmlFor='password' className={'form-label'}>Contraseña</label>
                    <input type="password" className={'form-control'} id='password' value={password} onChange={(event)=>setPassword(event.target.value)} required/>
                </div>
                <div className={'mb-3'}>
                    <label htmlFor='confirmPassword' className={'form-label'}>Confirmar contraseña</label>
                    <input type="password" className={'form-control'} id='conformPassword' value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)} required/>
                </div>
                <button type={'submit'} className={'btn btn-primary w-100'} onClick={save}>Registrar</button>
                <p className={'text-center mt-3'}>
                    ¿Ya tienes una cuenta?{''}
                    <Link to='/login' className="btn btn-link">Loguearse</Link>
                </p>
            </form>
        </div>
    );
}

export default Registro;