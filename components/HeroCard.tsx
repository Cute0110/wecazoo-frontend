import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaDice } from "react-icons/fa6";
import { PiPokerChipFill } from "react-icons/pi";

interface HeroCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonTextSecondary: string;
  imageSrc: string;
  iconType: "sports" | "casino";
}

const HeroCard: React.FC<HeroCardProps> = ({
  title,
  description,
  buttonText,
  buttonTextSecondary,
  imageSrc,
  iconType,
}) => {
  const iconSrc =
    iconType === "sports" ? "/images/rugby-ball.png" : "/images/cards.png";

  const iconAlt = iconType === "sports" ? "Sports icon" : "Casino icon";

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-t-lg rounded-b-lg sm:rounded-b-none">
      <Image src={imageSrc} alt={title} fill className="object-cover z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(19,13,37,0.8)] to-[#130D25] z-10" />
      <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end gap-9 bottom-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Image src={iconSrc} alt={iconAlt} width={24} height={24} />
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          <p className="text-white text-opacity-80 max-w-md">{description}</p>
        </div>
        <div className="flex gap-4 w-full">
          <Button className="flex-1 flex gap-2 items-center justify-center text-sm font-semibold md:px-3.5 lg:px-[32px]">
            <FaDice className="w-5 h-5" />
            {buttonText}
          </Button>
          <Button
            variant="secondary"
            className="flex-1 flex gap-2 items-center justify-center text-sm font-semibold md:px-3.5 lg:px-[32px]"
          >
            <PiPokerChipFill className="w-5 h-5" />
            {buttonTextSecondary}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
