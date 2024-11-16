export const Listado = ({ articles }) => {
  return articles.map((article) => (
    <article key={article._id} className="article-item">
      <div className="mask">
        <img
          src={article.image || "default-image-url.jpg"}
          alt={article.title}
        />
      </div>
      <div className="datos">
        <h3 className="title">{article.title}</h3>
        <p className="description">{article.content}</p>

        <button className="edit">Editar</button>
        <button className="delete">Eliminar</button>
      </div>
    </article>
  ));
};
