import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const SlotGamesList = ({ isModalOpen, onModalClose, isLoading, modalTitle, launchURL }: any) => {

  const handleOk = () => {
    onModalClose();
  };

  const handleCancel = () => {
    onModalClose();
  };

  return (
    <>
      <Modal title={modalTitle} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width="80vw">
        <div style={{ height: "80vh" }}>
          {isLoading ? <Loader /> :
            <iframe src={launchURL} width="100%" height="100%"></iframe>
          }
        </div>
      </Modal>
    </>
  );
};

export default SlotGamesList;