import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const AboutLockedBalance = ({ isModalOpen, onModalClose, modalTitle }: any) => {

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
              <div className='text-white text-lg mt-2'>
              - <span className='text-[#1bb96b]'>Locked Balance</span> is <span className='text-[#008ecc]'>Tip</span> of wecazoo.com
              </div>
              <div className='text-muted text-lg mt-2 ml-4'>
                You can get <span className='text-[#1bb96b]'>Locked Balance</span>, when you deposit balance.
              </div>
              <div className='text-muted text-lg mt-2 ml-4'>
                The more you deposit, the more you get locked balance.
              </div>
              <div className='text-white text-lg mt-2'>
                - How can you unlock the locked balance?
              </div>
              <div className='text-muted text-lg mt-2 ml-4'>
                Unlock Balance = Bet Amount * 1 / 100
              </div>
              <div className='text-muted text-lg mt-2 ml-4'>
                When your <span className='text-[#1bb96b]'>Unlock Balance</span> is over 5$, you can get it.
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AboutLockedBalance;