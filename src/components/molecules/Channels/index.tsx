import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../atoms/CustomButton";

type Channel = {
    id: never;
    image: never;
}

const Channels = forwardRef(function Channels({channels, setHeroBanner}: any, ref: any) {
    const channelApi = useSelector((state: any) => state.channels);
    const [active, setActive] = React.useState<number>(0);

    const handleActiveChannel = (id: number) => {
        setActive(id);
    };

    const selectHeroBanner = (hero: object) => {
        setHeroBanner(hero)
    }

    return (
        <div className='flex flex-row overflow-x-auto gap-2'>
          <div className='flex flex-col sticky left-0 top-0 z-10'>
            {
              channels?.map(({id, image}: Channel) => 
                <div 
                    key={id} 
                    className='flex bg-black w-full md:w-64 h-24 rounded' 
                    style={{ 
                        backgroundColor: '#212121',
                        border: '3px solid black',
                        borderRadius: 8
                }}>
                    <div className="flex p-2 w-auto w-1/2 md:w-32 text-base md:text-xl" style={{ alignItems: 'center', justifyContent: 'center'}}>{id}</div>
                    <div className="p-2 w-auto flex align-center w-1/2 md:w-32"><img style={{ width: 'max-content' }} width={86} src={image} /></div>
                </div>
              )
            }
          </div>
          <div ref={ref} className='flex flex-col overflow-x-hidden w-full slider' style={{ backgroundColor: '#212121' }}>
            {
              channelApi?.channels?.map(({id, events}: any) => {
                
                return (
                  <div key={id} className="flex justify-between gap-1 h-24">
                    <CustomButton 
                        events={events} 
                        selectHeroBanner={selectHeroBanner} 
                        handleActiveChannel={handleActiveChannel} 
                        active={active}
                    />
                  </div>
                );
              })
            }
          </div>
        </div>
    );
});

export default Channels;

