import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const GuideBuyCyrpto = ({ isModalOpen, onModalClose, modalTitle }: any) => {

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
                If you want to play on <span className='text-[#1bb96b]'>wecazoo</span> you have to deposit crypto, we recommend purchasing crypto from <a href="https://www.moonpay.com/" className='text-[#fff] underline hover:text-white hover:underline'>moonpay.com</a> or <a href="https://www.coinbase.com/" className='text-[#fff] underline hover:text-white hover:underline'>coinbase.com</a> or even <a href="https://www.binance.com/" className='text-[#fff] underline hover:text-white hover:underline'>binance.com</a>
              </div>
              <div className='text-muted text-lg mt-4'>
                Here is a quick guide:
              </div>
              <div className='text-muted text-lg mt-4 flex'>
                <div>1.</div>
                <div className='ml-2'>
                  Create an account on a crypto exchange such as <a href="https://www.binance.com/" className='text-[#fff] underline hover:text-white hover:underline'>binance.com</a> or <a href="https://www.coinbase.com/" className='text-[#fff] underline hover:text-white hover:underline'>coinbase.com</a>
                </div>
              </div>
              <div className='text-muted text-lg mt-4 flex'>
              <div>2.</div>
              <div className='ml-2'> Purchase crypto from your crypto exchange with your prefered method of payment</div>
              </div>
              <div className='text-muted text-lg mt-4 flex'>
              <div>3.</div> 
              <div className='ml-2'>Deposit your crypto on <span className='text-[#1bb96b]'>wecazoo</span> by typing the amount you want to deposit and click "Deposit"</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GuideBuyCyrpto;