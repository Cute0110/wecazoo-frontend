"use client";

import React, { useEffect, useRef, useState } from "react";
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
import PlayGameModal from "./Modals/PlayGameModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const GamesRow = ({ allGamesData, gameSectionType, sectionTitle, onViewAll }: any) => {
  const [games, setGames] = useState([]);
  const [isSlotGameModalOpen, setIsSlotGameModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSlotGameLoading, setIsSlotGameLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [launchURL, setLaunchURL] = useState("");
  const { isAuthenticated, setIsAuthenticated, authData, setAuthData } = useAuth();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const tempData = allGamesData.filter((item: any) => item[gameSectionType] == true);
    if (gameSectionType == "isPopular" || gameSectionType == "isLive") {
      tempData.sort((a: any, b: any) => b.order - a.order);
    }
    setGames(tempData);
  }, [allGamesData]);

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };

  const onModalClose = async () => {
    setIsAuthModalOpen(false);
    setIsSlotGameModalOpen(false);
    setLaunchURL("");

    try {
      const response = await axiosInstance.get('/api/check_session', {
        withCredentials: true,
      });

      const res = dot(response.data);

      if (res.status == 1) {
        setAuthData(res.userData);
        setIsAuthenticated(res.status);
      } else {
        console.log(res.msg);
      }
    } catch (error) {
      openNotification("error", "Error", "error", "topRight");
    }
  }

  const onGameClick = async (providerCode: string, game_code: string, gameName: string, gameType: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setIsSlotGameModalOpen(true);
      setIsSlotGameLoading(true);
      setModalTitle(gameName);
      try {
        const gameCode = (gameType == 'slot' ? game_code : '');
        const response = await axiosInstance.post('/api/game_launch', eot({ userCode: authData.userCode, providerCode, gameCode }));
        const res = dot(response.data);
        if (res.status == 1) {
          setLaunchURL(res.launch_url);
        } else {
          setIsSlotGameModalOpen(false);
          setIsSlotGameLoading(false);
          openNotification("info", "Info", "Coming soon...", "topRight");
        }
      } catch (err) {
        openNotification("info", "Info", "Coming soon...", "topRight");
        setIsSlotGameModalOpen(false);
        setIsSlotGameLoading(false);
      } finally {
        setIsSlotGameLoading(false);
      }
    }
  }

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false })
  );

  const carouselOptions = {
    align: "start" as const,
    loop: false,
    skipSnaps: true,
  };

  return (
    <>
      {contextHolder}
      <section className="container my-12">
        <AuthModal isModalOpen={isAuthModalOpen} onModalClose={onModalClose} modalType={true} />
        <PlayGameModal
          isModalOpen={isSlotGameModalOpen}
          onModalClose={onModalClose}
          isLoading={isSlotGameLoading}
          modalTitle={modalTitle}
          launchURL={launchURL} />
        {/* <div className="w-full rounded-t-[10px] bg-[#1BB96B] h-18 md:h-20 font-semibold text-[35px] flex items-center pl-6">
          Trending Games
        </div> */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={`images/gameTypes/${gameSectionType}.png`} alt={sectionTitle} className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" />
            <h2 className="text-md lg:text-2xl font-bold ml-2">{sectionTitle}</h2>
          </div>

        </div>

        {/* bg-[#1BB96B4D] */}

        <div className="pr-4">
          <Carousel
            opts={carouselOptions}
            className="w-full"
          >
            {onViewAll && <Button className="font-bold absolute top-[-50px] right-[110px] sm:right-[120px] !h-10 w-20 bg-[#1d1536] border-0 rounded-md" onClick={onViewAll}>View All</Button>}
            <CarouselContent className="ml-1">
              {games.map((game: any, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/5 2xl:basis-1/6 relative group cursor-pointer p-0"
                  onClick={() => onGameClick(game.providerCode, game.gameCode, game.name, game.type)}
                >
                  <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="rounded-lg mx-auto w-[112px] h-[140px] lg:w-[225px] lg:h-[270px]"
                  />
                  <div className="absolute mx-auto w-[112px] h-[140px] lg:w-[225px] lg:h-[270px] inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 flex flex-col items-center justify-end p-4">
                    <div className="absolute bottom-0 left-0 w-full bg-white/85 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 px-2 py-3.5 text-center">
                      <span className="text-sm font-bold text-background">
                        {game.name}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 rounded-full p-1 md:p-1.5 lg:p-2">
                      <CgPlayButtonO size={24} className="text-white/90" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {/* <ScrollArea className="w-full whitespace-nowrap rounded-[10px] p-4">
          <div>

            {games.length > 0 ? (
              <div className="flex w-max space-x-4 p-3">
                {games.map((game: any, index) => (
                  <div
                    key={index}
                    className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer w-[100px] h-[150px] lg:w-[200px] lg:h-[300px]"
                    onClick={() => onGameClick(game.providerCode, game.gameCode, game.name, game.type)}
                  >
                    <Image
                      src={`/images/games/img-list-bg.png`}
                      alt={game.name}
                      fill
                      className="object-cover"
                    />
                    <Image
                      src={game.imageUrl}
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
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center h-[300px]">
                <p className="text-3xl font-bold text-muted mb-4 text-center">
                  No games found
                </p>
                <p className="text-muted text-center">
                  We're currently updating our game selection for this category.
                  Please check back soon or try another category!
                </p>
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea> */}
      </section>
    </>
  );
};

export default GamesRow;
