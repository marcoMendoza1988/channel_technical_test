import React, { useEffect, useState } from 'react';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void, children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

useEffect(() => {
    setModalOpen(isOpen)
}, [isOpen]);

  const handleClose = () => {
    setModalOpen(!isOpen);
    onClose();
  };

  return (
    <>
      {modalOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-white">
            <div className="relative w-full h-screen flex align-center" style={{ zIndex: '51' }}>
                <div className="relative flex flex-col w-full bg-black text-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between">
                    <h3 className="text-md font-semibold"></h3>
                    <button
                      className="p-1 ml-auto bg-transparent text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={handleClose}    
                    >
                      <span 
                        className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none" 
                        style={{ 
                          alignContent: 'center',
                          fontSize: 'xxx-large',
                          fontWeight: 200,
                          marginRight: '.5rem' 
                      }}>×</span>
                    </button>
                </div>
                <div className="relative px-4 py-4 flex-auto" style={{height: '94vh'}}>{children}</div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
            </div>
      )}
    </>
  );
};

export default Modal;
