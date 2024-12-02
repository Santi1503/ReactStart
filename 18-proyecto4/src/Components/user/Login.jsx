import { useState } from "react";
import { Global } from "../../Helpers/Global";
import { useForm } from "../../Hooks/useForm";
import useAuth from "../../Hooks/useAuth";

export const Login = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();

    if (data.status == "success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSaved("login");

      setAuth(data.user);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content_post">
        {saved == "login" ? (
          <strong className="alert alert-success">
            Inicio de sesión exitoso
          </strong>
        ) : (
          ""
        )}

        {saved == "error" ? (
          <strong className="alert alert-danger">
            Ha ocurrido un error al iniciar sesión
          </strong>
        ) : (
          ""
        )}

        <form className="form-login" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              onChange={changed}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contaseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              onChange={changed}
            />
          </div>

          <input
            type="submit"
            value="Identificate"
            className="btn btn-success"
          />
        </form>
      </div>
    </>
  );
};
