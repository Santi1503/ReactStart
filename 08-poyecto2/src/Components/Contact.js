import React from 'react'

export const Contact = () => {
  return (
    <div className='page'>
      <h1 className='heading'>Contacto</h1>

      <form className='contact' action="mailto:gomezdelatorre15@gmail.com">
        <input type='text' placeholder='Nombre' required />
        <input type='text' placeholder='Apellidos' required />
        <input type='email' placeholder='Email' required />
        <textarea  placeholder='Motivo de contacto' required />
        <input type='submit' value="Enviar" />
      </form>
    </div>
  )
}
