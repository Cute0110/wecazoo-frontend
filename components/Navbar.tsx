"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Logo from "@/public/wecazoo-logo.svg";
import LanguageSelector from "./LanguageSelector";
import { Home, RadarIcon, UserIcon, WalletIcon, GiftIcon, LogOutIcon, Menu, ChevronLeft, ChevronRight, Headset, DiamondIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AuthModal from "./Modals/AuthModal";
import { useAuth } from "@/lib/authContext";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

import CustomerSupport from "./Modals/CustomerSupport";

const Navbar = ({ isNavLinksHidden }: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalType, setIsAuthModalType] = useState(true);
  const { isAuthenticated, setIsAuthenticated, authData, isSidebarCollapsed, setIsSidebarCollapsed } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onLogOutClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    router.push("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6">
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="absolute -right-3 top-6 bg-[#130D25] p-2 w-6 h-20 items-center justify-center rounded-r-lg border-r border-t border-b border-gray-700 hover:bg-[#1a1229] transition-colors duration-200 hidden lg:flex shadow-lg"
      >
        {isSidebarCollapsed ?
          <ChevronRight className="w-4 h-4 text-gray-300 hover:text-white" /> :
          <ChevronLeft className="w-4 h-4 text-gray-300 hover:text-white" />
        }
      </button>

      <CustomerSupport isModalOpen={isModalOpen} onModalClose={() => setIsModalOpen(false)} modalTitle="Customer Support" />

      {/* {isAuthenticated && !isSidebarCollapsed && (
        <div className="mb-6">
          <div className="flex items-center">
            <span style={{ fontFamily: 'League Spartan, sans-serif' }} className="text-white text-xl font-medium">
              ${authData?.balance.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-700 mt-4" />
        </div>
      )} */}

      <nav className="flex-1 space-y-4">
        {/* {isAuthenticated && !isSidebarCollapsed && (
          <Link href="/vip" className="flex items-center text-gray-300 hover:text-white w-[80%]">
            <img
              src="/images/vip.png"
              alt="VIP"
              className="w-full h-auto rounded-lg"
            />
          </Link>
        )} */}

        <Link href="/" className="flex items-center text-gray-300 hover:text-white">
          <Home className="w-5 h-5 mr-3" />
          {!isSidebarCollapsed && <span>Home</span>}
        </Link>
        <Link href="/casino" className="flex items-center text-gray-300 hover:text-white">
          <RadarIcon className="w-5 h-5 mr-3" />
          {!isSidebarCollapsed && <span>Casino</span>}
        </Link>
        {isAuthenticated && (
          <>
            <Link href="/profile" className="flex items-center text-gray-300 hover:text-white">
              <UserIcon className="w-5 h-5 mr-3" />
              {!isSidebarCollapsed && <span>Profile</span>}
            </Link>
            <Link href="/" className="flex items-center text-gray-300 hover:text-white">
              <ChatBubbleIcon className="w-5 h-5 mr-3" />
              {!isSidebarCollapsed && <span>Chat</span>}
            </Link>
            <Link href="/wallet" className="flex items-center text-gray-300 hover:text-white">
              <WalletIcon className="w-5 h-5 mr-3" />
              {!isSidebarCollapsed && <span>Wallet</span>}
            </Link>
            <Link href="/bonus" className="flex items-center text-gray-300 hover:text-white">
              <GiftIcon className="w-5 h-5 mr-3" />
              {!isSidebarCollapsed && <span>Bonus</span>}
            </Link>
            <Link href="/vip" className="flex items-center text-gray-300 hover:text-white">
              <DiamondIcon className="w-5 h-5 mr-3" />
              {!isSidebarCollapsed && <span>VIP</span>}
            </Link>
            <Link href="#" onClick={() => setIsModalOpen(true)} className="flex items-center text-gray-300 hover:text-white">
              <Headset className="w-5 h-5 mr-3" />
              {!isSidebarCollapsed && <span>24/7 Support</span>}
            </Link>
            <button onClick={onLogOutClick} className="flex items-center text-gray-300 hover:text-white">
              <LogOutIcon className="w-5 h-5 mr-3" />
              {!isSidebarCollapsed && <span>Log Out</span>}
            </button>
            {!isSidebarCollapsed && <Link href="https://changelly.com/buy-crypto" target="_blank" style={{"marginTop": '30px'}} className="flex flex-row bg-[#00bf62] p-2 rounded-lg cursor-pointer hover:bg-[#00bf62]/90 transition-colors w-full">
              <WalletIcon className="w-5 h-5 mr-3" /><span>Buy Crypto</span>
            </Link>}
            {!isSidebarCollapsed && (
              <Link href="https://changelly.com/buy-crypto" target="_blank" className="flex items-center text-gray-300 hover:text-white w-[90%]" style={{"marginTop": '20px'}}>
                <img
                  src="/images/pay.png"
                  alt="VIP"
                  className="w-full h-auto rounded-lg"
                />
              </Link>
            )}
          </>
        )}
      </nav>

      {!isSidebarCollapsed && (
        <div className="mt-auto space-y-4">
          <LanguageSelector />
          {!isAuthenticated && (
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsAuthModalType(true);
                }}
              >
                Login
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsAuthModalType(false);
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <AuthModal
        isModalOpen={isAuthModalOpen}
        onModalClose={() => setIsAuthModalOpen(false)}
        modalType={isAuthModalType}
      />
      <div className="flex">
        {/* Permanent Desktop Sidebar */}
        {!isMobile && (
          <div className={`fixed left-0 top-0 h-full bg-[#1F1635] z-50 border-r border-gray-800 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-[280px]'}`}>
            <SidebarContent />
          </div>
        )}

        <div className="flex-1">
          <header className="fixed top-0 left-0 right-0 z-40 bg-[#130D25] shadow-lg">
            <div className={`mx-auto px-4 py-4 flex items-center justify-between ${!isMobile ? (isSidebarCollapsed ? 'ml-[180px]' : 'ml-[340px]') : ''}`}>
              <Link href="/" className="flex-shrink-0">
                <Image priority src={Logo} alt="Wecazoo Logo" className="h-9 lg:h-11 w-auto" />
              </Link>

              {/* Balance display for mobile */}
              {isAuthenticated && (
                <div className="flex items-center mx-4">
                  <div className="bg-[#0b0911] rounded-lg flex items-center">
                    <div className="px-4 py-2 flex items-center gap-2">
                      <span style={{ fontFamily: 'League Spartan, sans-serif' }} className="text-white text-base">
                        ${authData?.balance.toFixed(2)}
                      </span>
                    </div>
                    <Link href="/wallet">
                      <div className="bg-[#00bf62] p-2 rounded-lg cursor-pointer hover:bg-[#00bf62]/90 transition-colors">
                        <WalletIcon className="w-5 h-5 text-white" />
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                {isMobile && (
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-[#1F1635] transition-colors"
                      >
                        <Menu className="w-6 h-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-[280px] border-r border-gray-800 bg-[#1F1635]"
                    >
                      <SidebarContent />
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Navbar;