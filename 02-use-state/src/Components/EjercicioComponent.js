import React, {useState} from 'react'
import PropTypes from 'prop-types'

export const EjercicioComponent = ({year}) => {

    const [yearNow, setYearNow] = useState(year);

    const nextYear = e => {
        setYearNow(yearNow + 1);
    }

    const lastYear = e => {
        setYearNow(yearNow - 1);
    }

    const actualYear = e => {
        setYearNow(year);
    }

    const changeYear = e => {
        let data = parseInt(e.target.value);
        
        if(Number.isInteger(data)) {
            setYearNow(data);
        }else {
            setYearNow(year);
        }
        
    }

  return (
    <div>
        <h1 className="EjercicioReact">The Journey Just Began</h1>
        <p><strong className='label'>
            {yearNow}
        </strong></p>
        <span>
            <button onClick={lastYear} className='lastYear'>Viajar un año atras</button>
            &nbsp;
            <button onClick={actualYear} className='actualYear'>Viajar al año actual</button>
            &nbsp;
            <button onClick={nextYear} className='nextYear'>Viajar un año adelate</button>
        </span>
        <span>
            <h4 className='changeYear'>Cambia al año que quieras: 
            &nbsp;
            <input onChange={changeYear} type='text' placeholder='Año' className='year'></input>
            </h4>
        </span>
        <hr />
    </div>
  )
}


EjercicioComponent.propTypes = {
    year: PropTypes.number.isRequired
}
