import React from 'react';
import { Formulario } from "./Formulario";
import { ControlPresupuesto } from './ControlPresupuesto';

export const Header = ({ 
    gastos, presupuesto, setPresupuesto, 
    isPresupuestoValid, setIsPresupuestoValid, 
    disponible, setDisponible,
    gastado, setGastado, resetApp}) => {

  return (
    <header className='header'>
      <h1 className='title title--principal'>Planificador de Gastos</h1>
      {
        isPresupuestoValid ? (
          <ControlPresupuesto 
          gastos={gastos}
          presupuesto={presupuesto}
          disponible={disponible}
          setDisponible={setDisponible}
          gastado={gastado}
          setGastado={setGastado}
          resetApp={resetApp}
          />
        ) : (
          <Formulario 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsPresupuestoValid={setIsPresupuestoValid}
          />
        )
      }
    </header>
    
  )
}
