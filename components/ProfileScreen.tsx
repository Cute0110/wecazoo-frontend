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
import { useState } from "react";

const ProfileScreen = () => {
  const {isAuthenticated, authData} = useAuth();
  const [userName, setUserName] = useState(authData.userName);
  const [emailAddress, setEmailAddress] = useState(authData.emailAddress);
  return (
    <>
    {isAuthenticated ? 
    
    <div className="container flex flex-col py-8">
      <h1 className="text-2xl font-bold mb-4 px-3">My Profile</h1>
      <Tabs
        defaultValue="account"
        className="min-w-fit flex flex-col items-start gap-2"
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
          <TabsTrigger value="verification">
            <MdVerifiedUser className="mr-2 text-lg md:text-xl" />
            <span className="text-sm md:text-base">Verification</span>
          </TabsTrigger>
          <TabsTrigger value="closeAccount">
            <RiDeleteBin2Line className="mr-2 text-lg md:text-xl" />
            <span className="text-sm md:text-base">Close Account</span>
          </TabsTrigger>
        </TabsList>
        {/* tab content */}
        <div className="container min-h-[70vh] w-full">
          <TabsContent value="account">
            <div className="bg-[#130D25] flex flex-col p-4 md:p-8 gap-8 w-full lg:max-w-4xl">
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-muted font-medium">User Name</label>
                <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-8" value={userName} disabled={true}/>
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-muted font-medium">Email Address</label>
                <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-8" value={emailAddress} disabled={true}/>
              </div>
              {/* <div className="w-full flex flex-col gap-1.5">
                <label className="text-muted font-medium">Phone Number</label>
                <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-8" />
              </div>
              <div className="w-full flex flex-col gap-1.5">
                <label className="text-muted font-medium">Location</label>
                <input className="flex items-center justify-between bg-[#2A253A] rounded-[10px] py-3.5 px-8" />
              </div> */}
              <div className="flex justify-end">
                <Button>Update</Button>
              </div>
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
    </>
  );
};

export default ProfileScreen;