import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const FAQs = ({ isModalOpen, onModalClose, modalTitle }: any) => {

  const handleOk = () => {
    onModalClose();
  };

  const handleCancel = () => {
    onModalClose();
  };

  return (
    <>
      <Modal title={modalTitle} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width="700px">
        <div className='h-[80vh] overflow-y-auto'>
          <div>
            <div className='text-white text-[25px] font-semibold'>
              <span className='text-[#1bb96b]'>Wecazoo</span> Frequently Asked Questions
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-4'>
              Does wecazoo accept debit & credit cards, bank transfers, google pay and apple pay?
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              yes we do, wecazoo partners with moonpay and all of those different forms of payment methods are accepted
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              Which crypto currencies does wecazoo accept?
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              we accept over +300 crypto coins and tokens, since one of our payment providers is now payments
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              In which cryptos can you make a withdrawal?
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              withdrawals are paid in crypto USDT on 3 different blockchains available: erc20, trc20 and solana
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              Is there a minimum deposit in wecazoo?
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              yes, wecazoo's minimum deposit is 15$
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              How long does it take to see your deposit?
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              you should be able to see your balance as soon as your transaction has been approved
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              Does wecazoo have a maximum withdrawal limit?
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              no wecazoo doesn't have a maximum withdrawl limit
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              How long does it take to get withdrawal?
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              all withdrawls are be paid out within a few minutes to 8h, time variation depends on form of withdrawal, transaction risk score, read about risk score below
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              What is transaction risk score in wecazoo?
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              since wecazoo uses minimal KYC, our system checks all transactions for signs of money laundering or other suspicious activity, that is why some transactions may take slower to be approved
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FAQs;