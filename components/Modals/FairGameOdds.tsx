import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const FairGameOdds = ({ isModalOpen, onModalClose, modalTitle }: any) => {

  const handleOk = () => {
    onModalClose();
  };

  const handleCancel = () => {
    onModalClose();
  };

  return (
    <>
      <Modal title={modalTitle} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width="700px">
        <div className='h-[40vh] overflow-y-auto'>
          <div>
            <div>
              <div className='text-muted text-lg mt-4'>
                <span className='text-[#1bb96b]'>Wecazoo</span> has transparent & fair game odds in terms of RTP% which means Return To Player Percentage, Wecazoo has a dynamic RTP like most online/crypto casinos do.
              </div>
              <div className='text-muted text-lg mt-4'>
                Our RTP% varies from game to game but it starts at roughly 96% and goes all the way up to 99.6% for some Live Casino games.
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FairGameOdds;