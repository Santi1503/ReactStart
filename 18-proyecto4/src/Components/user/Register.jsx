export const Register = () => {
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>

      <div className="content_post">
        <form className="register-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" name="surname" />
          </div>

          <div className="form-group">
            <label htmlFor="nickname">Nickname</label>
            <input type="text" name="nickname" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>

          <input type="submit" value="Registrate" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
