import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Inicio } from "../components/pages/Inicio";
import { Articulos } from "../components/pages/Articulos";
import { Crear } from "../components/pages/Crear";
import { Articulo } from "../components/pages/Articulo";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";

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
          <Route path="*" element={<Navigate to="/404" />}></Route>
        </Routes>
      </section>
      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
