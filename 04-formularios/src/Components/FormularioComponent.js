import React from 'react'

export const FormularioComponent = () => {
  return (
    <div>
      <h2 className='title'>Let The Journey Begin</h2>
      
      <span>
        <form className='form'>
          <p>
            <input className='name' type='text' placeholder='Nombre' />
          </p>
          <p>
            <input className='name' type='text' placeholder='Apellidos' />
          </p>
          <p>
            <select className='gender'>
              <option value="null">Sexo</option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </p>
          <button className='submit'>Submit</button>
        </form>
      </span>
        
    </div>
  )
}
