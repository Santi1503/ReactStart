import React from 'react'
import { useForm } from '../Hooks/useForm'

export const MiFormulario = () => {

    const {formulario, cambiado, enviado} = useForm({})

    return (
    <div>
      <h1>Formulario</h1>
      <p>Pagina de Formulario para guardar curso</p>
      <p>Curso guardado: {formulario.titulo} </p>
      <pre className='codigo'>{JSON.stringify(formulario)}</pre>

      <form onSubmit={enviado} className='mi-formulario'>
        <input type="text" name="titulo" onChange={cambiado} placeholder='Título del curso' />
        <input type="number" name="anio" onChange={cambiado} placeholder='Año de publicación' />
        <textarea name="descripcion" onChange={cambiado} placeholder='Descripción' />
        <input type="text" name="autor" onChange={cambiado} placeholder='Autor' />
        <input type="email" name="email" onChange={cambiado} placeholder='Correo de Contacto' />
        
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}
