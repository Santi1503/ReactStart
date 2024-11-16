import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Inicio } from "../components/pages/Inicio";
import { Articulos } from "../components/pages/Articulos";
import { Crear } from "../components/pages/Crear";
import { Articulo } from "../components/pages/Articulo";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Busqueda } from "../components/pages/Busqueda";

export const BlogRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />

      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />}></Route>
          <Route path="/articulos" element={<Articulos />}></Route>
          <Route path="/crear-articulo" element={<Crear />}></Route>
          <Route path="/articulo" element={<Articulo />}></Route>
          <Route path="/buscar/:busqueda" element={<Busqueda />}></Route>
          <Route
            path="*"
            element={
              <div className="jumbo">
                <h1>Error 404</h1>
                <p>La pagina a la que se quiere acceder no existe</p>
              </div>
            }
          ></Route>
        </Routes>
      </section>
      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
