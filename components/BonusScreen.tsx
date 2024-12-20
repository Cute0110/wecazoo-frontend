"use client";

import { useAuth } from "@/lib/authContext";
import { useState } from "react";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import axiosInstance from "@/lib/action";
import { eot, dot } from "@/lib/cryptoUtils";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const BonusScreen = () => {
  const { isAuthenticated, authData, setAuthData } = useAuth();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };

  const onGetUnlockedBonus = async () => {
    if (authData.unlockedBalance < 5) {
      openNotification("info", "Info", "You can get unlocked balance from 5$!", "topRight");
    } else {
      const response = await axiosInstance.post('/api/get_bonus', eot({ id: authData.id, amount: authData.unlockedBalance }));
      const res = dot(response.data);

      if (res.status == 1) {
        setAuthData({ ...authData, balance: authData.balance + authData.unlockedBalance, unlockedBalance: 0 });
      } else {
        openNotification("info", "Info", res.msg, "topRight");
      }
    }
  }

  const onGetLvUpBonus = () => {
  }
  return (
    <>
      {contextHolder}
      {isAuthenticated ?
        <div className="container flex flex-col py-8 pt-[100px]">
          <h1 className="text-2xl font-bold mb-4 px-3">Get Bonus</h1>

          <div className="bg-[#130D25] flex flex-col p-5 md:p-6 gap-8">
            <div>
              <h2 className="text-muted font-lg">Unlocked Balance</h2>
              <div className="flex items-center mt-2">
                <p className="font-semibold text-lg">${authData.unlockedBalance.toFixed(2)}</p>
                <button className="ml-4 border border-slate-200 rounded-md py-[2px] px-2 hover:bg-[#2A253A]" onClick={onGetUnlockedBonus}>Get</button>
              </div>
            </div>
            <div>
              <h2 className="text-muted font-lg">Level Up Bonus</h2>
              <div className="flex items-center mt-2">
                <p className="font-semibold text-lg">${0}</p>
                <button className="ml-4 border border-slate-200 rounded-md py-[2px] px-2 hover:bg-[#2A253A]" onClick={onGetLvUpBonus}>Get</button>
              </div>
            </div>
          </div>
        </div> :
        <div></div>}
    </>
  );
};

export default BonusScreen;
