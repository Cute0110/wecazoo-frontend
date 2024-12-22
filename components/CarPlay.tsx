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
      <div className="relative w-full aspect-[10/7] lg:aspect-[5/2]">
        <Image src="/images/car.jpg" alt="hamilton" fill className="object-cover z-0 rounded-lg" />
        {/* <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 xl:bottom-16 2xl:bottom-20 z-10 w-full">
          <div className="flex justify-center">
            <Button className="text-sm w-fit bg-[#00bf62] mt-2 h-[35px]" onClick={onCarButtonClick}>{isAuthenticated ? "Play Now" : "Create Account"}</Button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default CarPlay;
