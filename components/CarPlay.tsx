"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import AuthModal from "./Modals/AuthModal";

const CarPlay = ({onScrollTo} : any) => {
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
      <section className="flex flex-col gap-8 px-4 md:px-10 mb-10">
        <div className="relative block lg:flex items-center justify-center">
          <div className="flex lg:block justify-center w-full">
            <Image
              src="/images/car.jpg"
              alt="Hero image"
              width={100}
              height={300}
              className="rounded-lg w-full"
              priority
            />
          </div>
          <div className="lg:absolute bottom-2 lg:bottom-8 z-10">
            <h1 className="text-[20px] lg:text-[40px] font-semibold text-center">
              Earn Amazing Prizes, Start Playing
            </h1>
            <div className="flex justify-center">
            <Button className="text-sm w-fit bg-[#00bf62] mt-2" onClick={onCarButtonClick}>{isAuthenticated ? "Play Now" : "Create Account"}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarPlay;
