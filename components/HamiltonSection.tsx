"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import AuthModal from "./Modals/AuthModal";
import { useAuth } from "@/lib/authContext";

const HamiltonSection = ({ }: any) => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalType, setIsAuthModalType] = useState(true);

  const onModalClose = () => {
    setIsAuthModalOpen(false);
  }
  return (
    <>
      <AuthModal isModalOpen={isAuthModalOpen} onModalClose={onModalClose} modalType={isAuthModalType} />
      <div className="relative w-full aspect-[10/7]">
        <Image src="/images/hamilton.jpg" alt="hamilton" fill className="object-cover z-0 rounded-lg" />
        <div className="absolute z-10 bottom-[80px] left-[40px] sm:bottom-[130px] sm:left-[100px] md:bottom-[170px] md:left-[80px] lg:bottom-[100px] xl:bottom-[150px] xl:left-[80px] 2xl:bottom-[200px] 2xl:left-[100px]">
          {isAuthenticated ? '' : <Button className="text-sm w-fit bg-[#1bb96b] h-[35px]" onClick={() => { setIsAuthModalOpen(true); setIsAuthModalType(false) }}>Claim Now</Button>}
        </div>
      </div>
    </>
  );
};

export default HamiltonSection;
