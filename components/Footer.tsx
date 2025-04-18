"use client"

import Image from "next/image";
import Logo from "@/public/wecazoo-logo.svg";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaTelegram, FaYoutube } from "react-icons/fa6";
import CryptoCarousel from "./CryptoCarousel";
import { useState } from "react";
import AboutUs from "./Modals/AboutUs";
import CustomerSupport from "./Modals/CustomerSupport";
import PrivacyPolicy from "./Modals/PrivacyPolicy";
import AMLPolicy from "./Modals/AMLPolicy";
import FAQs from "./Modals/FAQs";
import FairGameOdds from "./Modals/FairGameOdds";
import TermsConditions from "./Modals/TermsConditions";
import { useAuth } from "@/lib/authContext";
import Link from "next/link";

const Footer = ({ onScrollTo }: any) => {
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isCSModalOpen, setIsCSModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isAMLModalOpen, setIsAMLModalOpen] = useState(false);
  const [isFaqsModalOpen, setIsFaqsModalOpen] = useState(false);
  const [isFGOModalOpen, setIsFGOModalOpen] = useState(false);
  const [isTCModalOpen, setIsTCModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const { isSidebarCollapsed } = useAuth();

  const onModalClose = () => {
    setIsAboutUsModalOpen(false);
    setIsCSModalOpen(false);
    setIsPolicyModalOpen(false);
    setIsAMLModalOpen(false);
    setIsFaqsModalOpen(false);
    setIsFGOModalOpen(false);
    setIsTCModalOpen(false);
  }
  return (
    <footer className={`bg-[#130D25] ${isSidebarCollapsed ? 'md:ml-0' : 'md:ml-[280px]'}`}>
      <AboutUs isModalOpen={isAboutUsModalOpen} onModalClose={onModalClose} modalTitle={modalTitle} />
      <CustomerSupport isModalOpen={isCSModalOpen} onModalClose={onModalClose} modalTitle={modalTitle} />
      <PrivacyPolicy isModalOpen={isPolicyModalOpen} onModalClose={onModalClose} modalTitle={modalTitle} />
      <AMLPolicy isModalOpen={isAMLModalOpen} onModalClose={onModalClose} modalTitle={modalTitle} />
      <FAQs isModalOpen={isFaqsModalOpen} onModalClose={onModalClose} modalTitle={modalTitle} />
      <FairGameOdds isModalOpen={isFGOModalOpen} onModalClose={onModalClose} modalTitle={modalTitle} />
      <TermsConditions isModalOpen={isTCModalOpen} onModalClose={onModalClose} modalTitle={modalTitle} />
      {/* <section className="container bg-[#0d3832] rounded-[10px] py-4 px-2 overflow-hidden w-[95%] lg:w-full">
        <CryptoCarousel />
      </section> */}

      <div className="container flex flex-col xl:flex-row justify-between items-normal xl:items-center px-8 md:px-10 lg:px-16 xl:px-24 py-10 gap-y-6">
        {/* Logo */}
        <div className="flex-shrink-0 self-start xl:self-center mx-auto lg:mx-0">
          <a href="#">
            <Image
              priority
              src={Logo}
              alt="Wecazoo Logo"
              className="h-20 md:h-30 xl:h-40 w-auto"
            />
          </a>
        </div>
        <div className="flex justify-center mt-6">
          <Image
            src={"images/footer.png"}
            alt={"Be Gamble Aware"}
            width={0}
            height={100}
            className="w-full max-w-full md:max-w-[90%] h-auto"
            priority
          />
        </div>
        {/* Footer Links */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-12">
          <div className="flex items-start py-2 gap-6 sm:gap-6 md:gap-8 lg:gap-20">
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg">About</h3>
              <ul className="text-muted flex flex-col gap-6 justify-start">
                <li className="hover:text-primary transition-colors">
                  <span className="cursor-pointer" onClick={() => { setIsAboutUsModalOpen(true); setModalTitle("About Us"); }}>About Us</span>
                </li>
                <li className="hover:text-primary transition-colors">
                  <span className="cursor-pointer" onClick={() => { setIsFGOModalOpen(true); setModalTitle("Fair Game Odds"); }}>Fair Game Odds</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg">Support</h3>
              <ul className="text-muted flex flex-col gap-6 justify-start">
                <li className="hover:text-primary transition-colors">
                  <span className="cursor-pointer" onClick={() => { setIsCSModalOpen(true); setModalTitle("Customer Support"); }}>Customer Support</span>
                </li>
                <li className="hover:text-primary transition-colors">
                  <span className="cursor-pointer" onClick={() => { setIsFaqsModalOpen(true); setModalTitle("FAQs"); }}>FAQs</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg">Policy</h3>
              <ul className="text-muted flex flex-col gap-6 justify-start">
                <li className="hover:text-primary transition-colors">
                  <span className="cursor-pointer" onClick={() => { setIsPolicyModalOpen(true); setModalTitle("Privacy Policy"); }}>Privacy Policy</span>
                </li>
                <li className="hover:text-primary transition-colors">
                  <span className="cursor-pointer" onClick={() => { setIsAMLModalOpen(true); setModalTitle("AML Policy"); }}>AML Policy</span>
                </li>
                <li className="hover:text-primary transition-colors">
                  <span className="cursor-pointer" onClick={() => { setIsTCModalOpen(true); setModalTitle("Terms & Conditions"); }}>Terms & Conditions</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg">Games</h3>
              <ul className="text-muted flex flex-col gap-6 justify-start">
                <li className="hover:text-primary transition-colors">
                  <Link className="cursor-pointer" href={"/casino"}>Casino</Link>
                </li>
                <li className="hover:text-primary transition-colors">
                  <Link className="cursor-pointer" href={"/sports"}>Sports</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-accent md:border-none pt-8 md:pt-2 md:pb-2">
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-lg hidden md:block">Social</h3>
              <ul className="text-muted flex flex-row md:flex-col gap-8 md:gap-6 justify-evenly md:justify-start">
                <li className="group">
                  <a
                    href="https://t.me/wecazoo"
                    className="flex items-center gap-2 group-hover:text-primary transition-colors"
                  >
                    <div className="w-[48px] h-[48px] md:w-[24px] md:h-[24px] rounded-full bg-muted flex items-center justify-center group-hover:bg-primary transition-colors">
                      <FaTelegram className="text-2xl md:text-sm text-background group-hover:text-white transition-colors" />
                    </div>
                    <p className="hidden md:block">Telegram</p>
                  </a>
                </li>
                <li className="group">
                  <a
                    href="https://x.com/wecazoo_com?t=FG6phvuInUuYRNUO5twpMA&s=09"
                    className="flex items-center gap-2 group-hover:text-primary transition-colors"
                  >
                    <div className="w-[48px] h-[48px] md:w-[24px] md:h-[24px] rounded-full bg-muted flex items-center justify-center group-hover:bg-primary transition-colors">
                      <FaXTwitter className="text-2xl md:text-sm text-background group-hover:text-white transition-colors" />
                    </div>
                    <p className="hidden md:block">Twitter</p>
                  </a>
                </li>
                <li className="group">
                  <a
                    href="https://www.instagram.com/wecazoo?igsh=MXgzM3Vvd2V0MXVxbA=="
                    className="flex items-center gap-2 group-hover:text-primary transition-colors"
                  >
                    <div className="w-[48px] h-[48px] md:w-[24px] md:h-[24px] rounded-full bg-muted flex items-center justify-center group-hover:bg-primary transition-colors">
                      <FaInstagram className="text-2xl md:text-sm text-background group-hover:text-white transition-colors" />
                    </div>
                    <p className="hidden md:block">Instagram</p>
                  </a>
                </li>
                <li className="group">
                  <a
                    href="https://youtube.com/@wecazoo?feature=shared"
                    className="flex items-center gap-2 group-hover:text-primary transition-colors"
                  >
                    <div className="w-[48px] h-[48px] md:w-[24px] md:h-[24px] rounded-full bg-muted flex items-center justify-center group-hover:bg-primary transition-colors">
                      <FaYoutube className="text-2xl md:text-sm text-background group-hover:text-white transition-colors" />
                    </div>
                    <p className="hidden md:block">Youtube</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="p-6 bg-[#2A253A]">
        <p className="flex justify-center items-center text-muted text-sm mb-2">
          Wecazoo Crypto Casino and Wecazoo.com are owned and operated by Wecazoo Games S.A., a company registered and licensed in Costa Rica.
        </p>
        <p className="flex justify-center items-center text-muted text-sm mb-2">
          The registered office of Wecazoo Games S.A. is located at C. 88, San José, Geroma, Costa Rica 10101.
        </p>
        <p className="flex justify-center items-center text-muted text-sm mb-2">
          For any inquiries or support, please contact us via email at support@wecazoo.com or team@wecazoo.com.
        </p>
        <p className="flex justify-center items-center text-muted text-sm mb-2">
          © 2025 Wecazoo Games S.A. Wecazoo.com. All rights reserved.
        </p>
        <p className="flex justify-center items-center text-muted text-sm mb-2">
          Wecazoo.com operates in accordance with Costa Rican gaming regulations.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
