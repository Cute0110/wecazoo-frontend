import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaDice } from "react-icons/fa6";
import { PiPokerChipFill } from "react-icons/pi";

const RaffleSection = ({}: any) => {
  return (
    <div className="relative w-full aspect-[10/7]">
      <Image src="/images/raffle.jpg" alt="hamilton" fill className="object-cover z-0 rounded-lg" />
    </div>
  );
};

export default RaffleSection;
