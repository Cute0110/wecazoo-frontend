import React from 'react';
import { Modal } from 'antd';

const AMLPolicy = ({ isModalOpen, onModalClose, modalTitle }: any) => {
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
            <div className='text-[#0080fe] text-[20px] font-semibold'>
              AML Policy for Wecazoo
            </div>

            <div className='text-[#0080fe] font-semibold text-lg mt-4'>
              1. Introduction
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              Wecazoo is committed to preventing the use of its platform for illicit financial activities. This policy outlines Wecazoo's rights to take necessary action against accounts suspected of money laundering.
            </div>

            <div className='text-[#0080fe] font-semibold text-lg mt-4'>
              2. Minimal KYC & Risk-Based Monitoring
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              Wecazoo operates with minimal KYC but monitors transactions for any suspicious activity.
            </div>

            <div className='text-[#0080fe] font-semibold text-lg mt-4'>
              3. Account Suspension & Withholding Withdrawals
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              Wecazoo reserves the right to suspend or terminate any account suspected of involvement in money laundering. Withdrawals from such accounts may be withheld by Wecazoo. Wecazoo is not required to provide the user with specific evidence or justification for its suspicion or actions.
            </div>

            <div className='text-[#0080fe] font-semibold text-lg mt-4'>
              4. Final Provisions
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              Wecazoo retains full discretion in determining what constitutes suspicious activity. By using Wecazoo, users acknowledge and accept these terms.
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AMLPolicy;