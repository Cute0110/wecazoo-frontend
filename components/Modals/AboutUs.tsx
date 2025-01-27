import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const AboutUs = ({ isModalOpen, onModalClose, modalTitle }: any) => {

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
            <Image src="/images/hero.png" width={600} height={350} alt="hero" className='mx-auto rounded-md'></Image>
            <div>
              <div className='text-muted text-lg'>
                At Wecazoo, we bring the excitement of the casino world right to your fingertips, offering a thrilling gaming experience with top-notch security, fair play, and an extensive selection of games designed to entertain and reward.
              </div>
              <div className='text-muted text-lg'>
                Whether you're a seasoned player or just getting started, Wecazoo is your ultimate destination for fun, fortune, and unforgettable moments.
              </div>
              <div className='text-muted text-lg'>
                Get Lich!!!
              </div>
              <div className='text-white text-lg text-center mt-[20px]'>
                Copyright ©2024 Wecazoo Team
              </div>
              <div className='text-white text-lg text-center'>
                ALL RIGHTS RESERVED
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AboutUs;