import React from 'react';
import {Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import { Inicio } from '../Components/Inicio';
import { Articulos } from '../Components/Articulos';
import { Contacto } from '../Components/Contacto';
import { MensajeError } from '../Components/Error';

export const RouterPrincipal = () => {
  return (
    <BrowserRouter>
        {/*Cargar componentes*/}
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<MensajeError />} />
        </Routes>
    </BrowserRouter>
  )
}
