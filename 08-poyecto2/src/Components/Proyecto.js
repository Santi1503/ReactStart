import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { works } from '../data/works'

export const Proyecto = () => {

    const [proyecto, setProyecto] = useState({})
    const params = useParams()

    useEffect(() => {
        let proyecto = works.filter(work => work.id === params.id)
        setProyecto(proyecto[0])
    }, [])
  return (
    <div className='page'>
        <h1 className='heading'>{params.nombre}</h1>
    </div>
  )
}
