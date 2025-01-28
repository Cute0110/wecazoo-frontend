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

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ProfileScreen = () => {
  const { isAuthenticated, authData, isSidebarCollapsed } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const [api, contextHolder] = notification.useNotification();

  useEffect(
    () => {
      if (authData) {
        setUserName(authData.userName);
      }
    },
    [authData]
  )

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  }
  const onScrollTo = (gameSection: any) => {
    const element = document.getElementById(gameSection); // Replace with your target element's ID
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({
        top: top,
        behavior: "smooth", // Adds smooth scrolling
      });
    }
  }

  const onSaveUserName = async () => {
    // Validate the username before proceeding
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

  // Helper function to validate the username
  function isValidUsername(username : any) {
    // Check if the username is at least 3 characters long
    if (username.length < 3) {
      return false;
    }

    // Check if the username contains any spaces
    if (username.includes(' ')) {
      return false;
    }

    return true;
  }

  return (
    <>
      {contextHolder}
      {isAuthenticated ?
        <div className={`container flex flex-col py-8 pt-[100px] ${isSidebarCollapsed ? 'md:ml-[180px]' : 'md:ml-[350px]'}`}>
          <AboutLockedBalance isModalOpen={isModalOpen} onModalClose={onModalClose} modalTitle={"About Locked Balance"} />
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
              {/* <TabsTrigger value="verification">
                <MdVerifiedUser className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Verification</span>
              </TabsTrigger> */}
              <TabsTrigger value="closeAccount">
                <RiDeleteBin2Line className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Close Account</span>
              </TabsTrigger>
            </TabsList>
            {/* tab content */}
            <div className="container w-full">
              <TabsContent value="account">
                <div className="bg-[#130D25] flex flex-col p-4 md:p-8 gap-8 w-full lg:max-w-4xl">
                  <div className="w-full flex gap-4">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-muted font-medium">User Name</label>
                      <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} />
                    </div>
                    <button className="self-end bg-green-500 hover:bg-green-600 text-white rounded-[10px] px-6 py-3.5" onClick={onSaveUserName}>
                      Save
                    </button>
                  </div>
                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-muted font-medium">Email Address</label>
                    <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" value={authData.emailAddress} disabled={true} />
                  </div>
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-y-4 lg:gap-x-4">
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium">Balance($)</label>
                      <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" value={authData.balance} disabled={true} />
                    </div>
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium flex items-center">Locked Balance($) <FaQuestionCircle className="ml-2 cursor-pointer" onClick={() => setIsModalOpen(true)} /></label>
                      <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" value={authData.lockedBalance} disabled={true} />
                    </div>
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium">Unlocked Balance($)</label>
                      <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" value={authData.unlockedBalance} disabled={true} />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-y-4 lg:gap-x-4">
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium">Total Bet($)</label>
                      <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" value={authData.totalBet} disabled={true} />
                    </div>
                    <div className="w-full flex flex-col gap-1.5">
                      <label className="text-muted font-medium">Total Win($)</label>
                      <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-4" value={authData.totalWin} disabled={true} />
                    </div>
                  </div>
                  {/* <div className="flex justify-end">
                    <Button>Update</Button>
                  </div> */}
                </div>
              </TabsContent>
              <TabsContent value="privacy">
                <div className="bg-[#130D25] flex flex-col p-4 md:p-8 gap-6 justify-center w-full lg:max-w-4xl">
                  <div
                    className="flex items-center
               justify-between py-4 px-6 bg-[#2A253A] rounded-[10px]"
                  >
                    <p className="text-lg font-semibold">Reset Password</p>
                    <TbEdit className="text-xl text-primary" />
                  </div>
                  {/* 2FA*/}
                  <div className="flex flex-col gap-4 items-start">
                    <h2 className="text-2xl font-semibold">
                      2-Step Verification Options
                    </h2>
                    <div className="flex items-center justify-between px-6 py-4 gap-2 rounded-[10px] bg-[#2A253A] w-full">
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-lg">Email Passcode</p>
                        <span className="text-sm text-muted">
                          Receive passcode from your email to confirm it's you
                        </span>
                      </div>
                      <div>
                        <CgToggleOff className="text-2xl text-muted" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-6 py-4 gap-2 rounded-[10px] bg-[#2A253A] w-full">
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-lg">
                          Authenticator App Code
                        </p>
                        <span className="text-sm text-muted">
                          Enter a code generated by your authenticator to confirm
                          it's you
                        </span>
                      </div>
                      <div>
                        <CgToggleOff className="text-2xl text-muted" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-6 py-4 gap-2 rounded-[10px] bg-[#2A253A] w-full">
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-lg">SMS Verification</p>
                        <span className="text-sm text-muted">
                          Receive code by text to confirm it's you
                        </span>
                      </div>
                      <div>
                        <CgToggleOff className="text-2xl text-muted" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="verification">
                <div className="bg-[#130D25] flex flex-col p-6 md:p-8 gap-4 justify-center w-full lg:max-w-4xl">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-xl">Verify Your Identity</h2>
                    <p className="text-muted text-sm">
                      Confirm your personal information to get your account ready.
                    </p>
                  </div>
                  <hr className="border-t border-muted my-2 w-full px-4" />
                  <div
                    className="flex items-center
               justify-between px-6 py-10 md:px-10 bg-[#2A253A] rounded-[10px] gap-4 sm:gap-0"
                  >
                    <div className="flex items-center justify-between gap-6 sm:gap-12">
                      <BsPassport className="text-primary text-3xl" />
                      <p className="text-md sm:text-xl font-semibold">
                        Identity Verification
                      </p>
                    </div>
                    <div className="">
                      <em className="whitespace-nowrap">not verified</em>
                    </div>
                  </div>
                  <div
                    className="flex items-center
               justify-between px-6 py-10 md:px-10 bg-[#2A253A] rounded-[10px] mt-2 gap-4 sm:gap-0"
                  >
                    <div className="flex items-center justify-between gap-6 sm:gap-12">
                      <MdMyLocation className="text-primary text-3xl" />
                      <p className="text-md sm:text-xl font-semibold">
                        Address Verification
                      </p>
                    </div>
                    <div className="">
                      <em className="whitespace-nowrap">not verified</em>
                    </div>
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
                      <div className="flex gap-2">
                        <input type="radio" name="reason" id="addiction" />
                        <label className="text-sm md:text-base" htmlFor="addiction">
                          Gambling addiction or responsible gaming concerns
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <input type="radio" name="reason" id="service" />
                        <label className="text-sm md:text-base" htmlFor="service">
                          Unhappy with the service
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <input type="radio" name="reason" id="privacy" />
                        <label className="text-sm md:text-base" htmlFor="privacy">
                          Privacy concerns
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <input type="radio" name="reason" id="financial" />
                        <label className="text-sm md:text-base" htmlFor="financial">
                          Financial reasons
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <input type="radio" name="reason" id="technical" />
                        <label className="text-sm md:text-base" htmlFor="technical">
                          Technical issues
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <input type="radio" name="reason" id="depositWithdraw" />
                        <label
                          className="text-sm md:text-base"
                          htmlFor="depositWithdraw"
                        >
                          Deposit & withdrawal issues
                        </label>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <input type="radio" name="reason" id="others" />
                          <label className="text-sm md:text-base" htmlFor="others">
                            Others (please specify)
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder="Specify your reason"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="flex">Close Account</Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div> : <></>
      }
      <Footer onScrollTo={onScrollTo} />
    </>
  );
};

export default ProfileScreen;
