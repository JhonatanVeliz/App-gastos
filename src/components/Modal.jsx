import React, { useEffect, useState } from 'react';
import { MensajeError } from "./MensajeError";
import IconoCerrar from "../img/cerrar.svg";

export const Modal = ({ setModal, guardarGasto, disponible, gastoEditar, setGastoEditar }) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('categorias');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);

    const [tituloGasto, setTituloGasto] = useState('Nuevo Gasto');
    const [textBtnAñadir, setTextBtnAñadir] = useState('Añadir');

    const [mensaje, setMensaje] = useState('');

    useEffect(()=> {
        if(gastoEditar.nombre){
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id);
            setIsUpdate(true);

            setTituloGasto('Editar Gasto');
            setTextBtnAñadir('Actualizar');
        }
    }, [gastoEditar])

    const cerrarModal = ()=>{
        setModal(false)
        setGastoEditar({});
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('') || Number(nombre) || categoria === 'categorias'){
            setMensaje('datos inválidos');
            return setTimeout(()=> setMensaje(''), 2500);
        }else if(Number(cantidad) > disponible){
            setMensaje('Presupuesto insuficiente');
            return setTimeout(()=> setMensaje(''), 2500);
        }else{
            guardarGasto({nombre, cantidad, categoria, id, fecha, isUpdate})
            setModal(false);
            setGastoEditar({});
        }

    }

  return (
    <aside className='modal-container'>

        <div className='icon modal__btn-cerrar' onClick={cerrarModal}>
            <img src={IconoCerrar} alt="cerrar modal" />
        </div>

        <form action="" className='modal' onSubmit={handleSubmit}>

            <legend className="modal__title subtitle--white">{tituloGasto}</legend>

            {mensaje &&  <MensajeError children={mensaje} error={'error'}/>}

            <label className='modal__label' htmlFor="gasto">Nombre Gasto:</label>
            <input type="text" 
            className='modal__input' 
            placeholder='Añadir nombre de gasto'
            id='gasto'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            autoComplete='off'
            />

            <label className='modal__label' htmlFor="cantidad">Cantidad:</label>
            <input type="number" 
            className='modal__input' 
            placeholder='Añadir una cantidad' 
            d='cantidad'
            value={cantidad}
            onChange={e => setCantidad(Number(e.target.value))}
            />

            <label className='modal__label' htmlFor="filtrar">Filtrar Gastos:</label>

            <select name="" 
                id="categorias" 
                className='modal__select'
                defaultValue={categoria}
                onChange={e => setCategoria(e.target.value)}
            >

                <option value="categorias" disabled>-- Seleccionar Categoria --</option>

                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="casa">Casa</option>
                <option value="varios">Gastos Varios</option>
                <option value="ocio">Ocio</option>
                <option value="salud">Salud</option>
                <option value="suscripciones">suscripciones</option>

            </select>

            <input type="submit" className='modal__btn btn' value={textBtnAñadir}/>
        </form>
    </aside>
  )
}
