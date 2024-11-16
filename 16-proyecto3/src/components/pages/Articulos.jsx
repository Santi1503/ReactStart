import { useState, useEffect } from "react";
import { GlobalVariables } from "../../Helpers/GlobalVariables";
import { Petition } from "../../Helpers/Petition";
import { Listado } from "./Listado";

export const Articulos = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const receiveArticles = async () => {
      try {
        const { data } = await Petition(
          GlobalVariables.url + "articulos",
          "GET"
        );

        if (data.status === "success") {
          setArticles(data.articles);
        } else {
          console.error("Error en la respuesta del servidor:", data.message);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error en el fetch:", error.message);
      }
    };

    receiveArticles();
  }, []);

  return (
    <>
      {loading ? (
        "Cargando..."
      ) : articles.length > 0 ? (
        <Listado articles={articles} setArticles={setArticles} />
      ) : (
        <p>No hay artículos disponibles.</p>
      )}
    </>
  );
};
