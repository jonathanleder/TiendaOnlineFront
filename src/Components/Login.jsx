import React from 'react';
import '../stylesheets/login.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState} from "react";


function Login() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        try{
            const response = await axios.post("http://localhost:8080/api/auth/login", {username, password});

            if(response.data.authStatus === "LOGIN_SUCCESSFULLY"){
                setSuccessMessage(response.data.message);
                localStorage.setItem("token", response.data.token);

                setTimeout(()=>{
                    navigate('/principal');
                }, 1000);
            }
        }catch (err){
            if(err.response?.data?.message){
                setError(err.response.data.message);
            }else{
                setError("Error al iniciar sesion. Intente mas tarde");
            }
            console.error("Error detallado", err);
        }

    }


    return (
        <div>
            <div className="card">
                <form onSubmit={handleLogin}>
                    <h2 className={"text-center"}>Iniciar sesion</h2>
                    <div className="mb-3">
                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}
                        {successMessage && (
                            <div className="alert alert-success">{successMessage}</div>
                        )}
                        <label htmlFor='username' className={'form-label'}>Username</label>
                        <input type="text" className={'form-control'} id='username' value={username} onChange={(event)=>setUsername(event.target.value)} required/>

                    </div>
                    <div className={'mb-3'}>
                        <label htmlFor='password' className={'form-label'}>Contraseña</label>
                        <input type="password" className={'form-control'} id='password' value={password} onChange={(event)=>setPassword(event.target.value)} required/>
                    </div>
                    <div className="mb-3 form-check">
                        <input className="form-check-input" type="checkbox" id="exampleCheckbox1" checked={!(true)} />
                        <label className="form-check-label" htmlFor="exampleCheckbox1">Recordar Contraseña</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                    <p className={'text-center mt-3'}>
                        ¿No tienes una cuenta?{''}
                        <Link to='/registro' className="btn btn-link">Registrarse</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Login;