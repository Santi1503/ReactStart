import React from 'react'

export const SegundoComponente = () => {

    const juegos = ["Call of Duty", "GTA V", "Minecraft"];
    //const juegos = [];
    
  
    return (
    <div className='SegundoComponente'>
        <h2>Estos son los juegos del año</h2>

        {juegos.length >= 1 ? 
        
            (<ul>
                {
                    juegos.map((juegos,historia) => {
                        return <li key={historia}>{juegos}</li>
                    })
                }
            </ul>)
            :(<p>No hay juegos</p>)
        }
    </div>
  )
}
