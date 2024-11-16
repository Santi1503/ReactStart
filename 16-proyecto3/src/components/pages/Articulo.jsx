import { useState, useEffect } from "react";
import { GlobalVariables } from "../../Helpers/GlobalVariables";
import { Petition } from "../../Helpers/Petition";
import { useParams } from "react-router-dom";

export const Articulo = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    receiveArticle();
  }, []);

  const receiveArticle = async () => {
    try {
      const { data } = await Petition(
        GlobalVariables.url + "articulo/" + params.id,
        "GET"
      );

      if (data.status === "success") {
        setArticle(data.article);
      } else {
        console.error("Error en la respuesta del servidor:", data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error en el fetch:", error.message);
    }
  };

  return (
    <div className="jumbo">
      {loading ? (
        "Cargando..."
      ) : (
        <>
          <div className="mask">
            {article.image && (
              <img src={GlobalVariables.url + "imagen/" + article.image} />
            )}
            {!article.image && (
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png" />
            )}
          </div>
          <h1>{article.title}</h1>
          <span>{article.createdAt}</span>
          <p>{article.content}</p>
        </>
      )}
    </div>
  );
};
