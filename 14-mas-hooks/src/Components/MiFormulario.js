import React, { useState} from 'react'

export const MiFormulario = () => {

    const [formulario, setFormulario] = useState({})
    const enviado = (e) => {
        e.preventDefault()

        let curso = {
            titulo: e.target.titulo.value,
            anio: e.target.anio.value,
            descripcion: e.target.descripcion.value,
            autor: e.target.autor.value,
            email: e.target.email.value
        }

        setFormulario(curso)
    }

    return (
    <div>
        <h1>Formulario</h1>
        <p>Pagina de Formulario para guardar curso</p>
        <p>Curso guardado: </p>
        <pre>{JSON.stringify(formulario)}</pre>
      <form onSubmit={enviado} className='mi-formulario'>
        <input type="text" name="titulo" placeholder='Título del curso' />
        <input type="number" name="anio" placeholder='Año de publicación' />
        <textarea name="descripcion" placeholder='Descripción' />
        <input type="text" name="autor" placeholder='Autor' />
        <input type="email" name="email" placeholder='Correo de Contacto' />
       
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}
