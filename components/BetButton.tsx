import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const BetButton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
      <div className="bg-[#2A253A] px-3 md:px-9 py-5 rounded-lg flex items-center justify-between space-x-2 w-full gap-2.5 sm:gap-4 md:gap-8">
        <div className="bg-primary px-1 py-1.5 flex flex-col w-fit rounded-[10px]">
          <Button
            className="bg-background text-[10px] font-semibold tracking-wide rounded-t-[10px] rounded-b-none py-2.5 px-5 drop-shadow-[0_5px_2.5px_rgba(0,0,0,0.5)]"
            size="fit"
          >
            Manual
          </Button>
          <Button
            className="bg-[#4B5162] text-white/75 text-[10px] font-semibold tracking-wide rounded-b-[10px] rounded-t-none py-2.5 px-5"
            size="fit"
          >
            Auto
          </Button>
        </div>

        <div className="bg-background rounded-[10px] px-4 py-2.5 flex items-center gap-2.5">
          <Minus
            className="rounded-full border border-primary p-[2px] hover:bg-white hover:text-primary hover:border-none cursor-pointer"
            size={20}
          />
          <span className="text-xs font-semibold tracking-wider">1.00</span>
          <Plus
            className="rounded-full border border-primary p-[2px] hover:bg-white hover:text-primary hover:border-none cursor-pointer"
            size={20}
          />
        </div>

        <div className="grid grid-rows-2 grid-cols-2 gap-x-4 gap-y-2 w-fit">
          <span className="text-[10px] font-semibold tracking-wider text-muted bg-background hover:bg-[#1f1c2d] cursor-pointer rounded-lg px-6 py-2 w-14 md:w-16 h-8 flex items-center justify-center">
            10.00
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-muted bg-background hover:bg-[#1f1c2d] cursor-pointer rounded-lg px-6 py-2 w-14 md:w-16 h-8 flex items-center justify-center">
            20.00
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-muted bg-background hover:bg-[#1f1c2d] cursor-pointer rounded-lg px-6 py-2 w-14 md:w-16 h-8 flex items-center justify-center">
            50.00
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-muted bg-background hover:bg-[#1f1c2d] cursor-pointer rounded-lg px-6 py-2 w-14 md:w-16 h-8 flex items-center justify-center">
            100.00
          </span>
        </div>
      </div>
      <div className="w-full md:w-fit">
        <Button className="w-full md:w-[300px] py-12 text-lg font-semibold border border-foreground flex flex-col gap-1">
          <p className="text-2xl font-medium">BET</p>
          <div className="flex gap-2 items-baseline">
            <p className="text-2xl font-semibold">1.00</p>
            <span className="text-lg font-medium">EUR</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default BetButton;
