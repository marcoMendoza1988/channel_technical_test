import { forwardRef } from "react";

const ChannelHeader = forwardRef(function ChannelHeader ({generateHours, setSlideIndex, slideIndex}: any, ref: any){
    const updateSlider = () => {
        const slideWidth = 100;
        const newPosition = -slideIndex * slideWidth;
    
        for (let i = 0; i < ref.current?.children?.length; i++) {
          ref.current.children[i].style.transform = `translateX(${newPosition}px)`;
        }
    }

  const prevHandler = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(0);
    }
    updateSlider();
  }

  const nextHandler = () => {
    if (slideIndex < ref?.current?.childElementCount - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
    updateSlider();
  }

    return (
        <div className="flex flex-col gap-2 bg-black top-0 sticky p-2 z-0 w-full justify-around" style={{zIndex: 11}}>
          <div className="flex justify-end gap-2">
            <button className="px-2 py-0 text-sm" style={{backgroundColor: '#3c3c3c'}}>CANALES</button>
            <button className="px-2 py-0 text-sm" style={{backgroundColor: '#3c3c3c'}}>CATEGORIAS</button>
            <button className="px-2 py-0 text-sm" style={{backgroundColor: '#3c3c3c'}}>FAVORITOS</button>
          </div>
          <div className='flex bg-black w-full justify-center'>
            <div className="flex md:w-64">
                <div className='sticky top-0 text-sm w-32 md:w-32'></div>
                <div className='sticky top-0 text-sm w-32 md:w-32'>Hoy</div>
            </div>
            <div className="flex w-full">
                {
                    generateHours?.map((hour: string) => <div key={hour} className='w-full flex text-sm getSize hidden md:flex'><small>{hour}hs.</small></div>)
                }
                <div className='flex gap-1'>
                    <button type='button' onClick={prevHandler}><span className='px-2 text-md hover:bg-gray-500' style={{cursor: 'pointer'}}>{"<"}</span></button>
                    <button type='button' onClick={nextHandler}><span className='px-2 text-md hover:bg-gray-500' style={{cursor: 'pointer'}}>{">"}</span></button>
                </div>
            </div>
          </div>
        </div>
    )
});

export default ChannelHeader;
