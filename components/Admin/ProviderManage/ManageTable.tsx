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
  code: string;
  type: string;
  order: number;
  isOriginal: boolean;
  status: boolean;
  createDate: Date;
}

const dirTypeArray = ["", "ASC", "DESC"];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ManageTable = ({data, onStatusChangeAction, onOriginalStatusChangeAction, setOrderData} : any) => {

  const [noDir, setNoDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [nameDir, setNameDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [codeDir, setCodeDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [typeDir, setTypeDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [orderDir, setOrderDir] = useState(0); // 0: noSort, 1: asc, 2: desc
  const [createdAtDir, setCreatedAtDir] = useState(0); // 0: noSort, 1: asc, 2: desc

  
  const formatSortVal = () => {
    setNoDir(0);
    setNameDir(0);
    setCodeDir(0);
    setTypeDir(0);
    setOrderDir(0);
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
    else if (title == "Code") {
      setOrderData({order: "code", dir: dirTypeArray[(codeDir + 1) % 3]});
      setCodeDir((codeDir + 1) % 3);
    }
    else if (title == "Type") {
      setOrderData({order: "type", dir: dirTypeArray[(typeDir + 1) % 3]});
      setTypeDir((typeDir + 1) % 3);
    }
    else if (title == "Order") {
      setOrderData({order: "order", dir: dirTypeArray[(orderDir + 1) % 3]});
      setOrderDir((orderDir + 1) % 3);
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
      title: <HeadTitle title={"Name"} sortDir={nameDir} onSortClick={onSortClick}/>,
      dataIndex: 'name',
      key: 'name',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: <HeadTitle title={"Code"} sortDir={codeDir} onSortClick={onSortClick}/>,
      dataIndex: 'code',
      key: 'code',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: <HeadTitle title={"Type"} sortDir={typeDir} onSortClick={onSortClick}/>,
      dataIndex: 'type',
      key: 'type',
      onCell: () => ({
        style: { minWidth: '150px' }, // Set min-width for the first column in tbody
      }),
    },
    {
      title: <HeadTitle title={"Order"} sortDir={orderDir} onSortClick={onSortClick}/>,
      dataIndex: 'order',
      key: 'order',
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
      title: 'Set as Original',
      dataIndex: 'isOriginal',
      key: 'isOriginal',
      align: 'center',
      width: 70,
      render: (isOriginal, record) => (
        <Switch
          style={isOriginal? {backgroundColor: "#1677ff"} : {backgroundColor: "#8c9aa9"}}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          value={isOriginal}
          onClick={() => onOriginalStatusChangeAction(record.key, isOriginal ? 0 : 1)}
        />
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
        scroll={{ x: `${data.length == 0 ? "1200px" : "max-content"}` }} 
        pagination={false}
      />
    </>
  )
}

export default ManageTable;