import React from "react";
import { ajustarAnchoDiv, getSizeDiv, handler, timeFormat } from "../../../lib";

interface ICustomButton {
    events: any, 
    selectHeroBanner: any, 
    handleActiveChannel: any, 
    active:any
}

const CustomButton:React.FC<ICustomButton> = ({events, selectHeroBanner, handleActiveChannel, active}) => {
    
    return <div className='flex'>
    {events?.map(({id, name, date_begin, date_end, duration, description}: any, index: number) => {
      
      return index < 12 ? 
      <button 
        key={index} 
        onClick={() => {
            selectHeroBanner({name, date_begin: timeFormat(date_begin), date_end: timeFormat(date_end), duration, description})
            handleActiveChannel(Number(id));
            console.log(handler(date_begin, duration, getSizeDiv().ancho * 2, date_end, index))
        }} 
        className={`text-balance p-2 overflow-hidden flex justify-start ${active === Number(id) ? 'bg-gray-500' : ''}`} 
        style={{border: '1px solid rgb(107 114 128)', width: ajustarAnchoDiv(date_begin, duration, getSizeDiv().ancho, date_end, index), cursor: 'pointer'}}>
            <small className='text-overflow-ellipsis text-left text-ellipsis overflow-hidden' style={{fontSize: '8pt', border: '900'}}>
                <span className='text-sm'>{name}</span> <br/> 
                <small>{timeFormat(date_begin)} - {timeFormat(date_end)}</small>
            </small>
        </button>
      : null})}
  </div>
}

export default CustomButton;
