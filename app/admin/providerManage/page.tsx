"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/action";
import { useAuth } from "@/lib/authContext";
import { dot, eot } from "@/lib/cryptoUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import InfluencerManage from "@/components/Admin/InfluencerManage";
import ProviderManage from "@/components/Admin/ProviderManage";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ProviderManagePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState({ data: [], count: 0, pageNum: 1, pageCount: 10 });
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
          const dataResult = await axiosInstance.post('/api/get_all_providers', eot({ start: 0, length: 10, search: "", order: "id", dir: "ASC" }));

          const res = dot(dataResult.data);

          if (res.status == 1) {
            setOriginalData({ data: res.data, count: res.totalCount, pageNum: res.start + 1, pageCount: res.length })
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
      const result = await axiosInstance.post("api/get_all_providers", eot({ search, start: (start - 1) * length, length, order: orderData.order, dir: orderData.dir }));
      const res = dot(result.data);

      setOriginalData({ data: res.data, count: res.totalCount, pageNum: (res.start / res.length) + 1, pageCount: res.length })
    } catch (err) {
      openNotification('error', "Error", "error", "topRight");
    } finally {
      setIsLoading(false);
    }
  }

  const onStatusChangeAction = async (id: any, status: any) => {
    try {
      const result = await axiosInstance.post("api/provider_status_change", eot({ id, status }));
      const res = dot(result.data);
      if (res.status == 1) {
        let tempData: any = [];
        originalData.data.map((item: any) => tempData.push(item));
        const tempUserData = { data: tempData, count: originalData.count, pageNum: originalData.pageNum, pageCount: originalData.pageCount };
        for (let i = 0; i < tempUserData.data.length; i++) {
          if (id == tempUserData.data[i].id) tempUserData.data[i].status = status;
        }
        setOriginalData(tempUserData);
        openNotification('info', "Information", "Status has changed successfully!", "topRight");
      }
    } catch (err) {
      openNotification('error', "Error", "error", "topRight");
    } finally {
    }
  };
  
  const onOriginalStatusChangeAction = async (id: any, status: any) => {
    try {
      const result = await axiosInstance.post("api/provider_original_status_change", eot({ id, isOriginal: status }));
      const res = dot(result.data);
      if (res.status == 1) {
        let tempData: any = [];
        originalData.data.map((item: any) => tempData.push(item));
        const tempUserData = { data: tempData, count: originalData.count, pageNum: originalData.pageNum, pageCount: originalData.pageCount };
        for (let i = 0; i < tempUserData.data.length; i++) {
          if (id == tempUserData.data[i].id) tempUserData.data[i].isOriginal = status;
        }
        setOriginalData(tempUserData);
        openNotification('info', "Information", "Status has changed successfully!", "topRight");
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
          <ProviderManage
            originalData={originalData}
            onGetTableDataAction={onGetTableDataAction}
            onOriginalStatusChangeAction={onOriginalStatusChangeAction}
            onStatusChangeAction={onStatusChangeAction}
          />
        )}
      </DefaultLayout>
    </>
  );
}

export default ProviderManagePage;
