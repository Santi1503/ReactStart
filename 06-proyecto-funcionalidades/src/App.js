import { useState } from "react";
import { Buscador } from "./Components/Buscador";
import { Crear } from "./Components/Crear";
import { Listado } from "./Components/Listado";

function App() {
  const [listadoState, setListadoState] = useState([])
  return (
    <div className="layout">
      {/*Cabecera*/}
      <header className="header">
        <div className="logo">
          <div className="play"></div>
        </div>
        <h1>WalletPelis</h1>
      </header>

      {/*Barra de navegación*/}
      <nav className="nav">
          <ul>
              <li><a href="/#">Inicio</a></li>
              <li><a href="/#">Películas</a></li>
              <li><a href="/#">Blog</a></li>
              <li><a href="/#">Contacto</a></li>
          </ul>
      </nav>

      {/*Contenido Principal*/}
      <section id="content" className="content">
         <Listado listadoState={listadoState} setListadoState={setListadoState} />
      </section>

      {/*Barra lateral*/}
      <aside className="lateral">
        <Buscador listadoState={listadoState} setListadoState={setListadoState} />

        <Crear setListadoState={setListadoState}/>
      </aside>

      {/*Pie de Pagina*/}
      <footer className="footer">
        &copy; Santiago Gómez de la Torre - <a href="https://www.linkedin.com/in/santiago-gomez-de-la-torre-3a7b62249">Santiago Gómez de la Torre</a>
      </footer>
  </div>);
}

export default App;
