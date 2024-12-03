import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "El nombre es demasiado corto")
    .max(40, "El nombre es demasiado largo")
    .required("Campo obligatorio"),
  email: Yup.string().email("Email Invalido").required("Campo Obligatorio"),
});

export const MiFormulario = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <h1>Fomulario con Formik</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
          />
          <div className="error">
            {formik.errors.nombre && formik.touched.nombre
              ? formik.errors.nombre
              : ""}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div className="error">
            {formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""}
          </div>
        </div>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};
