
export const getToday = () => {
    const fecha = new Date(); 
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minuto = String(fecha.getMinutes()).padStart(2, '0');
    const segundo = String(fecha.getSeconds()).padStart(2, '0');

    const fechaEnFormatoDeseado = `${año}${mes}${dia}${hora}${minuto}${segundo}`;

    return fechaEnFormatoDeseado;
  }

  export const getTomorrow = () => {
    const fecha = new Date(); 
    fecha.setDate(fecha.getDate() + 1); 

    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); 
    const dia = String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minuto = String(fecha.getMinutes()).padStart(2, '0');
    const segundo = String(fecha.getSeconds()).padStart(2, '0');

    const fechaEnFormatoDeseado = `${año}${mes}${dia}${hora}${minuto}${segundo}`;

    return fechaEnFormatoDeseado;
  }


export const timeFormat = (time: string) => {
    const date = time;
    const hour = date.split(" ")[1]; 
    const formatedHour = hour.split(":").slice(0, 2).join(":");

    return formatedHour + ':00';
}

function convertirAHorasASegundos(hora: string) {
    const [horas, minutos, segundos] = hora.split(':').map(Number);
    return horas * 3600 + minutos * 60 + segundos;
}

function convertirDuracionASegundos(duracion: string) {
    const [horas, minutos, segundos] = duracion.split(':').map(Number);
    return horas * 3600 + minutos * 60 + segundos;
}

const realTime = () => {
    const ahora = new Date();
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();
    const horaActual = `${hora}:${minutos}:${segundos}`;

    return horaActual;
}

export const handler = (start_time: string, hora: string, widthPorHora:number, end_time: string, index: number) => {
    const timeStamp = realTime();
    let horaInicioSegundos = null;
    let horaActualSegundos = null;
    
    if(index === 0){
        horaInicioSegundos = convertirAHorasASegundos(timeFormat(start_time));
        horaActualSegundos = convertirAHorasASegundos(timeStamp);
    }else {
        horaInicioSegundos = convertirAHorasASegundos(timeFormat(end_time));
        horaActualSegundos = convertirAHorasASegundos(timeFormat(start_time));
    }

    const diferenciaSegundos = horaActualSegundos - horaInicioSegundos;
    const duracionTotalSegundos = convertirDuracionASegundos(hora);

    const tiempoRestanteSegundos = duracionTotalSegundos - diferenciaSegundos;

    const horasRestantes = Math.floor(tiempoRestanteSegundos / 3600);
    const minutosRestantes = Math.floor((tiempoRestanteSegundos % 3600) / 60);
    
    const duracionTotalMinutos = (horasRestantes * 60) + minutosRestantes;
    const width = (duracionTotalMinutos / 60) * widthPorHora;
    return {width, widthPorHora}
}

export const ajustarAnchoDiv = (start_time: string, hora: string, widthPorHora:number, end_time: string, index: number) => {
    const timeStamp = realTime();
    let horaInicioSegundos = null;
    let horaActualSegundos = null;
    
    if(index === 0){
        horaInicioSegundos = convertirAHorasASegundos(timeFormat(start_time));
        horaActualSegundos = convertirAHorasASegundos(timeStamp);
    }else {
        horaInicioSegundos = convertirAHorasASegundos(timeFormat(end_time));
        horaActualSegundos = convertirAHorasASegundos(timeFormat(start_time));
    }

    const diferenciaSegundos = horaActualSegundos - horaInicioSegundos;
    
    const duracionTotalSegundos = convertirDuracionASegundos(hora);

    const tiempoRestanteSegundos = duracionTotalSegundos - diferenciaSegundos;

    const horasRestantes = Math.floor(tiempoRestanteSegundos / 3600);
    const minutosRestantes = Math.floor((tiempoRestanteSegundos % 3600) / 60);
    
    const duracionTotalMinutos = (horasRestantes * 60) + minutosRestantes;
    const width = (duracionTotalMinutos / 60) * widthPorHora;
    
    return width;
}


export const calcularTiempoRestante = (begin_time: any, meeting_time: any, current_time: string) => {
    const [begin_hour, begin_minute] = begin_time.split(':').map(Number);
    const begin_total_minutes = begin_hour * 60 + begin_minute;

    const [meeting_hour, meeting_minute, meeting_second] = meeting_time.split(':').map(Number);
    const meeting_total_minutes = meeting_hour * 60 + meeting_minute + meeting_second / 60;

    const [current_hour, current_minute] = current_time.split(':').map(Number);
    const current_total_minutes = current_hour * 60 + current_minute;

    const end_total_minutes = begin_total_minutes + meeting_total_minutes;

    const remaining_total_minutes = end_total_minutes - current_total_minutes;

    const remaining_hours = Math.floor(remaining_total_minutes / 60);
    const remaining_minutes = remaining_total_minutes % 60;

    return remaining_hours+':'+remaining_minutes;
}

export const getSizeDiv = () => {
    const div = document.querySelector('.getSize');

    if (div === null) {
        return { ancho: 128, alto: 96 };
    }
    const estilos = window.getComputedStyle(div);
    const ancho = parseInt(estilos.getPropertyValue('width'), 10);
    const alto = parseInt(estilos.getPropertyValue('height'), 10);

    return { ancho, alto };
}

export const formatTimeHeroBanner = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
  
    let formattedTime = '';
  
    if (hours > 0) {
      formattedTime += `${hours} ${hours === 1 ? 'h' : 'hs'} `;
    }
  
    if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes}min`;
    }
  
    return formattedTime.trim();
}
