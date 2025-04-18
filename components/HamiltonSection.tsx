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
        <div className="absolute z-10 bottom-[130px] right-[320px] sm:bottom-[180px] sm:right-[350px] md:bottom-[170px] md:right-[80px] lg:bottom-[100px] lg:right-[80px] xl:bottom-[150px] xl:right-[80px] 2xl:bottom-[200px] 2xl:right-[80px]">
          {isAuthenticated ? '' : <Button className="text-sm w-fit bg-[#1bb96b] h-[35px]" onClick={() => { setIsAuthModalOpen(true); setIsAuthModalType(false) }}>Claim Now</Button>}
        </div>
      </div>
    </>
  );
};

export default HamiltonSection;
