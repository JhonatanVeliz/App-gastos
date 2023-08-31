import React, { useState } from 'react';

import { LeadingActions, SwipeableList, 
        SwipeableListItem, SwipeAction, 
        TrailingActions} 
from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css"

import comida from "../img/icono_comida.svg";
import gastos_varios from "../img/icono_gastos.svg";
import ocio from "../img/icono_ocio.svg";
import ahorro from "../img/icono_ahorro.svg";
import casa from "../img/icono_casa.svg";
import salud from "../img/icono_salud.svg";
import suscripciones from "../img/icono_suscripciones.svg";

const imgs = { comida, gastos_varios, ocio, ahorro, casa, salud, suscripciones };

export const Gasto = ({children, setGastoEditar, handlerModal, eliminarGasto }) => {

    const { nombre, cantidad, categoria, fecha, id } = children;

    const [animacion, setAnimacion] = useState(false);

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={()=> {
                setGastoEditar(children);
                handlerModal();
            }}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
            onClick={()=> eliminarGasto(id)}
            destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    const animar = () => {
        setAnimacion(true)

        setTimeout(() => setAnimacion(false), 2700);
    }

  return (
    <SwipeableList>
        <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>

            <article className={`gasto ${animacion ? 'gasto-mover' : ''}`} onClick={animar} title='Arrastrame'>

                <div className="gasto__datos">
                    <img src={imgs[categoria] || gastos_varios} alt="imagen" className='gastos__datos__img'/>

                    <div className="gasto__datos__info">
                        <h4 className='gastos__datos__info__title'>{categoria}</h4>
                        <p className="gastos__datos__asunto">{nombre}</p>
                        <p className='gastos__datos__fecha'>Agregado El: <span>{fecha}</span></p>
                    </div>
                </div>

                <p className='subtitle gastos__datos__cantidad'>$ {cantidad}</p>
            </article>

        </SwipeableListItem>
    </SwipeableList>
  )
}
