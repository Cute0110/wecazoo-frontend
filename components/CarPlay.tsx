"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import AuthModal from "./Modals/AuthModal";

const CarPlay = ({ onScrollTo }: any) => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalType, setIsAuthModalType] = useState(true);

  const onModalClose = () => {
    setIsAuthModalOpen(false);
  }

  const onCarButtonClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      setIsAuthModalType(false);
    } else {
      onScrollTo("popular-games");
    }
  }

  return (
    <>
      <AuthModal isModalOpen={isAuthModalOpen} onModalClose={onModalClose} modalType={isAuthModalType} />
      <section className="flex flex-col gap-8 px-4 md:px-10 mb-10 mt-[76px]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            <div className="flex flex-col gap-1 md:gap-2.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold max-w-lg">
                JOIN CRYPTO'S MOST REWARDING CASINO
              </h1>
            </div>
          </div>
          <div>
            <Image
              src="/images/reward.png"
              alt="Hero image"
              width={1000}
              height={500}
              priority
            />
          </div>
        </div>
      </section>
      {/* <div className="relative w-full aspect-[10/7] lg:aspect-[5/2]"> */}
      {/* <Image src="/images/reward.png" alt="hamilton" fill className="object-cover z-0 rounded-lg" /> */}
      {/* <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 xl:bottom-16 2xl:bottom-20 z-10 w-full">
          <div className="flex justify-center">
            <Button className="text-sm w-fit bg-[#00bf62] mt-2 h-[35px]" onClick={onCarButtonClick}>{isAuthenticated ? "Play Now" : "Create Account"}</Button>
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default CarPlay;
