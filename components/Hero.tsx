"use client"

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import AuthModal from "./Modals/AuthModal";

const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalType, setIsAuthModalType] = useState(true);

  const onModalClose = () => {
    setIsAuthModalOpen(false);
  }
  return (
    <>
      <AuthModal isModalOpen={isAuthModalOpen} onModalClose={onModalClose} modalType={isAuthModalType} />
      <section className="flex flex-col flex-grow gap-8 px-4 md:px-10 mb-6 mt-[-60px] sm:mt-0">
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 sm:mt-[20px]">
            <div className="flex flex-col gap-1 md:gap-2.5">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold max-w-lg">
                {isAuthenticated ? 'PLAY & GET REWARD' : 'SIGN UP & GET REWARD'}
              </h1>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold max-w-lg">
                UP TO <span className="text-primary">$20,000</span>
              </h1>
            </div>
            {isAuthenticated ? '' : (
              <Button
                className="text-sm w-fit"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsAuthModalType(false);
                }}
              >
                Create Account
              </Button>
            )}
          </div>
          <div className="w-full flex-grow sm:w-auto flex justify-end"> {/* Adjust width here */}
            <Image
              src="/images/hero.png"
              alt="Hero image"
              width={800}
              height={500}
              priority
              className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2" // Responsive width classes
            />
          </div>
        </div>
      </section>

    </>
  );
};

export default Hero;
