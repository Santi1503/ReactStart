import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export const PanelControl = () => {
  return (
    <div>
        <h1>Panel de Control</h1>
        <p>Este es el panel de control</p>
        <nav>
            <ul>
                <li>
                    <NavLink to='/panel/inicio'>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to='/panel/crear-articulos'>Crear</NavLink>
                </li>
                <li>
                    <NavLink to='/panel/acerca-de'>Acerca</NavLink>
                </li>
                <li>
                    <NavLink to='/panel/gestion-usuario'>Gestion</NavLink>
                </li>
            </ul>
        </nav>
        <div>
            <Outlet />
        </div>
    </div>
  )
}
