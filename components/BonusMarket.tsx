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
      <section className="flex flex-col gap-8 px-4 md:px-10 mb-10">
        <div className="flex items-center">
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            <div className="flex flex-col gap-1 md:gap-2.5">
              <p className="text-[15px] font-light uppercase">
              DEPOSIT <span className="text-primary text-[30px] font-semibold">20$</span>
              </p>
              <h1 className="text-[20px] font-extrabold max-w-lg">
              GET <span className="text-primary text-[30px]">100$</span> FOR FREE
              </h1>
            </div>
            {isAuthenticated ? '' : <Button className="text-sm w-fit bg-[#43188b]" onClick={() => { setIsAuthModalOpen(true); setIsAuthModalType(false) }}>Claim Now</Button>}
          </div>
          <div>
            <Image
              src="/images/getBonus.jpg"
              alt="Hero image"
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BonusMarket;
