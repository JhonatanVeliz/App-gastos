import React from 'react';

import { Gasto } from "./Gasto";

export const ListadoGastos = ({ gastos, setGastoEditar, handlerModal, eliminarGasto}) => {
  return (
    <div>
        <header>
            <h3 className="subtitle subtitle--violet">{gastos.length ? 'Gastos' : 'No hay Gastos'}</h3>
        </header>

        <section className='gastos-layout'>
            {
                gastos.map( gasto => (
                  <Gasto key={gasto.id} 
                         children={gasto}
                         setGastoEditar={setGastoEditar}
                         handlerModal={handlerModal}
                         eliminarGasto={eliminarGasto}
                  />
                ))
            }
        </section>
    </div>
  )
}
