import React, { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css";

export const ControlPresupuesto = ({gastos, presupuesto, disponible, setDisponible, gastado, setGastado, resetApp}) => {

  const [porcentaje, setPorcentaje] = useState(gastado);
  const [todoGastado, setTodoGastado] = useState(false);

  useEffect(()=>{

    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total ,0);
    setGastado(totalGastado);

    const cantidadDisponible = presupuesto - totalGastado;
    setDisponible(cantidadDisponible)

    const porcentajeActualizado = ( (presupuesto - cantidadDisponible) / presupuesto * 100 ).toFixed(2);
    setTimeout( () => setPorcentaje(porcentajeActualizado), 800)

  }, [gastos])

  useEffect(()=>{
    if(porcentaje === '100.00'){
        setTodoGastado(true);
    };
  }, [porcentaje])

  const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style : 'currency',
            currency : 'USD'
        })
  } 

  return (
    <div className='datos-presupuesto datos-contenedor'>
        
        <div className='grafica'>
            <CircularProgressbar
                value={porcentaje}
                text={`${porcentaje}%`}
                styles={buildStyles({
                    pathColor : '#1576ed',
                    trailColor : '#e5e5e5'
                })}
            />
        </div>

        <div className='presupuesto'>

            <button type='button' 
            className='btn btn-reset-app'
            onClick={resetApp}
            >Resetear App</button>

            <p className='presupuesto__title'>
                <span className='subtitle subtitle--blue'>Presupuesto: </span>
                <span className='texto'>{formatearCantidad(presupuesto)}</span>
            </p>

            <p className='presupuesto__title'>
                <span className='subtitle subtitle--blue'>Disponible: </span>
                <span className='texto'>{formatearCantidad(disponible)}</span>
            </p>
            
            <p className='presupuesto__title'>
                <span className='subtitle subtitle--blue'>Gastado: </span>
                <span className={`texto ${todoGastado ? 'todo-gastado' : ''}`}>
                    {formatearCantidad(gastado)}
                </span>
            </p>

        </div>

    </div>
  )
}
