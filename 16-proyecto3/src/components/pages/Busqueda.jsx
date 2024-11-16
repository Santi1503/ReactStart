import { useState, useEffect } from "react";
import { GlobalVariables } from "../../Helpers/GlobalVariables";
import { useParams } from "react-router-dom";
import { Petition } from "../../Helpers/Petition";
import { Listado } from "./Listado";

export const Busqueda = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    receiveArticles();
  }, []);

  useEffect(() => {
    receiveArticles();
  }, [params]);

  const receiveArticles = async () => {
    try {
      const { data } = await Petition(
        GlobalVariables.url + "search/" + params.busqueda,
        "GET"
      );

      if (data.status === "success") {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error en el fetch:", error.message);
    }
  };

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
