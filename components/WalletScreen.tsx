"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { ChevronDown, ChevronDownIcon, CopyIcon } from "lucide-react";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useAuth } from "@/lib/authContext";
import { useState } from "react";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import axiosInstance from "@/lib/action";
import { eot, dot } from "@/lib/cryptoUtils";
import Web3 from 'web3';
import { isAddress } from 'web3-validator';

const web3 = new Web3();

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const depositAmountArray = [25, 50, 100, 200, 500, 1000];

const WalletScreen = () => {
  const { isAuthenticated, authData, setAuthData } = useAuth();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawWalletAddress, setWithdrawWalletAddress] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };

  const onAmountMinClick = () => {
    setWithdrawAmount("1.00");
  }

  const onAmountMaxClick = () => {
    setWithdrawAmount("" + authData.balance);
  }

  const handleDepositAmountInputChange = (e: any) => {
    setDepositAmount(e.target.value);
  }

  const handleWithdrawAmountInputChange = (e: any) => {
    setWithdrawAmount(e.target.value);
  }

  const handleWalletAddressInputChange = (e: any) => {
    setWithdrawWalletAddress(e.target.value);
  }

  const onDepositClick = () => {
    if (!isNaN(Number(depositAmount)) && depositAmount.trim() !== "") {
      if (Number(depositAmount) < 15) {
        openNotification("warning", "Warning", "Minimum value is 15$!", "topRight");
      } else {
        onCreateInvoice(Number(depositAmount));
      }
    } else {
      openNotification("warning", "Warning", "Input correct value!", "topRight");
    }
  }

  const onWithdrawClick = () => {
    if (!isNaN(Number(withdrawAmount)) && withdrawAmount.trim() !== "") {
      if (Number(withdrawAmount) < 1) {
        openNotification("warning", "Warning", "Minimum value is 1$!", "topRight");
      } else if (Number(withdrawAmount) > authData.balance) {
        openNotification("warning", "Warning", "You have not enough balance!", "topRight");
      } else {
        if (withdrawWalletAddress == "" || !isAddress(withdrawWalletAddress)) {
          openNotification("warning", "Warning", "Input correct wallet address!", "topRight");
        } else {
          withdrawAction(Number(withdrawAmount), withdrawWalletAddress);
        }
      }
    } else {
      openNotification("warning", "Warning", "Input correct amount value!", "topRight");
    }
  }

  const withdrawAction = async (amount: any, address: any) => {
    const response = await axiosInstance.post('/api/withdraw', eot({ amount: amount.toFixed(5), address: address }));
    const res = dot(response.data);
    if (res.status == 1) {
      setAuthData({...authData, balance: res.balance});
      openNotification("success", "Withdraw Success!", "Crypto will be arrived in your wallet soon!", "topRight");
    } else {
      openNotification("error", "Error", "You can not deposit now!", "topRight");
    }
  }

  const onCreateInvoice = async (amount: any) => {
    const response = await axiosInstance.post('/api/createInvoice', eot({ price: amount.toFixed(5), currency: "USD" }));
    const res = dot(response.data);
    if (res.status == 1) {
      window.open(res.url, '_blank');
    } else {
      openNotification("error", "Error", "You can not deposit now!", "topRight");
    }
  }

  return (
    <>
      {contextHolder}
      {isAuthenticated ?
        <div className="container flex flex-col py-8">
          <h1 className="text-2xl font-bold mb-4 px-3">Wallet</h1>
          <Tabs
            defaultValue="deposit"
            className="min-w-fit flex flex-col items-start justify-start gap-2"
          >
            <TabsList className="flex-col md:flex-row gap-2.5 md:gap-4 md:mr-10 items-start">
              <TabsTrigger value="deposit">
                <FaArrowUp className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Deposit</span>
              </TabsTrigger>
              <TabsTrigger value="withdraw">
                <BiMoneyWithdraw className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Withdraw</span>
              </TabsTrigger>
              <TabsTrigger value="transaction">
                <RiExchangeDollarLine className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Transaction</span>
              </TabsTrigger>
            </TabsList>
            {/* tab content */}
            <div className="w-full lg:max-w-4xl xl:max-w-6xl">
              <TabsContent value="deposit">
                <div className="bg-[#130D25] flex flex-col p-5 md:p-6 gap-8">
                  <div className="flex flex-col md:flex-row justify-center items-center md:justify-between gap-6 divide-y divide-gray-500/50 md:divide-none">
                    <div className="flex divide-x divide-gray-500/25">
                      <div className="pr-4">
                        <span className="text-muted whitespace-nowrap text-sm">
                          Your Balance
                        </span>
                        <p className="text-sm md:text-base font-medium">${authData.balance.toFixed(5)}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 w-full justify-center pt-6 md:pt-0">
                      <input
                        type="depositAmount"
                        id="depositAmount"
                        name="depositAmount"
                        placeholder="Input Deposit Amount"
                        value={depositAmount}
                        onChange={handleDepositAmountInputChange}
                        className="w-[50%] p-2 border rounded-xl bg-[#2A253A]"
                        required
                      />
                      <Button onClick={onDepositClick}>Deposit</Button>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Amount</h2>
                    <div className="flex flex-col my-4 gap-3">
                      {depositAmountArray.map((amount, index) => (
                        <div key={index} className="flex items-center justify-between bg-[#2A253A] rounded-[10px] px-6 py-5 md:py-4">
                          <div className="flex items-center justify-center gap-2.5">
                            <p className="font-semibold text-md">${amount.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center justify-center gap-4">
                            <Button
                              size="fit"
                              variant="link"
                              className="text-sm md:text-base font-medium"
                              onClick={() => onCreateInvoice(amount)}
                            >
                              Deposit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="withdraw">
                <div className="bg-[#130D25] flex flex-col p-5 md:p-6 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold">Your Balance</h2>
                    <div className="flex flex-col my-4 gap-3">
                      <div className="flex items-center justify-between bg-[#2A253A] rounded-[10px] px-6 py-5 md:py-4">
                        <div className="flex items-center justify-center gap-2.5">
                          <p className="font-semibold text-lg">${authData.balance.toFixed(5)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Withdraw Amount</h2>
                    <div className="flex flex-col my-4 gap-3">
                      <input
                        type="withdrawAmount"
                        id="withdrawAmount"
                        name="withdrawAmount"
                        placeholder=""
                        value={withdrawAmount}
                        onChange={handleWithdrawAmountInputChange}
                        className="w-[50%] p-2 border rounded-xl bg-[#2A253A]"
                        required
                      />
                      <div className="flex">
                        <button onClick={onAmountMinClick} type="button" className="rounded-md mr-2 border border-1 bg-[#2a253a] px-3 py-2 text-sm font-semibold hover:bg-[#130d25] text-white">
                          Min
                        </button>
                        <button onClick={onAmountMaxClick} type="button" className="rounded-md mr-2 border border-1 bg-[#2a253a] px-3 py-2 text-sm font-semibold hover:bg-[#130d25] text-white">
                          Max
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Your Wallet Address(USDT ERC20)</h2>
                    <div className="flex flex-col my-4 gap-3">
                      <input
                        type="withdrawWalletAddress"
                        id="withdrawWalletAddress"
                        name="withdrawWalletAddress"
                        placeholder=""
                        value={withdrawWalletAddress}
                        onChange={handleWalletAddressInputChange}
                        className="w-[50%] p-2 border rounded-xl bg-[#2A253A]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Button onClick={onWithdrawClick}>Withdraw</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="transaction">
                <div className="bg-[#130D25] flex flex-col px-4 py-8 md:p-8 gap-8 justify-center">
                  <div className="flex gap-4 items-start w-fit">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between space-x-8 md:space-x-12 bg-[#2A253A] rounded-[10px] py-3 px-6 min-w-fit h-12 md:h-14 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm md:text-lg">Deposit</span>
                        </div>
                        <ChevronDownIcon size={20} />
                      </div>
                      <div className="flex items-center justify-between space-x-8 md:space-x-12 bg-[#2A253A] rounded-[10px] py-3 px-6 min-w-fit h-12 md:h-14 whitespace-nowrap">
                        <span className="text-sm md:text-lg">All Status</span>
                        <ChevronDownIcon size={20} />
                      </div>
                    </div>
                    <div className="flex gap-4 flex-col md:flex-row">
                      <div className="flex items-center justify-between space-x-8 md:space-x-12 bg-[#2A253A] rounded-[10px] py-3 px-6 min-w-fit h-12 md:h-14 whitespace-nowrap">
                        <span className="text-sm md:text-lg">All Assets</span>
                        <ChevronDownIcon size={20} />
                      </div>
                      <div className="flex items-center justify-between space-x-8 md:space-x-12 bg-[#2A253A] rounded-[10px] py-3 px-4 min-w-fit h-12 md:h-14 whitespace-nowrap">
                        <span className="text-sm md:text-lg">Past 60 days</span>
                        <ChevronDownIcon size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[10px] overflow-clip w-[85vw] sm:w-[80vw] md:w-[70vw]">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#2a253a] px-6 py-3 text-sm md:text-base">
                          <th className=" font-medium w-1/4 whitespace-nowrap py-3">
                            Type
                          </th>
                          <th className="font-medium w-1/4 whitespace-nowrap py-3">
                            Merchant ID
                          </th>
                          <th className="font-medium w-1/4 whitespace-nowrap py-3">
                            Amount
                          </th>
                          <th className="font-medium w-1/4 whitespace-nowrap py-3">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm md:text-base bg-gray-800/30">
                        <tr className=" text-center">
                          <td className="px-2 py-4 w-1/4">Deposit</td>
                          <td className="px-2 py-4 w-1/4">123456</td>
                          <td className="px-2 py-4 w-1/4">$100.00</td>
                          <td className="px-2 py-4 w-1/4">Success</td>
                        </tr>
                        <tr className="text-center">
                          <td className="px-2 py-4 w-1/4">Withdrawal</td>
                          <td className="px-2 py-4 w-1/4">789012</td>
                          <td className="px-2 py-4 w-1/4">$50.00</td>
                          <td className="px-2 py-4 w-1/4">Pending</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div> :
        <div></div>}
    </>
  );
};

export default WalletScreen;