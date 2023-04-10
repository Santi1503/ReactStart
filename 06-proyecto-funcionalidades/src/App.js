import { Buscador } from "./Components/Buscador";
import { Crear } from "./Components/Crear";
import { Listado } from "./Components/Listado";

function App() {
  return (
    <div className="layout">
      {/*Cabecera*/}
      <header className="header">
        <div className="logo">
          <div className="play"></div>
        </div>
        <h1>BalgitPelis</h1>
      </header>

      {/*Barra de navegación*/}
      <nav className="nav">
          <ul>
              <li><a href="/#">Inicio</a></li>
              <li><a href="/#">Peliculas</a></li>
              <li><a href="/#">Blog</a></li>
              <li><a href="/#">Contacto</a></li>
          </ul>
      </nav>

      {/*Contenido Principal*/}
      <section id="content" className="content">
         <Listado />
      </section>

      {/*Barra lateral*/}
      <aside className="lateral">
        <Buscador />

        <Crear />
      </aside>

      {/*Pie de Pagina*/}
      <footer className="footer">
        &copy; BalgitPelis - <a href="https://www.youtube.com/@balgittuber9815">BalgitTuber</a>
      </footer>
  </div>);
}

export default App;