"use client";

import Dashboard from "@/components/Admin/Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/action";
import { useAuth } from "@/lib/authContext";
import { dot } from "@/lib/cryptoUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Admin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Wecazoo Admin";

    const check_auth = async () => {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get('/api/admin_check_session', {
          withCredentials: true,
        });

        const res = dot(response.data);

        if (res.status == 0) {
          router.push("/");
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        router.push("/");
      } finally {
      }
    }
    check_auth();
  }, []);
  return (
    <>
      <DefaultLayout>
        {isLoading ? (
          <Loader />
        ) : (
          <Dashboard />
        )}
      </DefaultLayout>
    </>
  );
}

export default Admin;
