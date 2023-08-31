import React from 'react'

export const Filtros = ({ filtro, setFiltro }) => {
  return (
    <form className='filtro'>
        <legend className='filtro__title'>Filtrar Gastos</legend>
        <select 
          defaultValue={filtro}
          onChange={e => setFiltro(e.target.value)}
          className='filtro__select'>
            <option value="">-- Todos --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="varios">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">suscripciones</option>
        </select>
    </form>
  )
}