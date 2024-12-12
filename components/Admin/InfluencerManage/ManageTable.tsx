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
  name: string;
  promoCode: string;
  usersCount: number;
  usersTotalBet: number;
  profit: number;
  status: boolean;
  createDate: Date;
}

const dirTypeArray = ["", "ASC", "DESC"];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ManageTable = ({data, onStatusChangeAction, onDelete, onTransaction, setOrderData} : any) => {

  const [noDir, setNoDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [nameDir, setNameDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [usersCountDir, setUsersCountDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [usersTotalBetDir, setUsersTotalBetDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [profitDir, setProfitDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [createdAtDir, setCreatedAtDir] = useState(0); // 0: noSort, 1: asc, 2: desc

  
  const formatSortVal = () => {
    setNoDir(0);
    setNameDir(0);
    setUsersCountDir(0);
    setUsersTotalBetDir(0);
    setCreatedAtDir(0);
  }

  const onSortClick = (title: any) => {
    formatSortVal();
    if (title == "No") {
      setOrderData({order: "no", dir: dirTypeArray[(noDir + 1) % 3]});
      setNoDir((noDir + 1) % 3);
    }
    else if (title == "Name") {
      setOrderData({order: "name", dir: dirTypeArray[(nameDir + 1) % 3]});
      setNameDir((nameDir + 1) % 3);
    }
    else if (title == "Users Count") {
      setOrderData({order: "usersCount", dir: dirTypeArray[(usersCountDir + 1) % 3]});
      setUsersCountDir((usersCountDir + 1) % 3);
    }
    else if (title == "Users Total Bet") {
      setOrderData({order: "usersTotalBet", dir: dirTypeArray[(usersTotalBetDir + 1) % 3]});
      setUsersTotalBetDir((usersTotalBetDir + 1) % 3);
    }
    else if (title == "Profit") {
      setOrderData({order: "profit", dir: dirTypeArray[(profitDir + 1) % 3]});
      setProfitDir((profitDir + 1) % 3);
    }
    else if (title == "Created At") {
      setOrderData({order: "createdAt", dir: dirTypeArray[(createdAtDir + 1) % 3]});
      setCreatedAtDir((createdAtDir + 1) % 3);
    }
  }

  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const onActionClick = (key: any, record: any) => {
    if (key == 1) {
      onTransaction(record.key);
    }else if (key == 10) {
      onDelete(record.key);
    }
  };
  
  const actionMenus: any = [
    {
      label: <span className="text-[rgb(26,175,172,1)]"><SwapOutlined className='mr-1'/> Pay</span>,
      key: '1',
    },
    {
      label: <span className="text-[rgb(243,67,67,1)]"><UserDeleteOutlined className='mr-1'/> Delete</span>,
      key: '10',
    },
  ];

  const columns: TableColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 70,
    },
    {
      title: <HeadTitle title={"Name"} sortDir={nameDir} onSortClick={onSortClick}/>,
      dataIndex: 'name',
      key: 'name',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: 'Promo Code',
      dataIndex: 'promoCode',
      key: 'promoCode',
      width: 150,
    },
    {
      title: <HeadTitle title={"Users Count"} sortDir={usersCountDir} onSortClick={onSortClick}/>,
      dataIndex: 'usersCount',
      key: 'usersCount',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: <HeadTitle title={"Users Total Bet"} sortDir={usersTotalBetDir} onSortClick={onSortClick}/>,
      dataIndex: 'usersTotalBet',
      key: 'usersTotalBet',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: <HeadTitle title={"Profit"} sortDir={profitDir} onSortClick={onSortClick}/>,
      dataIndex: 'profit',
      key: 'profit',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
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
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 80,
      render: (_:any, record) => (
        <Dropdown
          menu={{
            items: actionMenus.map((item: any) => ({
              ...item,
              onClick: () => onActionClick(item.key, record), // Pass the item key and record data
            })),
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <span className="text-[20px] text-[rgb(78,194,240,1)]"><EditOutlined /></span>
            </Space>
          </a>
        </Dropdown>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 70,
      render: (status, record) => (
        <Switch
          style={status? {backgroundColor: "#1677ff"} : {backgroundColor: "#8c9aa9"}}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          value={status}
          onClick={() => onStatusChangeAction(record.key, status ? 0 : 1)}
        />
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: `${data.length == 0 ? "800px" : "max-content"}` }} 
        pagination={false}
      />
    </>
  )
}

export default ManageTable;