import React, { useContext } from 'react'
import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom' 
import { Inicio } from '../Components/Inicio'
import { Articulos } from '../Components/Articulos'
import { Contacto } from '../Components/Contacto'
import { Login } from '../Components/Login'
import { Acerca } from '../Components/Acerca'
import { PruebaContext } from '../Context/PruebaContext'

export const AppRouter = () => {

  const {usuario, setUsuario} = useContext(PruebaContext)

  return (
    <BrowserRouter>
    <header className='header'>
    {/* Menú navegación */}
      <nav>
        <div className="logo">
          <h2>Aprendiendo React Context</h2>
        </div>
        <ul>
          <li>
            <NavLink to="/">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/articulos">Articulos</NavLink>
          </li>
          <li>
            <NavLink to="/acerca-de">Acerca de</NavLink>
          </li>
          <li>
            <NavLink to="/contacto">Contacto</NavLink>
          </li>
          <li>
            {usuario.askOwnProperty("username") && usuario.username !== null ? (
              <>
                <li>
                  <NavLink to="/">{usuario.username}</NavLink>
                </li>
                <li>
                  <a href="#" onClick={e => {
                    e.preventDefault()
                    setUsuario({})
                  }}>Cerrar Sesion</a>
                </li>
              </>
            ):(
              <NavLink to="/login">Identificate</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>

    <section className='content'>
    {/* Configuración rutas */}
      <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/articulos' element={<Articulos />} />
          <Route path='/acerca-de' element={<Acerca />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contacto' element={<Contacto />} />

          <Route path='*' element={(
              <div>
                  <h1>ERROR 404</h1>
              </div>)} />

      </Routes>
    </section>
    </BrowserRouter>
  )
}
