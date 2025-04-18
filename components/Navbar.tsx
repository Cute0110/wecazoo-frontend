"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Logo from "@/public/wecazoo-logo.svg";
import LanguageSelector from "./LanguageSelector";
import {
  Home,
  UserIcon,
  WalletIcon,
  GiftIcon,
  LogOutIcon,
  Menu,
  ChevronLeft,
  ChevronRight,
  Headset,
  DiamondIcon,
  Cherry,
  Gamepad,
  ChevronDown
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AuthModal from "./Modals/AuthModal";
import { useAuth } from "@/lib/authContext";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import CustomerSupport from "./Modals/CustomerSupport";
import ClickOutside from "./ClickOutside";

const Navbar = ({ isNavLinksHidden }: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalType, setIsAuthModalType] = useState(true);
  const { isAuthenticated, setIsAuthenticated, authData, isSidebarCollapsed, setIsSidebarCollapsed, setIsExpanded } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = useState(false);

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
    setIsOpen(false);
    localStorage.removeItem('authToken');
    router.push("/");
  };

  const gameCategories = [
    { name: 'Zoo Originals', path: '/casino#original-games' },
    { name: 'Improved RTP', path: '/casino#improved-games' },
    { name: 'Trending', path: '/casino#trending-games' },
    { name: 'Live Casino', path: '/casino#live-games' },
    { name: 'Slots', path: '/casino#slot-games' },
    { name: 'Entertaining', path: '/casino#entertaining-games' },
  ];

  const MobileBottomMenu = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1F1635] border-t border-gray-800 lg:hidden z-50">
      <div className="flex justify-around items-center py-3">
        {/* <Sheet>
          <SheetTrigger asChild>

          </SheetTrigger>
          <SheetContent
            side="left"
            // open={isOpen}
            // onOpenChange={setIsOpen}
            className="w-[280px] border-r border-gray-800 bg-[#1F1635] block p-0"
          >
            <div className="h-full overflow-y-auto bg-[#1F1635]">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-700/50 transition-colors text-gray-300 z-50"
              >
                <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </button>
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet> */}
        <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col items-center text-gray-300 hover:text-white">
          <Menu className="w-6 h-6 mb-1" />
          <span className="text-xs">Menu</span>
        </button>

        <Link href="/casino" className="flex flex-col items-center text-gray-300 hover:text-white">
          <Cherry className="w-6 h-6 mb-1" />
          <span className="text-xs">Casino</span>
        </Link>

        <Link href="/sports" className="flex flex-col items-center text-gray-300 hover:text-white">
          <div className="w-6 h-6 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M11.9 6.7s-3 1.3-5 3.6c0 0 0 3.6 1.9 5.9 0 0 3.1.7 6.2 0 0 0 1.9-2.3 1.9-5.9 0 .1-2-2.3-5-3.6" /><path d="M11.9 6.7V2" /><path d="M16.9 10.4s3-1.4 4.5-1.6" /><path d="M15 16.3s1.9 2.7 2.9 3.7" /><path d="M8.8 16.3S6.9 19 6 20" /><path d="M2.6 8.7C4 9 7 10.4 7 10.4" /></svg>
          </div>
          <span className="text-xs">Sports</span>
        </Link>

        <Link href="#" onClick={() => setIsExpanded(true)} className="flex flex-col items-center text-gray-300 hover:text-white">
          <ChatBubbleIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">Chat</span>
        </Link>
      </div>
    </div>
  );

  const SidebarContent = () => {
    const handleGamesClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsGamesDropdownOpen(!isGamesDropdownOpen);
    };

    const handleGameCategoryClick = async (e: React.MouseEvent, path: string) => {
      e.preventDefault();

      // Extract the section ID from the path (everything after #)
      const [basePath, section] = path.split('#');

      if (isMobile) {
        setIsOpen(false);
      }

      // If we're not already on the casino page, navigate there first
      if (window.location.pathname !== '/casino') {
        await router.push('/casino');
        // Wait a bit for the page to load
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Find the section element and scroll to it
      const element = document.getElementById(section);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    return (
      <div className={`flex flex-col h-full p-4 ${isMobile ? "pt-16" : "pt-10" } overflow-y-auto`}>
        {!isMobile && (
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-6 bg-[#130D25] p-2 w-6 h-20 items-center justify-center rounded-r-lg border-r border-t border-b border-gray-700 hover:bg-[#1a1229] transition-colors duration-200 hidden lg:flex shadow-lg"
          >
            {isSidebarCollapsed ?
              <ChevronRight className="w-4 h-4 text-gray-300 hover:text-white" /> :
              <ChevronLeft className="w-4 h-4 text-gray-300 hover:text-white" />
            }
          </button>
        )}

        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-700/50 transition-colors text-gray-300 z-50"
          >
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>
        )}

        <CustomerSupport isModalOpen={isModalOpen} onModalClose={() => setIsModalOpen(false)} modalTitle="Customer Support" />

        <nav className="flex-1 space-y-4">
          {/* New Casino and Sports Buttons */}
          {(!isSidebarCollapsed || isMobile) && <div className="flex flex-row gap-3 mb-6">
            <Link
              href="/casino"
              className="flex items-center justify-center bg-[#00bf62] hover:bg-[#00bf62]/90 text-white rounded-lg p-3 transition-colors"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              <Cherry className="w-5 h-5 mr-2" />
              <span className="text-lg">Casino</span>
            </Link>
            <Link
              href="/sports"
              className="flex items-center justify-center bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white rounded-lg p-3 transition-colors"
              style={{ fontFamily: 'League Spartan, sans-serif' }}
            >
              <div className="w-5 h-5 mr-2" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M11.9 6.7s-3 1.3-5 3.6c0 0 0 3.6 1.9 5.9 0 0 3.1.7 6.2 0 0 0 1.9-2.3 1.9-5.9 0 .1-2-2.3-5-3.6" /><path d="M11.9 6.7V2" /><path d="M16.9 10.4s3-1.4 4.5-1.6" /><path d="M15 16.3s1.9 2.7 2.9 3.7" /><path d="M8.8 16.3S6.9 19 6 20" /><path d="M2.6 8.7C4 9 7 10.4 7 10.4" /></svg>
              </div>
              <span className="text-lg">Sports</span>
            </Link>
          </div>}

          <Link href="/" className="flex items-center text-gray-300 hover:text-white">
            <Home className="w-5 h-5 mr-3" />
            {(!isSidebarCollapsed || isMobile) && <span>Home</span>}
          </Link>

          {/* Games Dropdown Section */}
          <div className="relative">
            <button
              onClick={handleGamesClick}
              className="flex items-center text-gray-300 hover:text-white w-full"
            >
              <Gamepad className="w-5 h-5 mr-3" />
              {(!isSidebarCollapsed || isMobile) && (
                <>
                  <span>Games</span>
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isGamesDropdownOpen ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>
            {isGamesDropdownOpen && (!isSidebarCollapsed || isMobile) && (
              <div className="ml-8 mt-2 space-y-2">
                {gameCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.path}
                    onClick={(e) => handleGameCategoryClick(e, category.path)}
                    className="block text-gray-300 hover:text-white py-1"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated && (
            <>
              <Link href="/profile" className="flex items-center text-gray-300 hover:text-white">
                <UserIcon className="w-5 h-5 mr-3" />
                {(!isSidebarCollapsed || isMobile) && <span>Profile</span>}
              </Link>
              <Link href="/wallet" className="flex items-center text-gray-300 hover:text-white">
                <WalletIcon className="w-5 h-5 mr-3" />
                {(!isSidebarCollapsed || isMobile) && <span>Wallet</span>}
              </Link>
              <Link href="/bonus" className="flex items-center text-gray-300 hover:text-white">
                <GiftIcon className="w-5 h-5 mr-3" />
                {(!isSidebarCollapsed || isMobile) && <span>Bonus</span>}
              </Link>
              <Link href="/vip" className="flex items-center text-gray-300 hover:text-white">
                <DiamondIcon className="w-5 h-5 mr-3" />
                {(!isSidebarCollapsed || isMobile) && <span>VIP</span>}
              </Link>
              <Link href="#" onClick={() => setIsModalOpen(true)} className="flex items-center text-gray-300 hover:text-white">
                <Headset className="w-5 h-5 mr-3" />
                {(!isSidebarCollapsed || isMobile) && <span>24/7 Support</span>}
              </Link>
              <div className="mt-8">
                <Link href="#" onClick={onLogOutClick} className="flex items-center text-gray-300 hover:text-white mb-8">
                  <LogOutIcon className="w-5 h-5 mr-3" />
                  {(!isSidebarCollapsed || isMobile) && <span>Log Out</span>}
                </Link>
                {(!isSidebarCollapsed || isMobile) && (
                  <div className="border border-gray-700 rounded-lg">
                    <LanguageSelector />
                  </div>
                )}
              </div>
              {(!isSidebarCollapsed || isMobile) && (
                <Link
                  href="https://changelly.com/buy-crypto"
                  target="_blank"
                  style={{ "marginTop": '30px' }}
                  className="flex flex-row bg-[#00bf62] p-2 rounded-lg cursor-pointer hover:bg-[#00bf62]/90 transition-colors w-full"
                >
                  <WalletIcon className="w-5 h-5 mr-3" />
                  <span>Buy Crypto</span>
                </Link>
              )}
              {(!isSidebarCollapsed || isMobile) && (
                <Link
                  href="https://changelly.com/buy-crypto"
                  target="_blank"
                  className="flex items-center text-gray-300 hover:text-white w-[90%]"
                  style={{ "marginTop": '20px' }}
                >
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
      </div>
    );
  };

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
          <div className={`fixed left-0 top-0 h-full bg-[#1F1635] z-[1000] border-r border-gray-800 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-[280px]'}`}>
            <SidebarContent />
          </div>
        )}

        {isMobile && (
          <ClickOutside onClick={() => {setIsOpen(false); setIsModalOpen(false)}}>
            <div className={`fixed left-0 top-0 h-full bg-[#1F1635] z-[1000] border-r border-gray-800 transition-all duration-300 w-[280px] ${!isOpen ? 'opacity-0 transform -translate-x-full' : 'opacity-100 transform translate-x-0'}`}>
              <SidebarContent />
            </div>
          </ClickOutside>
        )}

        <div className="flex-1">
          <header className="fixed top-0 left-0 right-0 z-[999] bg-[#130D25] shadow-lg">
            <div className={`mx-auto px-4 py-4 flex items-center justify-between ${!isMobile ? (isSidebarCollapsed ? 'ml-[180px]' : 'ml-[340px]') : ''}`}>
              <Link href="/" className="flex-shrink-0">
                <Image priority src="/images/wecazoo.png" width={11} height={11} alt="Wecazoo Logo" className="h-9 lg:h-11 w-auto" />
              </Link>

              {/* Balance display for mobile */}
              {isAuthenticated && (
                <div className="flex items-center mx-auto">
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

              {isAuthenticated && !isMobile && <div className="flex">
                <Link
                  href="#"
                  onClick={() => setIsExpanded(true)}
                  className="flex items-center justify-center bg-[#0b0911] hover:bg-[#0b0911]/90 text-white rounded-lg p-3 transition-colors"
                  style={{ fontFamily: 'League Spartan, sans-serif' }}
                >
                  <ChatBubbleIcon className="w-5 h-5" />
                </Link>
              </div>}

              {/* Auth buttons in top bar for mobile */}
              {!isAuthenticated && (
                <div className="flex items-center gap-3 mr-4 sm:mr-32">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsAuthModalType(true);
                    }}
                    className="text-sm"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsAuthModalType(false);
                    }}
                    className="bg-[#00bf62] hover:bg-[#00bf62]/90 text-sm"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </header>
        </div>
      </div >

      {/* Mobile Bottom Menu */}
      {isMobile && <MobileBottomMenu />}

      {/* Add padding to prevent content from being hidden behind bottom menu on mobile */}
      {isMobile && <div className="pb-16" />}
    </>
  );
};

export default Navbar;