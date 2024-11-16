import { useEffect, useState } from "react";
import { useForm } from "../../Hooks/useForm";
import { Petition } from "../../Helpers/Petition";
import { GlobalVariables } from "../../Helpers/GlobalVariables";
import { useParams } from "react-router-dom";

export const Editar = () => {
  const { formulario, cambiado } = useForm([]);
  const [result, setResult] = useState("no_enviado");
  const [article, setArticle] = useState([]);
  const params = useParams();

  useEffect(() => {
    receiveArticle();
  });

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
    } catch (error) {
      console.error("Error en el fetch:", error.message);
    }
  };

  const editArticle = async (e) => {
    e.preventDefault();

    const newArticle = formulario;

    const { data } = await Petition(
      GlobalVariables.url + "articulo/" + params.id,
      "PUT",
      newArticle
    );

    if (data.status === "success") {
      setResult("guardado");
    } else {
      setResult("error");
    }
    const fileInput = document.querySelector("#file");

    if (data.status === "success" && fileInput.files[0]) {
      setResult("guardado");

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const upload = await Petition(
        GlobalVariables.url + "subir-imagen/" + data.article._id,
        "POST",
        formData,
        true
      );

      if (upload.data.status === "success") {
        setResult("guardado");
      } else {
        setResult("error");
      }
    }
  };

  return (
    <div className="jumbo">
      <h1>Editar artículo</h1>
      <p>Formulario para editar: {article.title}</p>

      <strong>
        {result == "guardado" ? "Artículo editado correctamente" : ""}
      </strong>
      <strong>
        {result == "error" ? "Los datos proporcionados son incorrectos" : ""}
      </strong>
      <form className="form" onSubmit={editArticle}>
        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            defaultValue={article.title}
            onChange={cambiado}
          />

          <label htmlFor="content">Contenido</label>
          <textarea
            type="text"
            name="content"
            defaultValue={article.content}
            onChange={cambiado}
          />

          <label htmlFor="file0">Imagen</label>
          <div className="mask">
            {article.image && (
              <img src={GlobalVariables.url + "imagen/" + article.image} />
            )}
            {!article.image && (
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png" />
            )}
          </div>
          <input type="file" name="file0" id="file" />
        </div>

        <input type="submit" value="Save" className="btn btn-success" />
      </form>
    </div>
  );
};
