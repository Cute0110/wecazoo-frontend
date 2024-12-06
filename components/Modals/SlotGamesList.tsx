import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const SlotGamesList = ({ isModalOpen, onModalClose, slotGameData, isLoading, onSlotGameClick, modalType, modalTitle, launchURL }: any) => {

  const handleOk = () => {
    onModalClose();
  };

  const handleCancel = () => {
    onModalClose();
  };

  return (
    <>
      <Modal title={modalTitle} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width="80vw">
        {modalType === "list" ?
          <div style={{ height: "80vh" }} className='overflow-y-auto'>
            {isLoading ? <Loader /> :
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
                {slotGameData.map((item: any, index: any) =>
                  <div className='relative aspect-[430/326] rounded-lg overflow-hidden group cursor-pointer w-full h-auto' key={index} onClick={() => onSlotGameClick(item)}>
                    <Image
                      src={item.banner}
                      alt={item.game_name}
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 flex flex-col items-center justify-end p-4">
                      <div className="absolute bottom-0 left-0 w-full bg-white/85 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 px-2 py-3.5 text-center">
                        <span className="text-sm font-bold text-background">
                          {item.game_name}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>}
          </div> :
          <div style={{ height: "80vh" }}>
            {isLoading ? <Loader /> :
              <iframe src={launchURL} width="100%" height="100%"></iframe>
            }
          </div>
        }
      </Modal>
    </>
  );
};

export default SlotGamesList;