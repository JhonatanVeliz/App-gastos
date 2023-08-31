export const generarId = ()=>{
    const random = Math.random().toString(36).substr(2);
    const date = Date.now().toString(36);
    return random + date
}

export const formatoFecha = fecha =>{
    const fechaAhora = new Date(fecha);

    const formato = {
        year  : 'numeric',
        month : 'long',
        day   : '2-digit'
    }

    return fechaAhora.toLocaleDateString('es-ES', formato);
}