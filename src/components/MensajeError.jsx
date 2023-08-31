import React from 'react'

export const MensajeError = ({children, error}) => {
  return (
    <div className={`${error}`}>
        <h3 className='mensaje'>{children}</h3>
    </div>
  )
}
