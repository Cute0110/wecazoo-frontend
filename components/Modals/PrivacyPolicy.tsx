import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const PrivacyPolicy = ({ isModalOpen, onModalClose, modalTitle }: any) => {

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
              Privacy Policy Effective Date: <span className='text-[#1bb96b]'>1.9.2024</span>
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              At Wecazoo, our accessible via <span className='text-[#1bb96b]'>wecazoo.com</span>, we respect your privacy and are committed to safeguarding your personal information.<br/>
              This Privacy Policy explains how we collect, use, and protect your data when you use our services.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              1. Information We Collect
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              We may collect the following types of information.<br/>
              <span className='text-[#008ecc]'>Account Information:</span> Username, email address, and password.<br/>
              <span className='text-[#008ecc]'>Transaction Data:</span> Crypto wallet addresses, transaction history, and deposit/withdrawal amounts.<br/>
              <span className='text-[#008ecc]'>Usage Data:</span> IP address, device information, and activity logs to enhance your experience.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              2. How We Use Your Information
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              <span className='text-[#008ecc]'>We use your data to:</span><br/>
              Process transactions and ensure smooth gameplay.<br/>
              Enhance platform security and prevent fraud.<br/>
              Provide customer support and improve our services.<br/>
              Comply with legal obligations where applicable.<br/>
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              3. Data Protection and Security
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              We implement industry-standard security measures, including encryption and secure storage, to protect your data.<br/>
              However, as no system is entirely secure, we recommend safeguarding your account credentials.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              4. Your Privacy Rights
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              <span className='text-[#008ecc]'>You have the right to:</span><br/>
              Access and update your personal information.<br/>
              Request the deletion of your account and associated data.<br/>
              Withdraw consent for specific data uses.<br/>
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              5. Cookies and Tracking
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              Wecazoo may use cookies to enhance your experience, track website performance, and personalize content.<br />
              By using our platform, you consent to our use of cookies.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              6. Third-Party Services
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              We may partner with third-party providers to process payments or deliver services.<br/>
              These providers are bound by confidentiality and data protection agreements.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              7. Changes to This Policy
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              We may update this Privacy Policy from time to time.<br />
              Changes will be posted on <span className='text-[#1bb96b]'>wecazoo.com</span>, and your continued use of the platform indicates acceptance of the updated policy.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              8. Contact Us
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              If you have any questions or concerns about this Privacy Policy, please contact us at Email: <span className='text-[#1bb96b]'>support@wecazoo.com</span><br />
              By using Wecazoo, you agree to this Privacy Policy.
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PrivacyPolicy;