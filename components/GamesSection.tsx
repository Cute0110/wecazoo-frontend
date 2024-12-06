"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CgPlayButtonO } from "react-icons/cg";
import axios from 'axios';
import SlotGamesList from "./Modals/SlotGamesList";
import { useAuth } from "@/lib/authContext";
import AuthModal from "./Modals/AuthModal";
import axiosInstance from "@/lib/action";
import { dot, eot } from "@/lib/cryptoUtils";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

const categories = [
  "W Original",
  "Slots",
  "Live Casino",
  "Poker",
];

const originalGamesInfo = [
  "EVOLUTION",
  "PRAGMATICLIVE",
  "PRAGMATIC",
  "PGSOFT",
  "EVOPLAY",
]

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const GamesSection = ({ allGamesData, selectedCategory, setSelectedCategory }: any) => {
  const [games, setGames] = useState([]);
  const [slotGameData, setSlotGameData] = useState([]);
  const [isSlotGameModalOpen, setIsSlotGameModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSlotGameLoading, setIsSlotGameLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [launchURL, setLaunchURL] = useState("");
  const [selectedProviderCode, setSelectedProviderCode] = useState("list");
  const { isAuthenticated, authData } = useAuth();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    filterGames(selectedCategory);
  }, [allGamesData]);

  useEffect(() => {
    filterGames(selectedCategory);
  }, [selectedCategory]);

  const filterGames = (category: string) => {
    if (category === "Slots") {
      setGames(allGamesData.filter((item: any) => item.type === "slot"));
    } else if (category === "Live Casino") {
      setGames(allGamesData.filter((item: any) => item.type === "live"));
    } else if (category === "W Original") {
      setGames(allGamesData.filter((item: any) => originalGamesInfo.includes(item.code)));
    } else {
      setGames([]);
    }
  };

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };

  const onModalClose = () => {
    setIsAuthModalOpen(false);
    setIsSlotGameModalOpen(false);
    setModalType("");
    setLaunchURL("");
  }

  const onGameClick = async (providerCode: string, type: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      if (type === "slot") {
        setIsSlotGameModalOpen(true);
        setIsSlotGameLoading(true);
        setModalType("list");
        setModalTitle("Slot Games");
        setSelectedProviderCode(providerCode);
        try {
          const response = await axiosInstance.post('/api/game_list', eot({ providerCode }));
          const res = dot(response.data);
          if (res.status == 1) {
            setSlotGameData(res.gameList);
          } else {
            setIsSlotGameModalOpen(false);
            setIsSlotGameLoading(false);
            openNotification("error", "Error", res.msg, "topRight");
          }
        } catch (err) {
          console.log(err);
        } finally {
          setIsSlotGameLoading(false);
        }
      } else if (type === "live") {
        setIsSlotGameModalOpen(true);
        setIsSlotGameLoading(true);
        setModalType("play");
        setModalTitle("Live Casino");
        setSelectedProviderCode(providerCode);
        try {
          const response = await axiosInstance.post('/api/live_game_launch', eot({ userCode: authData.userCode, providerCode }));
          const res = dot(response.data);
          if (res.status == 1) {
            setLaunchURL(res.launch_url);
          } else {
            setIsSlotGameModalOpen(false);
            setIsSlotGameLoading(false);
            openNotification("error", "Error", res.msg, "topRight");
          }
        } catch (err) {
          console.log(err);
        } finally {
          setIsSlotGameLoading(false);
        }
      }
    }
  }

  const onSlotGameClick = async (gameData: any) => {
    setIsSlotGameLoading(true);
    try {
      const response = await axiosInstance.post('/api/slot_game_launch', eot({ userCode: authData.userCode, providerCode: selectedProviderCode, gameCode: gameData.game_code }));
      const res = dot(response.data)
      if (res.status == 1) {
        setModalType("play");
        setLaunchURL(res.launch_url);
      } else {
        openNotification("error", "Error", res.msg, "topRight");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSlotGameLoading(false);
    }
  }

  return (
    <>
      {contextHolder}
      <section className="container my-12">
        <AuthModal isModalOpen={isAuthModalOpen} onModalClose={onModalClose} modalType={true} />
        <SlotGamesList
          isModalOpen={isSlotGameModalOpen}
          onModalClose={onModalClose}
          isLoading={isSlotGameLoading}
          slotGameData={slotGameData}
          onSlotGameClick={onSlotGameClick}
          modalType={modalType}
          modalTitle={modalTitle}
          launchURL={launchURL} />
        <h2 className="text-3xl font-bold mb-6">Games</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-t-[10px] bg-[#1BB96B] h-18 md:h-20">
          <div className="flex w-max space-x-4 p-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant="link"
                className={`
                hover:text-foreground
                hover:no-underline
                text-lg md:text-2xl
                font-bold
                ${selectedCategory === category
                    ? "text-foreground"
                    : "text-[#130D25A6]"
                  }
              `}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="p-[42px] bg-[#1BB96B4D] rounded-b-[10px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-[45px] gap-x-4 min-h-[calc(2*300px)]">
            {games.length > 0 ? (
              games.map((game: any, index) => (
                <div
                  key={index}
                  className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => onGameClick(game.code, game.type)}
                >
                  <Image
                    src={`/images/games/img-list-bg.png`}
                    alt={game.name}
                    fill
                    className="object-cover"
                  />
                  <Image
                    src={`/images/games/${game.code}.png`}
                    alt={game.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 flex flex-col items-center justify-end p-4">
                    <div className="absolute bottom-0 left-0 w-full bg-white/85 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 px-2 py-3.5 text-center">
                      <span className="text-sm font-bold text-background">
                        {game.name}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 rounded-full p-1 md:p-1.5 lg:p-2">
                      <CgPlayButtonO size={24} className="text-white/90" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center h-full">
                <p className="text-3xl font-bold text-muted mb-4">
                  No games found
                </p>
                <p className="text-muted text-center">
                  We're currently updating our game selection for this category.
                  Please check back soon or try another category!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GamesSection;
