"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect } from "react";

const Admin = () => {
  useEffect(() => {
    document.title = "BestFun";
  }, []);
  return (
    <>
      <DefaultLayout>
        asdfddddddddddddddddddddddddddddd
      </DefaultLayout>
    </>
  );
}

export default Admin;
