import React, { useEffect, useState } from 'react';
import { Dropdown, notification, Space, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import {Switch} from "antd";
import {CheckOutlined, CloseOutlined, EditOutlined, UserAddOutlined, UserDeleteOutlined, HistoryOutlined, FileSyncOutlined, FundProjectionScreenOutlined, SwapOutlined} from '@ant-design/icons'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import HeadTitle from '../../ui/HeadTitle';

interface DataType {
  key: React.Key;
  no: number;
  userNmae: string;
  type: string;
  sentAmount: string;
  receivedAmount: string;
  userPrevBalance: number;
  userAfterBalance: number;
  status: string;
  createDate: Date;
}

const dirTypeArray = ["", "ASC", "DESC"];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ManageTable = ({data, onStatusChangeAction, onOriginalStatusChangeAction, setOrderData} : any) => {

  const [noDir, setNoDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [sentAmountDir, setSentAmountDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [receivedAmountDir, setReceivedAmountDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [userPrevBalanceDir, setUserPrevBalanceDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [userAfterBalanceDir, setUserAfterBalanceDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [createdAtDir, setCreatedAtDir] = useState(0); // 0: noSort, 1: asc, 2: desc

  
  const formatSortVal = () => {
    setNoDir(0);
    setSentAmountDir(0);
    setReceivedAmountDir(0);
    setUserPrevBalanceDir(0);
    setUserAfterBalanceDir(0);
    setCreatedAtDir(0);
  }

  const onSortClick = (title: any) => {
    formatSortVal();
    if (title == "No") {
      setOrderData({order: "no", dir: dirTypeArray[(noDir + 1) % 3]});
      setNoDir((noDir + 1) % 3);
    }
    else if (title == "Sent Amount") {
      setOrderData({order: "sentAmount", dir: dirTypeArray[(sentAmountDir + 1) % 3]});
      setSentAmountDir((sentAmountDir + 1) % 3);
    }
    else if (title == "Received Amount") {
      setOrderData({order: "receivedAmount", dir: dirTypeArray[(receivedAmountDir + 1) % 3]});
      setReceivedAmountDir((receivedAmountDir + 1) % 3);
    }
    else if (title == "User Prev Balance") {
      setOrderData({order: "userPrevBalance", dir: dirTypeArray[(userPrevBalanceDir + 1) % 3]});
      setUserPrevBalanceDir((userPrevBalanceDir + 1) % 3);
    }
    else if (title == "User After Balance") {
      setOrderData({order: "userAfterBalance", dir: dirTypeArray[(userAfterBalanceDir + 1) % 3]});
      setUserAfterBalanceDir((userAfterBalanceDir + 1) % 3);
    }
    else if (title == "Created At") {
      setOrderData({order: "createdAt", dir: dirTypeArray[(createdAtDir + 1) % 3]});
      setCreatedAtDir((createdAtDir + 1) % 3);
    }
  }

  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const columns: TableColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 70,
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      width: 100,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: <HeadTitle title={"Sent Amount"} sortDir={sentAmountDir} onSortClick={onSortClick}/>,
      dataIndex: 'sentAmount',
      key: 'sentAmount',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: <HeadTitle title={"Received Amount"} sortDir={receivedAmountDir} onSortClick={onSortClick}/>,
      dataIndex: 'receivedAmount',
      key: 'receivedAmount',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: <HeadTitle title={"User Prev Balance"} sortDir={userPrevBalanceDir} onSortClick={onSortClick}/>,
      dataIndex: 'userPrevBalance',
      key: 'userPrevBalance',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: <HeadTitle title={"User After Balance"} sortDir={userAfterBalanceDir} onSortClick={onSortClick}/>,
      dataIndex: 'userAfterBalance',
      key: 'userAfterBalance',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: <HeadTitle title={"Created At"} sortDir={createdAtDir} onSortClick={onSortClick}/>,
      dataIndex: 'createDate',
      key: 'createDate',
      onCell: () => ({
        style: { minWidth: '200px' }, // Set min-width for the first column in tbody
      }),
      render: (createDate) => (
        <span>{moment(createDate).format("YYYY-MM-DD HH:mm:ss")}</span>
      )
    },
  ];

  return (
    <>
      {contextHolder}
      <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: `${data.length == 0 ? "1200px" : "max-content"}` }} 
        pagination={false}
      />
    </>
  )
}

export default ManageTable;