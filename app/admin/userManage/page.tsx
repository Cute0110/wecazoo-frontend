"use client";

import UserManage from "@/components/Admin/UserManage";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/action";
import { useAuth } from "@/lib/authContext";
import { dot, eot } from "@/lib/cryptoUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const UserManagePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({ data: [], count: 0, pageNum: 1, pageCount: 10 });
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };
  useEffect(() => {
    document.title = "Wecazoo Admin";

    const check_auth = async () => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get('/api/admin_check_session', {
          withCredentials: true,
        });

        const result = dot(response.data);

        if (result.status == 0) {
          router.push("/");
        } else {
          const userDataResult = await axiosInstance.post('/api/get_all_users', eot({ start: 0, length: 10, search: "", order: "id", dir: "ASC" }));

          const res = dot(userDataResult.data);

          if (res.status == 1) {
            setUserData({ data: res.data, count: res.totalCount, pageNum: res.start + 1, pageCount: res.length })
          }
          setIsLoading(false);
        }
      } catch (err) {
        router.push("/");
      } finally {
      }
    }
    check_auth();
  }, []);

  const onGetTableDataAction = async (search: any, start: any, length: any, orderData: any) => {
    try {
      const result = await axiosInstance.post("api/get_all_users", eot({ search, start: (start - 1) * length, length, order: orderData.order, dir: orderData.dir }));
      const res = dot(result.data);

      setUserData({ data: res.data, count: res.totalCount, pageNum: (res.start / res.length) + 1, pageCount: res.length })
    } catch (err) {
      openNotification('error', "Error", "error", "topRight");
    } finally {
      setIsLoading(false);
    }
  }

  const onDeleteUserAction = async (id: any, search: any, start: any, length: any, orderData: any) => {
    try {
      const result = await axiosInstance.post("api/user_delete", eot({ id }));
      const res = dot(result.data);
      if (res.status == 1) {
        const resultData = await axiosInstance.post("api/get_all_users", eot({ search, start: (start - 1) * length, length, order: orderData.order, dir: orderData.dir }));
        const response = dot(resultData.data);
        setUserData({ data: response.data, count: response.totalCount, pageNum: (response.start / response.length) + 1, pageCount: response.length })
        openNotification('success', "Success", "User deleted successfully!", "topRight");
      }
    } catch (err) {
      openNotification('error', "Error", "error", "topRight");
    } finally {
    }
  }

  const onUserTransactionAction = async (id: any, newBalance: any, amount: any, chargeType: any) => {
    try {
      const result = await axiosInstance.post("api/user_transaction", eot({ id, newBalance, amount: Number(amount), chargeType }));
      const res = dot(result.data);
      if (res.status == 1) {
        let tempData: any = [];
        userData.data.map((item: any) => tempData.push(item));
        const tempUserData = { data: tempData, count: userData.count, pageNum: userData.pageNum, pageCount: userData.pageCount };
        for (let i = 0; i < tempUserData.data.length; i++) {
          if (id == tempUserData.data[i].id) {
            tempUserData.data[i].balance = newBalance;
            break;
          }
        }
        setUserData(tempUserData);
        openNotification('success', "Success", "User transaction was successfully done!", "topRight");
      } else {
        openNotification('error', "Error", res.msg, "topRight");
      }
    } catch (err) {
      openNotification('error', "Error", "error", "topRight");
    } finally {
    }
  }

  const onUserStatusChangeAction = async (userID: any, status: any) => {
    try {
      const result = await axiosInstance.post("api/user_status_change", eot({ id: userID, status }));
      const res = dot(result.data);
      if (res.status == 1) {
        let tempData: any = [];
        userData.data.map((item: any) => tempData.push(item));
        const tempUserData = { data: tempData, count: userData.count, pageNum: userData.pageNum, pageCount: userData.pageCount };
        for (let i = 0; i < tempUserData.data.length; i++) {
          if (userID == tempUserData.data[i].id) tempUserData.data[i].status = status;
        }
        setUserData(tempUserData);
        openNotification('info', "Information", "User status has changed successfully!", "topRight");
      }
    } catch (err) {
      openNotification('error', "Error", "error", "topRight");
    } finally {
    }
  };

  return (
    <>
      {contextHolder}
      <DefaultLayout>
        {isLoading ? (
          <Loader />
        ) : (
          <UserManage
            userData={userData}
            onGetTableDataAction={onGetTableDataAction}
            onUserTransactionAction={onUserTransactionAction}
            onDeleteUserAction={onDeleteUserAction}
            onUserStatusChangeAction={onUserStatusChangeAction}
          />
        )}
      </DefaultLayout>
    </>
  );
}

export default UserManagePage;
