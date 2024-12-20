import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import Loader from '../Loader';

const TermsConditions = ({ isModalOpen, onModalClose, modalTitle }: any) => {

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
              Terms and Conditions for <span className='text-[#1bb96b]'>wecazoo.com</span>
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              Effective Date: <span className='text-[#1bb96b]'>October 1st, 2024</span>
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              Welcome to <span className='text-[#1bb96b]'>wecazoo.com</span>! By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before engaging in any activities on our platform.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              1. General Information
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
            <span className='text-[#008ecc]'>1.1</span> Operator Details: <span className='text-[#1bb96b]'>wecazoo.com</span> is an online crypto casino platform offering a variety of games owned and operated by Wecazoo Inc. Ccompany registered in Costa Rica.<br />
            <span className='text-[#008ecc]'>1.2</span> Age Restriction: You must be at least 18 years old or the legal gambling age in your jurisdiction, whichever is higher, to use our services.<br />
            <span className='text-[#008ecc]'>1.3</span> Jurisdictional Restrictions: It is your responsibility to ensure that online gambling is legal in your jurisdiction. Wecazoo does not provide services in jurisdictions where gambling is prohibited.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              2. Account Registration
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
            <span className='text-[#008ecc]'>2.1</span> Personal Information: You must provide accurate and up-to-date information when creating an account.<br />
            <span className='text-[#008ecc]'>2.2</span> Account Security: You are responsible for maintaining the confidentiality of your account credentials.<br />
            <span className='text-[#008ecc]'>2.3</span> Multiple Accounts: Creating multiple accounts is prohibited and may result in account suspension.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              3. Deposits and Withdrawals
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
            <span className='text-[#008ecc]'>3.1</span> Payment Providers: Wecazoo uses NOWPayments and MoonPay to process deposits and withdrawals.<br />
            <span className='text-[#008ecc]'>3.2</span> Accepted Cryptocurrencies: Through our partnership with NOWPayments, Wecazoo accepts over 300+ cryptocurrencies, ensuring convenience and flexibility for players.<br />
            <span className='text-[#008ecc]'>3.3</span> Deposit Requirements: All deposits must comply with the minimum amount specified on the platform.<br />
            <span className='text-[#008ecc]'>3.4</span> Withdrawal Limits: Wecazoo imposes no withdrawal limits, allowing players to withdraw their winnings freely and conveniently.<br />
            <span className='text-[#008ecc]'>3.5</span> Anti-Money Laundering: Wecazoo reserves the right to request verification documents to comply with AML laws.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              4. Bonuses and Promotions
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
            <span className='text-[#008ecc]'>4.1</span> Bonus Terms: Bonuses are subject to wagering requirements, which will be specified in the promotion details.<br />
            <span className='text-[#008ecc]'>4.2</span> Abuse of Bonuses: Any attempt to abuse bonuses or promotions may result in forfeiture of winnings and account suspension.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              5. Gameplay Rules
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
            <span className='text-[#008ecc]'>5.1</span> Fair Play: Players are required to engage in fair gameplay. Use of bots, automated systems, or any cheating mechanisms is prohibited.<br />
            <span className='text-[#008ecc]'>5.2</span> Game Malfunctions: In the event of a game malfunction, all bets are voided.<br />
            <span className='text-[#008ecc]'>5.3</span> Disputes: Any disputes must be reported to Wecazoo’s support team within 30 days of the incident.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              6. Responsible Gambling
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
            <span className='text-[#008ecc]'>6.1</span> Self-Exclusion: Players may request account suspension or self-exclusion if they feel their gambling is becoming problematic.<br />
            <span className='text-[#008ecc]'>6.2</span> Support: If you need help, contact responsible gambling organizations such as the BeGambleAware.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              7. Privacy Policy
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
            <span className='text-[#008ecc]'>7.1</span> Data Collection: Wecazoo collects and processes personal data in accordance with our Privacy Policy.<br />
            <span className='text-[#008ecc]'>7.2</span> Cookies: By using our website, you consent to the use of cookies as described in our Privacy Policy.
            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              8. Liability
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
            <span className='text-[#008ecc]'>8.1</span> No Guarantee of Winnings: Gambling involves risk, and there is no guarantee of winnings. <br />
            <span className='text-[#008ecc]'>8.2</span> Limitation of Liability: Wecazoo is not liable for losses incurred through the use of our services.

            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              9. Changes to Terms and Conditions
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
            <span className='text-[#008ecc]'>9.1</span> Wecazoo reserves the right to amend these terms at any time. Changes will be effective immediately upon posting.<br />
            <span className='text-[#008ecc]'>9.2</span> Continued use of our platform after changes constitutes acceptance of the new terms.

            </div>
            <div className='text-[#0080fe] font-semibold text-lg mt-2'>
              10. Contact Information
            </div>
            <div className='text-white text-lg mt-2 ml-4'>
              For any questions or concerns, please contact us at:<br />
              Email: <span className='text-[#008ecc]'>wecazoo@proton.me</span><br/>
              By using <span className='text-[#1bb96b]'>wecazoo.com</span>, you confirm that you have read, understood, and agreed to these terms and conditions. If you do not agree, please refrain from using our services.<br /><br/> 
              Disclaimer: Play responsibly.
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TermsConditions;