import { useEffect, useState } from 'react'
import Modal from './components/organisms/Modal';
import TVSchedule from './components/organisms/TVSchedule';
import { useDispatch } from 'react-redux';
import { setChannels, setError, setLoading } from './api/channelAPI';
import { getToday, getTomorrow } from './lib';
import { useSelector } from 'react-redux';
import movie from './assets/movie.svg';
import serverDown from './assets/server_down.svg';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const response = useSelector((state: any) => state.channels);
  const loading = useSelector((state: any) => state.channels.loading);
  const error = useSelector((state: any) => state.channels.error);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchChannel = async() => {
    dispatch(setLoading(true));
    try {
        const today  = getToday();
        const tomorrow = getTomorrow();
        const response = await fetch(`https://mfwkweb-api.clarovideo.net/services/epg/channel?device_id=web&device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=guatemala&HKS=web61144bb49d549&user_id=54343080&date_from=${today}&date_to=${tomorrow}&quantity=200`);
      
      if (!response.ok) {
        throw new Error('No se pudieron cargar las tareas.');
      }
      const data = await response.json();
      dispatch(setChannels(data));
      dispatch(setLoading(false))
    } catch (error: any) {
      dispatch(setError(error?.message));
      dispatch(setLoading(false));
    }
};

  useEffect(() => {
    fetchChannel();
  }, []);

  return (
    response ? <>
      <div className="flex flex-col justify-center items-center h-screen gap-2 bg-gray-100">
        {!error ? <img src={movie} width={480} alt='movie time'/>
        :
        <img src={serverDown} width={480} alt='movie time'/>}
        {!error ? <button
          disabled={loading}
          onClick={openModal}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Cargando lista de canales...' : 'Mostrar EPG'}
        </button> : <span>Error de servicio</span>}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <TVSchedule />
        </Modal>
      </div>
    </> : null
  )
}

export default App
