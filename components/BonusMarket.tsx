"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import AuthModal from "./Modals/AuthModal";

const BonusMarket: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalType, setIsAuthModalType] = useState(true);

  const onModalClose = () => {
    setIsAuthModalOpen(false);
  }
  return (
    <>
      <AuthModal isModalOpen={isAuthModalOpen} onModalClose={onModalClose} modalType={isAuthModalType} />

      <div className="relative w-full lg:w-[50%] h-[300px] lg:h-[400px] overflow-hidden rounded-t-lg rounded-b-lg sm:rounded-b-none">
        {/* <Image src="/images/bonusBack.jpg" alt="bonus" fill className="object-cover z-0" /> */}
        <div className="absolute top-0 w-full h-full">
          <div className="flex items-center justify-center w-full h-full">
            <div className="ml-4">
              <div className="flex flex-col gap-1 md:gap-2.5">
                <p className="text-[15px] font-light uppercase">
                  DEPOSIT <span className="text-primary text-[30px] font-semibold">20$</span>
                </p>
                <h1 className="text-[20px] font-semibold lg:font-extrabold max-w-lg">
                  GET <span className="text-primary text-[30px]">100$</span> FOR FREE
                </h1>
              </div>
              {isAuthenticated ? '' : <Button className="text-sm w-fit bg-[#1bb96b] mt-2" onClick={() => { setIsAuthModalOpen(true); setIsAuthModalType(false) }}>Claim Now</Button>}
            </div>
            <div className="">
              <Image
                src="/images/hamilton.png"
                alt="Hero image"
                width={300}
                height={300}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BonusMarket;
