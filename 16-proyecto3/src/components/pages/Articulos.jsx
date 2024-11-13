export const Articulos = () => {
  return (
    <>
      <article className="article-item">
        <div className="mask">
          <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fec.linkedin.com%2Fpub%2Fdir%2FSantiago%2FGomez%2BDe%2BLa%2BTorre&psig=AOvVaw3VAG19Gsebf9pkXYve4dgm&ust=1731622925931000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKierKKs2okDFQAAAAAdAAAAABAb" />
        </div>
        <div className="datos">
          <h3 className="title">Meteoro - Speedracer</h3>
          <p className="description">Mejor article de la historia</p>

          <button className="edit">Editar</button>
          <button className="delete">Eliiminar</button>
        </div>
      </article>

      <article className="article-item">
        <h3 className="title">Shrek 2</h3>
        <p className="description">Puedes callarte por solo 5 minutos</p>

        <button className="edit">Editar</button>
        <button className="delete">Eliiminar</button>
      </article>

      <article className="article-item">
        <h3 className="title">Dragon Ball Broly</h3>
        <p className="description">article-culon</p>

        <button className="edit">Editar</button>
        <button className="delete">Eliiminar</button>
      </article>

      <article className="article-item">
        <h3 className="title">Sword Art Online</h3>
        <p className="description">Perdio mis espectativas</p>

        <button className="edit">Editar</button>
        <button className="delete">Eliiminar</button>
      </article>
    </>
  );
};
