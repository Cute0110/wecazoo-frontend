import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";
import ManageTable from "./ManageTable";
import { UserAddOutlined, ReloadOutlined } from '@ant-design/icons'

const ProviderManage = ({
  originalData,
  onGetTableDataAction,
  onStatusChangeAction,
  onOriginalStatusChangeAction,
  onRefreshProviderAction,
}: any) => {

  const { authData } = useAuth();
  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [paginationVal, setPaginationVal] = useState(1);
  const [pageSizeVal, setPageSizeVal] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [orderData, setOrderData] = useState({ order: "id", dir: "asc" });

  const pageSizeOptions = ['10', '20', '50'];


  const onCreateTableData = (tempData: any, originalData: any, pageNum: any, pageCount: any) => {
    for (let i = 0; i < originalData.length; i++) {
      const temp = {
        key: originalData[i].id,
        no: (pageNum - 1) * pageCount + i + 1,
        code: originalData[i].code,
        name: originalData[i].name,
        type: originalData[i].type,
        order: originalData[i].order,
        isOriginal: originalData[i].isOriginal == 0 ? false : true,
        status: originalData[i].status == 0 ? false : true,
        createDate: originalData[i].createdAt,
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

  return (
    <>
      <div className="ml-[20px] lg:ml-[300px]">
        <div className="relative w-[calc(100vw-70px)] lg:w-[calc(100vw-350px)]">

          <div className="my-2">
            <div className="flex items-center justify-between mb-2">
              <p>Total Providers : <span className="text-[20px]">{totalCount}</span></p>
              <button onClick={onRefreshProviderAction} className="bg-[#1677ff] text-white hover:opacity-[0.8] ml-auto font-lg px-4 py-2 rounded-md">
                {<ReloadOutlined style={{ marginRight: '4px' }} />}Refresh
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
              onOriginalStatusChangeAction={onOriginalStatusChangeAction}
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

export default ProviderManage;