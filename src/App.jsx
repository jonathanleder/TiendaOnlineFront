import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './stylesheets/Home.css';
import './stylesheets/logo.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from "./Components/Login.jsx";
import Registro from "./Components/Registro.jsx";
import Principal from "./Components/Principal.jsx";
import VerificationPage from "./Components/VerificationPage.jsx";
import Layout from "./views/Layout.jsx";
import Home from "./views/Home.jsx";
import ProductDetail from "./views/ProductDetail.jsx";

function App() {


  return (

      <Router>
          <div className="App">
          <Routes>
              {/* Rutas dentro del Layout*/}
              <Route path="/" element={<Layout/>}>
                <Route path="/home" element={<Home/>} />
                <Route path="/products/:id" element={<ProductDetail/>} />
              </Route>
              {/* Rutas fuera del layout*/}
              {/* Ruta para el Login*/}
              <Route path="/login" element={<Login/>} />
              {/* Ruta para el Registro*/}
              <Route path="/registro" element={<Registro/>} />
              <Route path="/verification" element={<VerificationPage/>} />
          </Routes>
          </div>
      </Router>
  );
}

export default App
