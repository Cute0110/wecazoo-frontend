"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { ChevronDown, ChevronDownIcon, CopyIcon, WalletIcon } from "lucide-react";
import Image from "next/image";
import { FaArrowUp, FaQuestionCircle } from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";
import { BiMoneyWithdraw, BiCoinStack } from "react-icons/bi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useAuth } from "@/lib/authContext";
import { useState } from "react";
import { Input, notification, Select } from 'antd';
import type { NotificationArgsProps } from 'antd';
import axiosInstance from "@/lib/action";
import { eot, dot } from "@/lib/cryptoUtils";
import Web3 from 'web3';
import { isAddress } from 'web3-validator';
import AboutLockedBalance from "./Modals/AboutLockedBalance";
import GuideBuyCyrpto from "./Modals/GuideBuyCrypto";
import Footer from "./Footer";
import DepositPaymentDialog from "./Modals/DepositPaymentDialog";
import Link from "next/link";

const web3 = new Web3();

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const depositAmountArray = [25, 50, 100, 200, 500, 1000];

const WalletScreen = () => {
  const { isAuthenticated, authData, setAuthData, isSidebarCollapsed } = useAuth();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawWalletAddress, setWithdrawWalletAddress] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [assetType, setAssetType] = useState(0);
  const [isGuideBuyCryptoModalOpen, setIsGuideBuyCryptoModalOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const assetTypeArray = ["ERC 20 - USDT ETHEREUM", "BEP 20 - USDT BNB SMART CHAIN", "TRC 20 - USDT TRON", "SOLANA - USDT SOLANA"];

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };

  const onSelectAsset = (value: any) => {
    setAssetType(value);
  }

  const onAmountMinClick = () => {
    setWithdrawAmount("5.00");
  }

  const onAmountMaxClick = () => {
    setWithdrawAmount("" + authData.balance);
  }

  const handleDepositAmountInputChange = (e: any) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setDepositAmount(rawValue); // Add dollar symbol
  }

  const handleWithdrawAmountInputChange = (e: any) => {
    setWithdrawAmount(e.target.value);
  }

  const handleWalletAddressInputChange = (e: any) => {
    setWithdrawWalletAddress(e.target.value);
  }

  const openDepositSite = () => {
    window.open("https://changelly.com/buy-crypto", "_blank");
  }

  const onDepositClick = () => {
    if (!isNaN(Number(depositAmount)) && depositAmount.trim() !== "") {
      if (Number(depositAmount) < 5) {
        openNotification("warning", "Warning", "Minimum value is 5$!", "topRight");
      } else {
        onCreateInvoice(Number(depositAmount));
      }
    } else {
      openNotification("warning", "Warning", "Input correct value!", "topRight");
    }
  }

  const onModalClose = () => {
    setIsGuideBuyCryptoModalOpen(false);
  }

  const onWithdrawClick = () => {
    if (!isNaN(Number(withdrawAmount)) && withdrawAmount.trim() !== "") {
      if (Number(withdrawAmount) < 5) {
        openNotification("warning", "Warning", "Minimum value is 5$!", "topRight");
      } else if (Number(withdrawAmount) > authData.balance) {
        openNotification("warning", "Warning", "You have not enough balance!", "topRight");
      } else {
        if (withdrawWalletAddress == "") {
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
    try {
      const response = await axiosInstance.post('/api/withdraw', eot({ amount: amount.toFixed(5), address: address, asset: assetTypeArray[assetType] }));
      const res = dot(response.data);
      if (res.status == 1) {
        setAuthData({ ...authData, balance: res.balance });
        openNotification("success", "Withdraw Success!", "Crypto will be arrived in your wallet soon!", "topRight");
      } else {
        openNotification("error", "Error", res.msg, "topRight");
      }
    } catch (error) {
      openNotification("error", "Error", "Token expired or network error!", "topRight");
    }
  }

  const onCreateInvoice = async (amount: any) => {
    try {
      const response = await axiosInstance.post('/api/createInvoice', eot({ price: amount.toFixed(5), currency: "USD" }));
      const res = dot(response.data);
      if (res.status == 1) {
        setPaymentUrl(res.url);
        setIsPaymentDialogOpen(true);
      } else {
        openNotification("error", "Error", res.msg, "topRight");
      }
    } catch (error) {
      openNotification("error", "Error", "Token expired or network error", "topRight");
    }
  }

  const handleClosePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
    setPaymentUrl("");
  };

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

  return (
    <>
      {contextHolder}
      {isAuthenticated ?
        <div className={`container flex flex-col py-8 pt-[100px] ${isSidebarCollapsed ? 'md:ml-[180px]' : 'md:ml-[350px]'}`}>
          <DepositPaymentDialog
            isOpen={isPaymentDialogOpen}
            onClose={handleClosePaymentDialog}
            paymentUrl={paymentUrl}
          />
          <GuideBuyCyrpto isModalOpen={isGuideBuyCryptoModalOpen} onModalClose={onModalClose} modalTitle={"Buy Crypto"} />
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
              <TabsTrigger value="buyCrypto">
                <BiCoinStack className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Buy Crypto</span>
              </TabsTrigger>
              {/* <TabsTrigger value="transaction">
                <RiExchangeDollarLine className="mr-2 text-lg md:text-xl" />
                <span className="text-sm md:text-base">Transaction</span>
              </TabsTrigger> */}
            </TabsList>
            {/* tab content */}
            <div className="w-full lg:max-w-4xl xl:max-w-6xl">
              <TabsContent value="deposit">
                <div className="bg-[#130D25] flex flex-col p-5 md:p-6 gap-8">
                  <div className="flex flex-col p-5 md:p-6 gap-8 rounded-md max-w-[500px]">
                    <h2 className="text-xl font-semibold">Deposit</h2>
                    <div className="relative w-full max-w-[500px]">
                      <span className="absolute left-[10px] top-[50%] -translate-y-1/2 text-[20px]">$</span>
                      <input
                        type="depositAmount"
                        id="depositAmount"
                        name="depositAmount"
                        placeholder="Input deposit amount"
                        value={depositAmount}
                        onChange={handleDepositAmountInputChange}
                        className="w-full text-[15px] px-6 py-2 mx-1 border rounded-xl bg-[#34383c] flex items-center"
                        required
                      />
                    </div>
                    <div className="block w-full">
                      <div className="flex items-center w-full gap-4 my-4">
                        <div className="border-t-[1px] border-gray-600 flex-1"></div>
                        <span className="text-gray-600">Deposit with crypto</span>
                        <div className="border-t-[1px] border-gray-600 flex-1"></div>
                      </div>
                      <div className="max-w-[500px] w-full mb-[6px]">
                        <button
                          className="w-full rounded-md transition-colors disabled:pointer-events-none bg-blue-400 text-base text-white font-bold hover:bg-gray-500 disabled:text-gray-400 px-6 h-[50px]"
                          onClick={() => onDepositClick()}
                        >
                          Pay with <span className="text-white text-xl">Crypto</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="withdraw">
                <div className="bg-[#130D25] flex flex-col p-5 md:p-6 gap-8">
                  <h2 className="text-xl font-semibold">Withdraw Crypto</h2>
                  <div>
                    <h2 className="text-muted font-lg">Your Balance</h2>
                    <p className="font-semibold text-lg">${authData.balance.toFixed(5)}</p>
                  </div>
                  <div>
                    <h2 className="text-muted font-lg">Withdraw Amount In USDT</h2>
                    <div className="flex flex-col my-4 gap-3">
                      <input
                        type="withdrawAmount"
                        id="withdrawAmount"
                        name="withdrawAmount"
                        placeholder=""
                        value={withdrawAmount}
                        onChange={handleWithdrawAmountInputChange}
                        className="w-[100%] lg:w-[50%] p-2 border rounded-xl bg-[#2A253A]"
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
                    <h2 className="text-muted font-lg asset-panel">Choose Network</h2>
                    <div className="flex flex-col my-4 gap-3">
                      <Select
                        placeholder="Select asset"
                        value={assetType}
                        style={{ backgroundColor: "#2a253a", color: "white", height: "50px" }}
                        className="w-full lg:w-[50%]"
                        options={assetTypeArray.map((item: any, index: any) => ({ label: item, value: index }))}
                        onSelect={onSelectAsset}
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-muted font-lg">Your Wallet Address</h2>
                    <div className="flex flex-col my-4 gap-3">
                      <input
                        type="withdrawWalletAddress"
                        id="withdrawWalletAddress"
                        name="withdrawWalletAddress"
                        placeholder=""
                        value={withdrawWalletAddress}
                        onChange={handleWalletAddressInputChange}
                        className="w-[100%] lg:w-[50%] p-2 border rounded-xl bg-[#2A253A]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Button onClick={onWithdrawClick}>Withdraw</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="buyCrypto">
                <div className="bg-[#130D25] flex flex-col p-5 md:p-6 gap-8">
                  <h2 className="text-xl font-semibold">Buy Crypto</h2>
                  <div className="flex flex-col justify-center items-center md:justify-between gap-6 divide-y divide-gray-500/50 md:divide-none">

                    <div className="flex flex-col">
                      <Button onClick={openDepositSite} className="w-full md:w-[35%] mx-auto"><WalletIcon className="w-5 h-5 mr-3" />Buy Crypto</Button>
                      <Link href="https://changelly.com/buy-crypto" target="_blank" className="flex items-center text-gray-300 hover:text-white w-[80%] md:w-[30%] mx-auto" style={{ "marginTop": '20px' }}>
                        <img
                          src="/images/pay.png"
                          alt="VIP"
                          className="w-full h-auto rounded-lg"
                        />
                      </Link>
                      <span className="text-gray-400 w-full md:w-[40%] mx-auto">No Crypto? No Problem. You can now buy crypto easily through changelly, a wecazoo partner. <br />
                        Just select how much you want to buy and which crypto you want to buy. <br />
                        Then paste in your own wallet address and
                        choose your preferred method of payment, some examples are mastercard, visa, paypal, google pay, apple pay & many more.</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              {/* <TabsContent value="transaction">
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
              </TabsContent> */}
            </div>
          </Tabs>
        </div> :
        <div></div>}
      <Footer onScrollTo={onScrollTo} />
    </>
  );
};

export default WalletScreen;
