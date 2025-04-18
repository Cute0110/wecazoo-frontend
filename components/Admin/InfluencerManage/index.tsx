import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ManageTable from "./ManageTable";
import { UserAddOutlined } from '@ant-design/icons'
import CreateModal from "./CreateModal";
import TransactionModal from "./TransactionModal";

const InfluencerManage = ({
  originalData,
  onGetTableDataAction,
  onStatusChangeAction,
  onTransactionAction,
  onCreateAction,
  onDeleteAction
}: any) => {

  const { authData } = useAuth();
  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [paginationVal, setPaginationVal] = useState(1);
  const [pageSizeVal, setPageSizeVal] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderData, setOrderData] = useState({ order: "id", dir: "asc" });

  const pageSizeOptions = ['10', '20', '50'];


  const onCreateTableData = (tempData: any, originalData: any, pageNum: any, pageCount: any) => {
    for (let i = 0; i < originalData.length; i++) {
      const temp = {
        key: originalData[i].id,
        no: (pageNum - 1) * pageCount + i + 1,
        name: originalData[i].name,
        promoCode: originalData[i].promoCode,
        usersCount: originalData[i].usersCount,
        usersTotalBet: originalData[i].usersTotalBet.toFixed(2),
        profit: originalData[i].profit.toFixed(2),
        createDate: originalData[i].createdAt,
        status: originalData[i].status == 0 ? false : true,
      }
      tempData.push(temp);
    }
    return;
  }

  const onSetTableData = (pageNum: any, pageCount: any) => {
    let tempData: any = [];
    onCreateTableData(tempData, originalData.data, pageNum, pageCount);
    setTotalCount(originalData.count);
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
    onSetTableData(originalData.pageNum, originalData.pageCount);
  }, [originalData]);

  const onPagenationChange = (value: any, size: any) => {
    onGetTableDataAction(searchValue, value, size, orderData);
    setPaginationVal(value);
    setPageSizeVal(size);
  }

  const onTransaction = (id: any) => {
    const data = originalData.data.find((item: any) => item.id == id);
    setSelectedData(data);
    setIsTransactionModalOpen(true);
  }

  const onDelete = (id: any) => {
    const data = originalData.data.find((item: any) => item.id == id);
    setSelectedData(data);
    setIsDeleteModalOpen(true);
  }

  const onDeleteConfirmAction = () => {
    let temp: any = selectedData;
    onDeleteAction(temp.id, searchValue, paginationVal, pageSizeVal, orderData);
    setSelectedData(null);
  }

  const onCreate = (name: any, promoCode: any, percent: any) => {
    onCreateAction(name, promoCode, percent, searchValue, paginationVal, pageSizeVal, orderData);
  }

  const onTransactionConfirm = (id: any, payoutAmount: any) => {
    onTransactionAction(id, payoutAmount);
    setSelectedData(null);
  }

  return (
    <>
      <CreateModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} modalTitle={"Create Influencer"} onCreate={onCreate}/>
      <TransactionModal selectedData={selectedData} isModalOpen={isTransactionModalOpen} setIsModalOpen={setIsTransactionModalOpen} modalTitle={"Pay Influencer"} onTransactionConfirm={onTransactionConfirm}/>
      <DeleteConfirmModal isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} onConfirmAction={onDeleteConfirmAction} />

      <div className="ml-[20px] lg:ml-[300px]">
        <div className="relative w-[calc(100vw-70px)] lg:w-[calc(100vw-350px)]">

          <div className="my-2">
            <div className="flex items-center justify-between mb-2">
              <p>Total Influencers : <span className="text-[20px]">{totalCount}</span></p>
              <button onClick={() => setIsCreateModalOpen(true)} className="bg-[#1677ff] text-white hover:opacity-[0.8] ml-auto font-lg px-4 py-2 rounded-md">
                {<UserAddOutlined style={{ marginRight: '4px' }} />}Create
              </button>
            </div>
            <Pagination
              simple
              current={paginationVal}
              total={totalCount}
              onChange={onPagenationChange}
              showSizeChanger
              pageSize={pageSizeVal}
              pageSizeOptions={pageSizeOptions}
            // showTotal={(total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`} 
            />
          </div>
          <div className="mb-2">
            <ManageTable
              data={tableData}
              onStatusChangeAction={onStatusChangeAction}
              onDelete={onDelete}
              onTransaction={onTransaction}
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
            // showTotal={(total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluencerManage;