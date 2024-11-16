import { GlobalVariables } from "../../Helpers/GlobalVariables";
import { Petition } from "../../Helpers/Petition";
import { Link } from "react-router-dom";

export const Listado = ({ articles, setArticles }) => {
  const deleteArticle = async (id) => {
    let { data } = await Petition(
      GlobalVariables.url + "articulo/" + id,
      "DELETE"
    );

    if (data.status === "success") {
      let articlesUpdated = articles.filter((article) => article._id !== id);

      setArticles(articlesUpdated);
    }
  };

  return articles.map((article) => (
    <article key={article._id} className="article-item">
      <div className="mask">
        {article.image && (
          <img src={GlobalVariables.url + "imagen/" + article.image} />
        )}
        {!article.image && (
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png" />
        )}
      </div>
      <div className="datos">
        <h3 className="title">
          <Link to={"/articulo/" + article._id}>{article.title}</Link>
        </h3>
        <p className="description">{article.content}</p>

        <Link to={"/editar/" + article._id} className="edit">
          Editar
        </Link>
        <button
          className="delete"
          onClick={() => {
            deleteArticle(article._id);
          }}
        >
          Eliminar
        </button>
      </div>
    </article>
  ));
};
