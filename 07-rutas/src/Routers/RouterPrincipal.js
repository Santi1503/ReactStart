import React from 'react';
import {Routes, Route, NavLink, BrowserRouter, Navigate} from 'react-router-dom';
import { Home } from '../Components/Inicio';
import { Articulos } from '../Components/Articulos';
import { Contact } from '../Components/Contacto';
import { MensajeError } from '../Components/Error';
import { Persona } from '../Components/Persona';
import { PanelControl } from '../Components/PanelControl';
import { InicioPanel } from '../Components/Panel/Inicio';
import { Crear } from '../Components/Panel/Crear';
import { Acerca } from '../Components/Panel/Acerca';
import { Gestion } from '../Components/Panel/Gestion';



export const RouterPrincipal = () => {
  return (
    <BrowserRouter>

        <h1>Cabecera</h1>
        <hr/>

        <nav>
          <ul>
            <li>
              <NavLink 
                to="/home"
                className={({isActive}) => isActive ? "activado" : ""}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/articulos"
                className={({isActive}) => isActive ? "activado" : ""}>
                Articulos
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact"
                className={({isActive}) => isActive ? "activado" : ""}>
                Contacto
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/persona"
                className={({isActive}) => isActive ? "activado" : ""}>
                Persona
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/panel"
                className={({isActive}) => isActive ? "activado" : ""}>
                Panel
              </NavLink>
            </li>
          </ul>
        </nav>
        <hr/>

        <section className="contenido-principal">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/articulos" element={<Articulos />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/persona/:nombre/:apellido" element={<Persona />} />
              <Route path="/persona/:nombre" element={<Persona />} />
              <Route path="/persona" element={<Persona />} />
              <Route path="/redirigir" element={<Navigate to="/persona/santiago/gomez"/>} />
              <Route path="/panel/*" element={<PanelControl />} >
                <Route index element={<InicioPanel />} />
                <Route path="inicio" element={<InicioPanel />} />
                <Route path="crear-articulos" element={<Crear />} />
                <Route path="acerca-de" element={<Acerca />} />
                <Route path="gestion-usuario" element={<Gestion />} />

              </Route>
              <Route path="*" element={<MensajeError />} />
          </Routes>
        </section>
        <hr/>

        <footer>Este es el Footer</footer>
    </BrowserRouter>
        
        
  )
}