import React from 'react'
import { works } from '../data/works'
import { Link } from 'react-router-dom'

export const Portfolio = () => {
  return (
    <div className='page'>
      <h1 className='heading'>Portafolio</h1>

      {
        works.map(work => {
          return (
            <article key={work.id}>
              <span>{work.categorias}</span>
              <h2><Link to={"/proyecto/"+work.id}>{work.nombre}</Link></h2>
              <h3>{work.tecnologias}</h3>
            </article>
          )
          
        })
      }
    </div>
  )
}
