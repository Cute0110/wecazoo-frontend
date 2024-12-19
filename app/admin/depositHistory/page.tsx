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
import DepositHistory from "@/components/Admin/DepositHistory";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const DepositHistoryPage = () => {
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
          const dataResult = await axiosInstance.post('/api/get_deposit_histories', eot({ start: 0, length: 10, search: "", order: "id", dir: "ASC" }));

          const res = dot(dataResult.data);

          if (res.status == 1) {
            setOriginalData({ data: res.data, count: res.totalCount, pageNum: res.start + 1, pageCount: res.length })
          } else {
            openNotification("error", "Error", "Network error!", "topRight");
          }
          setIsLoading(false);
        }
      } catch (err) {
        openNotification("error", "Error", "Network error!", "topRight");
        router.push("/");
      } finally {
      }
    }
    check_auth();
  }, []);

  const onGetTableDataAction = async (search: any, start: any, length: any, orderData: any) => {
    try {
      const result = await axiosInstance.post("api/get_deposit_histories", eot({ search, start: (start - 1) * length, length, order: orderData.order, dir: orderData.dir }));
      const res = dot(result.data);

      if (res.status == 1) {
        setOriginalData({ data: res.data, count: res.totalCount, pageNum: (res.start / res.length) + 1, pageCount: res.length })
      } else {
        openNotification("error", "Error", "Network error!", "topRight");
      }
    } catch (err) {
      openNotification('error', "Error", "error", "topRight");
    } finally {
    }
  }

  return (
    <>
      {contextHolder}
      <DefaultLayout>
        {isLoading ? (
          <Loader />
        ) : (
          <DepositHistory
            originalData={originalData}
            onGetTableDataAction={onGetTableDataAction}
          />
        )}
      </DefaultLayout>
    </>
  );
}

export default DepositHistoryPage;
