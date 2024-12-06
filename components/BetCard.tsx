import React from "react";
import Image from "next/image";
import { TbBallFootball } from "react-icons/tb";

interface BetCardProps {
  league: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
}

const BetCard: React.FC<BetCardProps> = ({
  league,
  date,
  time,
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  odds,
}) => {
  return (
    <div className="bg-[#130D25]  rounded-t-lg sm:rounded-t-none rounded-b-lg p-6 w-full md:max-w-md lg:max-w-none flex flex-col gap-6">
      <div className="flex justify-between items-center mb-3 text-muted">
        <div className="flex items-center justify-between gap-2">
          <TbBallFootball />
          <span className="text-sm font-semisemibold">{league}</span>
        </div>
        <span className="text-sm text-muted">{`${date}, ${time}`}</span>
      </div>
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="bg-[#2A253A] rounded-full w-10 h-10 flex items-center justify-center">
            <Image src={homeTeamLogo} alt={homeTeam} width={24} height={24} />
          </div>
          <span className="text-sm mt-1">{homeTeam}</span>
        </div>
        <div className="flex-grow flex justify-center">
          <span className="text-xs text-muted">VS</span>
        </div>
        <div className="flex flex-col items-end justify-center gap-2">
          <div className="bg-[#2A253A] rounded-full w-10 h-10 flex items-center justify-center">
            <Image src={awayTeamLogo} alt={awayTeam} width={24} height={24} />
          </div>
          <span className="text-sm mt-1">{awayTeam}</span>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <button className="bg-[#2A253A] hover:bg-[#1F1C2D] text-muted px-2 rounded transition-colors flex items-center justify-center gap-4 text-xs h-[32px] w-[76px]">
          1
          <span className="font-semibold text-foreground">
            {odds.home.toFixed(2)}
          </span>
        </button>
        <button className="bg-[#2A253A] hover:bg-[#1F1C2D] text-muted px-2 rounded transition-colors flex items-center justify-center gap-4 text-xs h-[32px] w-[76px]">
          X
          <span className="font-semibold text-foreground">
            {odds.draw.toFixed(2)}
          </span>
        </button>
        <button className="bg-[#2A253A] hover:bg-[#1F1C2D] text-muted px-2 rounded transition-colors flex items-center justify-center gap-4 text-xs h-[32px] w-[76px]">
          2
          <span className="font-semibold text-foreground">
            {odds.away.toFixed(2)}
          </span>
        </button>
      </div>
    </div>
  );
};

export default BetCard;
