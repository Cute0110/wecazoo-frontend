import { Pagination } from "antd";
import UserManageTable from "./UserManageTable";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import DeleteConfirmModal from "./DeleteConfirmModal";
import UserTransactionModal from "./UserTransactionModal";

const UserManage = ({
  userData,
  onGetTableDataAction,
  onUserStatusChangeAction,
  onUserTransactionAction,
  onDeleteUserAction
}: any) => {

  const { authData } = useAuth();
  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [paginationVal, setPaginationVal] = useState(1);
  const [pageSizeVal, setPageSizeVal] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserTransactionModalOpen, setIsUserTransactionModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderData, setOrderData] = useState({ order: "id", dir: "asc" });

  const pageSizeOptions = ['10', '20', '50'];


  const onCreateTableData = (tempData: any, userData: any, pageNum: any, pageCount: any) => {
    for (let i = 0; i < userData.length; i++) {
      const temp = {
        key: userData[i].id,
        no: (pageNum - 1) * pageCount + i + 1,
        userCode: userData[i].userCode,
        emailAddress: userData[i].emailAddress,
        balance: userData[i].balance.toFixed(2),
        createDate: userData[i].createdAt,
        status: userData[i].status == 0 ? false : true,
      }
      tempData.push(temp);
    }
    return;
  }

  const onSetTableData = (pageNum: any, pageCount: any) => {
    let tempData: any = [];
    onCreateTableData(tempData, userData.data, pageNum, pageCount);
    setTotalCount(userData.count);
    setTableData(tempData);
  }

  useEffect(() => {
    onSetTableData(1, 100);
  }, []);

  useEffect(() => {
    if (orderData.dir == "") {
      onGetTableDataAction(searchValue, paginationVal, pageSizeVal, { order: "id", dir: "ASC" });
      setOrderData({ order: "id", dir: "ASC" });
    }
    else {
      onGetTableDataAction(searchValue, paginationVal, pageSizeVal, orderData);
    }
  }, [orderData]);

  useEffect(() => {
    onSetTableData(userData.pageNum, userData.pageCount);
  }, [userData]);

  const onPagenationChange = (value: any, size: any) => {
    onGetTableDataAction(searchValue, value, size, orderData);
    setPaginationVal(value);
    setPageSizeVal(size);
  }

  const onClickUserTransaction = (id: any) => {
    const data = userData.data.find((item: any) => item.id == id);
    setSelectedUserData(data);
    setIsUserTransactionModalOpen(true);
  }

  const onUserTransactionConfirm = (id: any, newBalance: any, amount: any, type: any) => {
    onUserTransactionAction(id, newBalance, amount, type);
    setSelectedUserData(null);
  }

  const onDeleteUser = (id: any) => {
    const data = userData.data.find((item: any) => item.id == id);
    setSelectedUserData(data);
    setIsDeleteModalOpen(true);
  }

  const onDeleteConfirmAction = () => {
    let temp: any = selectedUserData;
    onDeleteUserAction(temp.id, searchValue, paginationVal, pageSizeVal, orderData);
    setSelectedUserData(null);
  }

  return (
    <>
      <DeleteConfirmModal isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} onConfirmAction={onDeleteConfirmAction} />
      <UserTransactionModal selectedUserData={selectedUserData} isModalOpen={isUserTransactionModalOpen} setIsModalOpen={setIsUserTransactionModalOpen} onUserTransactionConfirm={onUserTransactionConfirm} />

      <div className="ml-[20px] lg:ml-[300px]">
        <div className="relative w-[calc(100vw-70px)] lg:w-[calc(100vw-340px)]">

          <div className="my-4">
            <Pagination
              simple
              current={paginationVal}
              total={totalCount}
              onChange={onPagenationChange}
              showSizeChanger
              pageSize={pageSizeVal}
              pageSizeOptions={pageSizeOptions}
              showTotal={(total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`} />
          </div>
          <div className="mb-2">
            <UserManageTable
              data={tableData}
              onUserStatusChangeAction={onUserStatusChangeAction}
              onDeleteUser={onDeleteUser}
              onClickUserTransaction={onClickUserTransaction}
              setOrderData={setOrderData}
            />
          </div>
          <div className="my-4">
            <Pagination
              simple
              current={paginationVal}
              total={totalCount}
              onChange={onPagenationChange}
              showSizeChanger
              pageSize={pageSizeVal}
              pageSizeOptions={pageSizeOptions}
              showTotal={(total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManage;