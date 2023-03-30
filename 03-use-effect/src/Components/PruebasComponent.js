import React, {useState, useEffect} from 'react'
import { MontarDesmontar } from './MontarDesmontar';
export const PruebasComponent = () => {

  const [usuario, setUsuario] = useState("Tu Nombre");
  const [contador, setContador] = useState(0);

  const modUsuario = e =>{
    setUsuario(e.target.value);
    setContador(contador+1)
    console.log("Se ha modificado el usuario: " +contador + " veces");
  }

  useEffect(()=>{
    console.log("Bienvenido a la página de inicio")
  }, [])

  return (
    <div>
        <h1 className={ usuario === "Santiago Gómez de la Torre" ? 'title-pass' : 'title'}>Let the Journey Begin</h1>

        <span><strong className='label'>{usuario}</strong></span>
        <p>
          <input className='input' type="text" 
                 onChange={modUsuario} 
                 placeholder="Dime tu nombre " />
        </p>

        { usuario === "Santi chiquito" && <MontarDesmontar />}
    </div>
  )
}
