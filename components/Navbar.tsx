"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Logo from "@/public/wecazoo-logo.svg";
import LanguageSelector from "./LanguageSelector";
import { MdLiveTv } from "react-icons/md";
import { FaDice } from "react-icons/fa6";
import { PiPokerChipFill, PiShieldStarFill } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Router } from "lucide-react";
import UserActions from "@/components/UserActions";
import AuthModal from "./Modals/AuthModal";
import { useAuth } from "@/lib/authContext";
import {
  ArrowDownIcon,
  ChevronDown,
  GiftIcon,
  ListIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";

const Navbar = ({ onScrollTo }: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalType, setIsAuthModalType] = useState(true);
  const { isAuthenticated, setIsAuthenticated, authData } = useAuth();

  const onLogOutClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    router.push("/");
  }

  const UserActionLinks = () => (
    <>
      <li>
        <Link
          href="/profile"
          className="flex items-center text-muted hover:text-foreground transition-colors whitespace-nowrap"
        >
          <UserIcon size={20} className="mr-1.5 xl:mr-2 flex-shrink-0" />
          <span className="text-sm">Profile</span>
        </Link>
      </li>
      <li>
        <Link
          href="/wallet"
          className="flex items-center text-muted hover:text-foreground transition-colors whitespace-nowrap"
        >
          <WalletIcon size={20} className="mr-1.5 xl:mr-2 flex-shrink-0" />
          <span className="text-sm">Wallet</span>
        </Link>
      </li>
      <li>
        <div
          className="flex items-center text-foreground text-sm font-medium whitespace-nowrap cursor-pointer"
          onClick={onLogOutClick}
        >
          <LogOutIcon size={20} className="mr-1.5 xl:mr-2 flex-shrink-0" />
          LgoOut
        </div>
      </li>
    </>
  );

  const NavLinks = () => (
    <>
      <li>
        <div
          className="flex items-center text-foreground text-sm font-medium whitespace-nowrap cursor-pointer"
          onClick={() => onScrollTo("W Original")}
        >
          W Original
        </div>
      </li>
      <li>
        <Link
          href="#"
          className="flex items-center text-muted hover:text-foreground transition-colors whitespace-nowrap"
        >
          <MdLiveTv size={20} className="mr-1.5 xl:mr-2 flex-shrink-0" />
          <span className="text-sm">Live Sport</span>
        </Link>
      </li>
      <li>
        <div
          onClick={() => onScrollTo("Slots")}
          className="flex items-center text-muted hover:text-foreground transition-colors whitespace-nowrap cursor-pointer"
        >
          <FaDice size={20} className="mr-1.5 xl:mr-2 flex-shrink-0" />
          <span className="text-sm">Slot</span>
        </div>
      </li>
      <li>
        <div
          onClick={() => onScrollTo("Live Casino")}
          className="flex items-center text-muted hover:text-foreground transition-colors whitespace-nowrap cursor-pointer"
        >
          <PiPokerChipFill size={20} className="mr-1.5 xl:mr-2 flex-shrink-0" />
          <span className="text-sm">Live Casino</span>
        </div>
      </li>
      <li>
        <Link
          href="#"
          className="flex items-center text-[#B98D1B] whitespace-nowrap"
        >
          <PiShieldStarFill size={20} className="mr-1.5 xl:mr-2 flex-shrink-0" />
          <span className="text-sm">Promotion</span>
        </Link>
      </li>
    </>
  );

  const onModalClose = () => {
    setIsAuthModalOpen(false);
  }

  return (
    <>
      <AuthModal isModalOpen={isAuthModalOpen} onModalClose={onModalClose} modalType={isAuthModalType} />
      <header className="h-fit bg-[#130D25]">
        <div className="container flex justify-between items-center py-4 px-10 md:px-6 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              priority
              src={Logo}
              alt="Wecazoo Logo"
              className="h-9 lg:h-11 w-auto"
            />
          </Link>

          {/* Mobile Menu */}
          <div className="lg:hidden flex">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/60 hover:text-foreground/80 hover:bg-[#1F1635] transition-colors"
                >
                  <Menu />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {!isAuthenticated ? "" : <><div className="flex items-center gap-x-2 mr-1">
                    <Image src={authData?.avatarURL} alt={authData?.avatarURL} width={32} height={32} className="rounded-full"></Image>
                    <span>USDT {authData?.balance.toFixed(2)}$</span>
                  </div>
                    <div className="border-t-[1px] border-slate-200 w-full h-[1px]"></div>
                    <ul className="flex flex-col gap-4">
                      <UserActionLinks />
                    </ul>
                  </>}
                  <LanguageSelector />
                  {!isAuthenticated ? <>
                    <Button variant="outline" className="w-full" onClick={() => { setIsAuthModalOpen(true); setIsAuthModalType(true) }}>
                      Login
                    </Button>
                    <Button className="w-full" onClick={() => { setIsAuthModalOpen(true); setIsAuthModalType(false) }}>Sign Up</Button>
                  </> : ""}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-grow-0">
            <ul className="flex gap-4 xl:gap-6 items-center">
              <NavLinks />
            </ul>
          </nav>

          {/* User Actions (Desktop) */}
          <div className="hidden lg:flex flex-shrink-0 items-center space-x-4">
            {/* <Search className="text-2xl font-semibold text-[#808792]/60 hover:text-[#808792]/100 hover:cursor-pointer" /> */}
            <LanguageSelector />
            {!isAuthenticated ? (
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="" onClick={() => { setIsAuthModalOpen(true); setIsAuthModalType(true) }}>
                  Login
                </Button>
                <Button size="sm" className="border border-primary" onClick={() => { setIsAuthModalOpen(true); setIsAuthModalType(false) }}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <UserActions />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
