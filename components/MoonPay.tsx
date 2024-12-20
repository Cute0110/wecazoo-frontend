"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import AuthModal from "./Modals/AuthModal";

const MoonPay: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalType, setIsAuthModalType] = useState(true);

  const onModalClose = () => {
    setIsAuthModalOpen(false);
  }

  const onBuyCryptoClick = () => {
    if (isAuthenticated) {
      console.log("maintaining......");
    } else {
      setIsAuthModalOpen(true);
      setIsAuthModalType(false);
    }
  }
  return (
    <>
      <AuthModal isModalOpen={isAuthModalOpen} onModalClose={onModalClose} modalType={isAuthModalType} />
      <section className="flex flex-col gap-8 px-4 md:px-10 mb-10">
        <div className="block lg:flex items-center justify-center">
          <div className="flex lg:block justify-center">
            <Image
              src="/images/MoonPay.jpg"
              alt="Hero image"
              width={500}
              height={300}
              className="rounded-lg"
              priority
            />
          </div>
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 pl-[10px] lg:pl-[50px]">
            <div className="flex flex-col gap-1 md:gap-2.5">
              <h1 className="text-[15px] lg:text-[25px] font-semibold">
                Deposit by <span className="font-extrabold text-[20px] lg:text-[30px]">Card</span>, <span className="font-extrabold text-[20px] lg:text-[30px]">Bank Transfer</span>,
              </h1>
              <h1 className="text-[15px] lg:text-[25px] font-semibold">
                <span className="font-extrabold text-[20px] lg:text-[30px]">Google Pay</span> or <span className="font-extrabold text-[20px] lg:text-[30px]">Appl Pay</span>
              </h1>
              <h1 className="text-[15px] lg:text-[25px] font-semibold">
                on <span className='text-[#1bb96b] font-extrabold'>Wecazoo</span> by Using MoonPay
              </h1>
            </div>
            <Button className="text-sm w-fit bg-[#00bf62]" onClick={onBuyCryptoClick}>Buy Crypto</Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoonPay;
