import { useEffect, useState } from 'react';

import { Header } from "./components/Header";
import { ListadoGastos } from "./components/ListadoGastos";
import { Filtros } from "./components/Filtros";
import { Modal } from "./components/Modal";
import { generarId, formatoFecha } from "./helpers/";

import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {

  const presupuestoStorage = localStorage.getItem('presupuesto');
  const [presupuesto, setPresupuesto] = useState(Number(presupuestoStorage));

  const [isPresupuestoValid, setIsPresupuestoValid] = useState(false);
  const [disponible, setDisponible] = useState(presupuesto);
  const [gastado, setGastado] = useState(0);

  const gastosStorage = JSON.parse(localStorage.getItem('gastos'));
  const [gastos, setGastos] = useState(gastosStorage || []);

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const [gastoEditar, setGastoEditar] = useState({});

  const [modal, setModal] = useState(false);

  const guardarGasto = gasto => {
    
    if(gasto.isUpdate){
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastosFiltrados([gasto]);
      setGastoEditar({});
    }else{
      gasto.id = generarId();
      gasto.fecha = formatoFecha(Date.now());
      setGastos(eachGasto => [...eachGasto, gasto])
    }

  };

  const eliminarGasto = id =>{
    const gastoEliminado = gastos.filter( gasto => gasto.id != id)

    setGastos(gastoEliminado);
  }

  const resetApp = () => {
    localStorage.removeItem('presupuesto');
    localStorage.removeItem('gastos');

    setPresupuesto(0);
    setDisponible(0);
    setGastado(0);
    setGastos([])
    setIsPresupuestoValid(false);
  }

  const handlerModal = () => {
    setModal(true)
  }

  useEffect(() => {
    localStorage.getItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto])

  useEffect(() => {
    if(Number(presupuesto) > 0){
      setIsPresupuestoValid(true);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos]);

  useEffect(()=>{
    if(filtro){
      const gastosFiltrados = gastos.filter( eachGasto => filtro === eachGasto.categoria);

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  return (

    <div>

      <Header 
      gastos={gastos}
      presupuesto={presupuesto} 
      setPresupuesto={setPresupuesto}
      isPresupuestoValid={isPresupuestoValid}
      setIsPresupuestoValid={setIsPresupuestoValid}
      disponible={disponible}
      setDisponible={setDisponible}
      gastado={gastado}
      setGastado={setGastado}
      resetApp={resetApp}
      />

      {
        isPresupuestoValid && (
          <>
            <main className='gastos-container'>
              <Filtros filtro={filtro} setFiltro={setFiltro} />
              {
                filtro 
                ? (
                  <ListadoGastos 
                    gastos={gastosFiltrados}
                    setGastoEditar={setGastoEditar}
                    handlerModal={handlerModal}
                    eliminarGasto={eliminarGasto}
                  />
                )
                : (
                    <ListadoGastos 
                      gastos={gastos}
                      setGastoEditar={setGastoEditar}
                      handlerModal={handlerModal}
                      eliminarGasto={eliminarGasto}
                    />
                )
              }
            </main>

            <div className='nuevo-gasto icon'>
              <img 
              src={IconoNuevoGasto}
              alt="nuevo gasto"
              onClick={handlerModal}
              />
            </div>
          </>
        )
      }

      {
        modal && (
          <Modal 
          setModal={setModal} 
          guardarGasto={guardarGasto}
          presupuesto={presupuesto}
          disponible={disponible}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          />
        )
      }

    </div>

  )
}

export default App
