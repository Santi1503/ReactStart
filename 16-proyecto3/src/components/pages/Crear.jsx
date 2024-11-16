import { useState } from "react";
import { useForm } from "../../Hooks/useForm";
import { Petition } from "../../Helpers/Petition";
import { GlobalVariables } from "../../Helpers/GlobalVariables";

export const Crear = () => {
  const { formulario, cambiado } = useForm({});
  const [result, setResult] = useState("no_enviado");

  const saveArticle = async (e) => {
    e.preventDefault();

    const newArticle = formulario;

    const { data } = await Petition(
      GlobalVariables.url + "crear",
      "POST",
      newArticle
    );

    if (data.status === "success") {
      setResult("guardado");

      const fileInput = document.querySelector("#file");

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const upload = await Petition(
        GlobalVariables.url + "subir-imagen/" + data.article._id,
        "POST",
        formData,
        true
      );

      if (upload.status === "success") {
        setResult("guardado");
      } else {
        setResult("error");
      }
    } else {
      setResult("error");
    }
  };

  return (
    <div className="jumbo">
      <h1>Crear artículo</h1>
      <p>Formulario para crear artículo</p>

      <strong>
        {result == "guardado" ? "Artículo creado correctamente" : ""}
      </strong>
      <strong>
        {result == "error" ? "Los datos proporcionados son incorrectos" : ""}
      </strong>
      <form className="form" onSubmit={saveArticle}>
        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input type="text" name="title" onChange={cambiado} />

          <label htmlFor="content">Contenido</label>
          <textarea type="text" name="content" onChange={cambiado} />

          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id="file" />
        </div>

        <input type="submit" value="Save" className="btn btn-success" />
      </form>
    </div>
  );
};
