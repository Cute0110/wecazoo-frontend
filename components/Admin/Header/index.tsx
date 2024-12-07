import Link from "next/link";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-50 flex w-full bg-[#130d25] drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="block rounded-sm border border-stroke bg-#07001A shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden cursor-pointer"
          >
            <Menu />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <div className="block flex-shrink-0 lg:hidden ml-6">
            <Image
              width={50}
              height={50}
              src={"/wecazoo-logo.svg"}
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7 ml-auto">
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
