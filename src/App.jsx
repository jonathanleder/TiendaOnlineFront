import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from "./Components/Login.jsx";
import Registro from "./Components/Registro.jsx";
import Principal from "./Components/Principal.jsx";
import VerificationPage from "./Components/VerificationPage.jsx";

function App() {


  return (

      <Router>
          <div className="App">
          <div className="contenedor-principal">
          <Routes>
              {/* Ruta para el Login*/}
              <Route path="/login" element={<Login/>} />
              {/* Ruta para el Registro*/}
              <Route path="/registro" element={<Registro/>} />
              {/* Ruta para pagina principal*/}
              <Route path="/principal" element={<Principal/>} />
              <Route path="/verification" element={<VerificationPage/>} />
          </Routes>
          </div>
          </div>
      </Router>
  );
}

export default App
