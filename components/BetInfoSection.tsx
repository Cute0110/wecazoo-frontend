import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import moment from 'moment';
import Image from "next/image";

interface DataType {
  key: React.Key,
  game: string;
  user: string;
  time: string;
  bet: number;
  multiplier: number;
  payout: number;
}

const BetInfoSection = ({allGamesData} : any) => {
  const [betInfoData, setBetInfoData]: any = useState([]);
  const betInfoLength = 5;
  const randomRate = [2, 10, 3, 10, 4, 10, 2, 100, 3, 100, 10, 4, 5, 10, 500];

  const getRandomNumber = (digits: number): string => {
    return Array.from({ length: digits }, () => Math.floor(Math.random() * 10)).join('');
  };

  const getRandomChars = (chars: number): string => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
    return Array.from({ length: chars }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  };

  const createRandomUserBetInfo = () => {
    const firstTwoNumbers = getRandomNumber(2);
    const middleChars = getRandomChars(2);
    const lastThreeNumbers = getRandomNumber(3);

    const userName = "wecazoo_" + firstTwoNumbers + middleChars + lastThreeNumbers;
    const betDate = moment().format("HH:mm");
    const betAmount = (Math.floor(Math.random() * 10)) % 2 == 0 ? Math.random() * randomRate[(Math.floor(Math.random() * 10000)) % 15] : Math.floor(Math.random() * randomRate[(Math.floor(Math.random() * 10000)) % 15]);
    const multiType = [-1, 0, 1 + Math.random() * randomRate[(Math.floor(Math.random() * 10000)) % 15]];
    const multiplierVal = multiType[(Math.floor(Math.random() * 10000)) % 3];
    const payoutAmount = ((betAmount == 0 ? betAmount + 1 : betAmount) * multiplierVal);
    const gameName = allGamesData[(Math.floor(Math.random() * 10000)) % allGamesData.length]?.name;
    return { key: userName, game: gameName, user: userName, time: betDate, bet: betAmount == 0 ? (betAmount + 1).toFixed(1) : betAmount.toFixed(1), multiplier: multiplierVal.toFixed(1), payout: payoutAmount.toFixed(1) };
  }

  const timerFunc = () => {
    const addBetInfoType = Math.floor(Math.random() * 100) % 4;
    if (addBetInfoType == 0 || addBetInfoType == 3) {
      setBetInfoData((prevData: any) => {
        const tempArray = [];
        tempArray.push(createRandomUserBetInfo());
        for (let i = 0; i < betInfoLength - 1; i++) {
          tempArray.push(prevData[i]);
        }
        return tempArray;
      });
    } else if (addBetInfoType == 1) {
      setBetInfoData((prevData: any) => {
        const tempArray = [];
        tempArray.push(createRandomUserBetInfo());
        tempArray.push(createRandomUserBetInfo());
        for (let i = 0; i < betInfoLength - 2; i++) {
          tempArray.push(prevData[i]);
        }
        return tempArray;
      });
    }
  }

  useEffect(() => {
    const tempArray = [];
    for (let i = 0; i < betInfoLength; i++) {
      tempArray.push(createRandomUserBetInfo());
    }
    setBetInfoData(tempArray);
    const timer = setInterval(timerFunc, 1000);

    return () => {
      clearInterval(timer); // Clear the interval when the component unmounts
    };
  }, [allGamesData]);

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Game',
      dataIndex: 'game',
      key: 'game',
      width: 150,
      render: (game) => (
        <div className='flex items-center'>
          <Image src={"images/seven.png"} className='rounded-full mr-2' width={24} height={24} alt={"user"} />
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {game}
          </span>
        </div>
      ),
      ellipsis: true, // Enable text truncation
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      width: 100,
      render: (user) => (
        <div className='flex items-center'>
          <Image src={"images/incognito.png"} className='rounded-full mr-2' width={24} height={24} alt={"user"} />
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            Incognito
          </span>
        </div>
      ),
      ellipsis: true, // Enable text truncation
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      width: 100,
      ellipsis: true, // Enable text truncation
      render: (time) => (
        <span>{time}</span>
      )
    },
    {
      title: 'Bet',
      dataIndex: 'bet',
      key: 'bet',
      width: 100,
      ellipsis: true, // Enable text truncation
      render: (bet) => (
        <span>$ {bet}</span>
      )
    },
    {
      title: 'Multiplier',
      dataIndex: 'multiplier',
      key: 'multiplier',
      width: 100,
      ellipsis: true, // Enable text truncation
      render: (multiplier) => (
        <span>{`${multiplier <= 0 ? "" : "X " + multiplier}`}</span>
      )
    },
    {
      title: 'Payout',
      dataIndex: 'payout',
      key: 'payout',
      width: 80,
      ellipsis: true, // Enable text truncation
      render: (payout, record) => (
        <span className={`${record.multiplier <= 0 ? "" : "text-[#00FF00]"}`}>$ {record.multiplier < 0 ? "0.0" :payout}</span>
      )
    },
  ];

  return (
    <>
      <div className='container bet-info-section' >
        <div className="flex items-center">
          <img src={`images/bet.png`} alt={"Recent Bets"} className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" />
          <h2 className="text-md lg:text-3xl font-bold ml-2">Recent Bets</h2>
        </div>
        <Table
          className="text-md lg:text-3xl font-bold ml-2 mt-4"
          columns={columns}
          dataSource={betInfoData}
          scroll={{ x: `${betInfoData.length == 0 ? "1200px" : "max-content"}` }}
          pagination={false}
        />
      </div>
    </>
  )
}

export default BetInfoSection;