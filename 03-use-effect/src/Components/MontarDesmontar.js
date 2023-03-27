import React, { useEffect } from 'react'
import logo from '../img/SantiChiquito.jpg'

export const MontarDesmontar = () => {


  useEffect (() => {
    alert("Has encontrado a Santi chiquito")

    return () => {
      alert("Se fue Santi chiquito")
    }
  }, []);

  return (
    <div>
        <h2>Santi chiquito</h2>
        <img className='image' src={logo} placeholder='image' />
    </div>
  )
}
