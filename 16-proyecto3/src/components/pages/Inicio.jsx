import { Link } from "react-router-dom";

export const Inicio = () => {
  return (
    <div className="jumbo">
      <h1>Bienvenido al Blog del bloggero</h1>
      <p>Blog desarrollado con el MERN Stack</p>
      <Link to="/articulos" className="button">
        Ver articulos
      </Link>
    </div>
  );
};
