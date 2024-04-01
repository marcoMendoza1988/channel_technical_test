import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ChannelHeader from '../../molecules/ChannelHeader';
import Channels from '../../molecules/Channels';
import { formatTimeHeroBanner } from '../../../lib';

type Channel = {
  id: never;
  image: never;
}

const TVSchedule: React.FC = () => {
  const [ channels, setChannels ] = React.useState([]);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [heroBanner, setHeroBanner] = React.useState<any>({});
  const [ generateHours, setGenerateHours ] = React.useState<string[]>([]);

  const channelApi = useSelector((state: any) => state.channels);
  const slider = useRef<any>(null);

  useEffect(() => {
    if(channelApi?.channels){
      const channelFilter = channelApi.channels?.filter(({id, image}: Channel) => {return {id, image}})
      setChannels(channelFilter);
    }
  }, [channelApi]);

  function generarHoras() {
    let horas = [];
    let fechaActual = new Date(); 
    let horaActual = fechaActual.getHours(); 
    let minutosActuales = fechaActual.getMinutes(); 
  
    let minutosRedondeados = Math.ceil(minutosActuales / 30) * 30;
  
    if (minutosRedondeados === 60) {
      horaActual++;
      minutosRedondeados = 0;
    }
  
    // horaActual--;
  
    if (horaActual < 0) {
      horaActual = 23;
    }
  
    for (let i = 0; i < 96; i++) {
      horas.push(`${horaActual.toString().padStart(2, '0')}:${minutosRedondeados.toString().padStart(2, '0')}`);
  
      minutosRedondeados += 30;
  
      if (minutosRedondeados === 60) {
        horaActual++;
        minutosRedondeados = 0;
      }
  
      if (horaActual === 24) {
        horaActual = 0;
      }
    }
  
    return horas;
  }  

  useEffect(() => {
    setGenerateHours(generarHoras().slice((slideIndex), (6 + slideIndex)))
  }, [slideIndex]);

  return (
    generateHours.length > 0 ? <>
    <div className='h-2/6'>
      <div className='w-3/6'>
        {
          Object.keys(heroBanner).length > 0 && 
            <>
              <h3 className='text-2xl font-semibold'>{heroBanner?.name}</h3><br/>
              <h5 className='text-md'>{heroBanner?.date_begin}hs a {heroBanner?.date_end}hs {formatTimeHeroBanner(heroBanner?.duration)}</h5>
              <span className='text-md'>{heroBanner?.description}</span>
            </>
        }
      </div>
      <div className='w-3/6'></div>
    </div>
    <div className="flex flex-col h-4/6">
      <div className="flex-grow overflow-auto" style={{ height: '80vh' }}>
        <ChannelHeader generateHours={generateHours} ref={slider} setSlideIndex={setSlideIndex} slideIndex={slideIndex}/>
        <Channels channels={channels} setHeroBanner={setHeroBanner} ref={slider}/>
      </div>
    </div>
    </> : null
  );
};

export default TVSchedule;
