import React, { useState } from 'react'

export const Formulario = ({ presupuesto, setPresupuesto, setIsPresupuestoValid }) => {

    const [mensaje, setMensaje] = useState('Añadir un Presupuesto');

    const validacionFormulario = (e) => {
        e.preventDefault();
  
        if(!Number(presupuesto) || Number(presupuesto) <= 0){
        return setMensaje('Porfavor ingrese una cantidad valida');
        }

        setMensaje('Añadir un Presupuesto');
        setPresupuesto(Number(presupuesto));
        localStorage.setItem('presupuesto', presupuesto);
        setIsPresupuestoValid(true)
    }

  return (
    <form className='form datos-contenedor' onSubmit={validacionFormulario}>

        <label htmlFor="" className='form__texto'>{mensaje}</label>

        <input type="number" className='form__presupuesto'
               placeholder='Ingresar presupuesto'
               onChange={(e) => setPresupuesto(e.target.value)}
        />

        <input type="submit" value="Añadir" className='form__btn btn'/>
    </form>
  )
}