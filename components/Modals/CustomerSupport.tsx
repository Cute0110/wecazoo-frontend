import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const CustomerSupport = ({ isModalOpen, onModalClose, modalTitle }: any) => {

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
                Customer Support Email: <span className='text-[#1bb96b]'>support@wecazoo.com</span>
              </div>
              <div className='text-muted text-lg mt-4'>
                We will email you as soon as possible within 24-48h of your issue or request, thank you for your patience.
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomerSupport;