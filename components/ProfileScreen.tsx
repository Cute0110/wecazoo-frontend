"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  MdMyLocation,
  MdOutlineAccountBalance,
  MdOutlineLockPerson,
  MdVerifiedUser,
} from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { CgToggleOff } from "react-icons/cg";
import { BsPassport } from "react-icons/bs";
import { useAuth } from "@/lib/authContext";
import { useState, useEffect } from "react";
import { FaArrowUp, FaQuestionCircle } from "react-icons/fa";
import AboutLockedBalance from "./Modals/AboutLockedBalance";
import Footer from "./Footer";
import axiosInstance from "@/lib/action";
import { dot, eot } from "@/lib/cryptoUtils";

import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import PasswordResetModal from "./Modals/PasswordResetModal";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ProfileScreen = () => {
  const { isAuthenticated, authData, isSidebarCollapsed } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (authData) {
      setUserName(authData.userName);
    }
  }, [authData]);

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };

  const handle2FAToggle = () => {
    openNotification('info', 'Feature Unavailable', 'Sorry, this feature is not available at this time.', 'topRight');
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setIsSupportModalOpen(false);
  }

  const onScrollTo = (gameSection: any) => {
    const element = document.getElementById(gameSection);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
  }

  const onSaveUserName = async () => {
    if (!isValidUsername(userName)) {
      openNotification("error", "Error", "Invalid username. It must be at least 3 characters long and contain no spaces.", "topRight");
      return;
    }

    try {
      const response = await axiosInstance.post('/api/user_name_change', eot({ "id": authData.id, userName }), {
        withCredentials: true,
      });

      const res = dot(response.data);

      if (res.status == 1) {
        openNotification("success", "Success", "User name updated successfully", "topRight");
      } else {
        openNotification("error", "Error", res.msg, "topRight");
      }
    } catch (error) {
      openNotification("error", "Error", "An error occurred while updating the username.", "topRight");
    }
  }

  function isValidUsername(username: any) {
    if (username.length < 3) return false;
    if (username.includes(' ')) return false;
    return true;
  }

  return (
    <>
      {contextHolder}
      {isAuthenticated ? (
        <div className={`container flex flex-col py-8 pt-[100px] ${isSidebarCollapsed ? 'md:ml-[180px]' : 'md:ml-[350px]'}`}>
          <AboutLockedBalance isModalOpen={isModalOpen} onModalClose={onModalClose} modalTitle={"About Locked Balance"} />
          <PasswordResetModal isModalOpen={isSupportModalOpen} onModalClose={onModalClose} modalTitle={"Change Password"} userId={authData.id} />
          <h1 className="text-2xl font-bold mb-4 px-3">My Profile</h1>
          <Tabs
            defaultValue="account"
            className="flex flex-col items-start gap-2"
          >
            <TabsList className="flex-col md:flex-row gap-2.5 md:gap-4 md:mr-10 items-start">
              <TabsTrigger value="account">
                <MdOutlineAccountBalance className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Account Details</span>
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <MdOutlineLockPerson className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Privacy & Security</span>
              </TabsTrigger>
              <TabsTrigger value="closeAccount">
                <RiDeleteBin2Line className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Close Account</span>
              </TabsTrigger>
            </TabsList>

            <div className="container w-full">
              <TabsContent value="account">
                <div className="bg-[#130D25] flex flex-col p-4 md:p-8 gap-8 w-full lg:max-w-4xl">
                  <div className="w-full flex gap-4">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-muted font-medium">Username</label>
                      <input 
                        className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                      />
                    </div>
                    <button 
                      className="self-end bg-green-500 hover:bg-green-600 text-white rounded-[10px] px-6 py-3.5"
                      onClick={onSaveUserName}
                    >
                      Save
                    </button>
                  </div>

                  {/* VIP Rank Display */}
                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-muted font-medium">VIP Rank</label>
                    <div className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4">
                      <span>{authData?.vipLevel ? `VIP Level ${authData.vipLevel}` : 'Unranked'}</span>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-muted font-medium">Email Address</label>
                    <input 
                      className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" 
                      value={authData.emailAddress} 
                      disabled={true} 
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-between gap-y-4 lg:gap-x-4">
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium">Balance($)</label>
                      <input 
                        className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" 
                        value={authData.balance} 
                        disabled={true} 
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium flex items-center">
                        Locked Balance($) 
                        <FaQuestionCircle className="ml-2 cursor-pointer" onClick={() => setIsModalOpen(true)} />
                      </label>
                      <input 
                        className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" 
                        value={authData.lockedBalance} 
                        disabled={true} 
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium">Unlocked Balance($)</label>
                      <input 
                        className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" 
                        value={authData.unlockedBalance} 
                        disabled={true} 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-between gap-y-4 lg:gap-x-4">
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium">Total Bet($)</label>
                      <input 
                        className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" 
                        value={authData.totalBet} 
                        disabled={true} 
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium">Total Win($)</label>
                      <input 
                        className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" 
                        value={authData.totalWin} 
                        disabled={true} 
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacy">
                <div className="bg-[#130D25] flex flex-col p-4 md:p-8 gap-6 justify-center w-full lg:max-w-4xl">
                  <div
                    onClick={() => setIsSupportModalOpen(true)}
                    className="flex items-center justify-between py-4 px-6 bg-[#2A253A] rounded-[10px] cursor-pointer hover:bg-[#1F1635] transition-colors"
                  >
                    <p className="text-lg font-semibold">Reset Password</p>
                    <TbEdit className="text-xl text-primary" />
                  </div>

                  <div className="flex flex-col gap-4 items-start">
                    <h2 className="text-2xl font-semibold">2-Step Verification Options</h2>
                    {["Email Passcode", "Authenticator App Code", "SMS Verification"].map((method) => (
                      <div
                        key={method}
                        onClick={handle2FAToggle}
                        className="flex items-center justify-between px-6 py-4 gap-2 rounded-[10px] bg-[#2A253A] w-full cursor-pointer hover:bg-[#1F1635] transition-colors"
                      >
                        <div className="flex flex-col gap-2">
                          <p className="font-semibold text-lg">{method}</p>
                          <span className="text-sm text-muted">Feature not available at this time</span>
                        </div>
                        <CgToggleOff className="text-2xl text-muted" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="closeAccount">
                <div className="bg-[#130D25] flex flex-col p-8 gap-8 justify-center w-full lg:max-w-4xl">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-lg lg:text-xl">
                      Thank you for using WECAZOO.COM
                    </h2>
                    <p className="text-sm text-muted">
                      Why are you closing your account?
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      {[
                        "Gambling addiction or responsible gaming concerns",
                        "Unhappy with the service",
                        "Privacy concerns",
                        "Financial reasons",
                        "Technical issues",
                        "Deposit & withdrawal issues",
                        "Others (please specify)"
                      ].map((reason) => (
                        <div key={reason} className="flex gap-2">
                          <input type="radio" name="reason" id={reason.toLowerCase().replace(/\s+/g, '-')} />
                          <label className="text-sm md:text-base" htmlFor={reason.toLowerCase().replace(/\s+/g, '-')}>
                            {reason}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="flex">Close Account</Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      ) : null}
      <Footer onScrollTo={onScrollTo} />
    </>
  );
};

export default ProfileScreen;