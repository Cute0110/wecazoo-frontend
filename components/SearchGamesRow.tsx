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
import { Drawer, notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import PlayGameModal from "./Modals/PlayGameModal";
import {
  Search
} from "lucide-react";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const SearchGamesRow = ({ allGamesData, gameSectionType, sectionTitle }: any) => {
  const [games, setGames] = useState([]);
  const [isSlotGameModalOpen, setIsSlotGameModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSlotGameLoading, setIsSlotGameLoading] = useState(false);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [launchURL, setLaunchURL] = useState("");
  const { isAuthenticated, setIsAuthenticated, authData, setAuthData } = useAuth();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setGames(allGamesData);
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
          openNotification("error", "Error", res.msg, "topRight");
        }
      } catch (err) {
        openNotification("error", "Error", "Token expired or network error", "topRight");
        setIsSlotGameModalOpen(false);
        setIsSlotGameLoading(false);
      } finally {
        setIsSlotGameLoading(false);
      }
    }
  }

  const onSearch = () => {
    setGames(allGamesData.filter((item : any) => item.name.toLowerCase().includes(searchVal.toLowerCase())));
    setIsSearchPanelOpen(true);
  }

  const onSearchPanelClose = () => {
    setIsSearchPanelOpen(false);
  }

  const onSearchValueChange = (e: any) => {
    setSearchVal(e.target.value);
  }

  return (
    <>
      {contextHolder}
      <section className="container my-12 search-panel">
        <AuthModal isModalOpen={isAuthModalOpen} onModalClose={onModalClose} modalType={true} />
        <PlayGameModal
          isModalOpen={isSlotGameModalOpen}
          onModalClose={onModalClose}
          isLoading={isSlotGameLoading}
          modalTitle={modalTitle}
          launchURL={launchURL} 
        />
        <div className="relative">
          <div className="absolute top-[50%] left-[20px] -translate-y-[50%]">
            <Search />
          </div>
          <div className="flex gap-4 w-full justify-center">
            <input
              placeholder="Search Games..."
              value={searchVal}
              onChange={onSearchValueChange}
              className="w-full pr-2 pl-12 py-2 border rounded-[50px] bg-[#2A253A]"  
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch(); // Call your onSearch function
                }
              }}
              required
            />
          </div>
        </div>
        <Drawer title="Search results" height={"330px"} placement={"bottom"} onClose={onSearchPanelClose} open={isSearchPanelOpen}>
            <div className="w-full">
              {games.length > 0 ? (
                <div className="flex w-max p-3">
                  {games.map((game: any, index) => (
                    <div
                      key={index}
                      className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer mx-2 w-[140px] h-[210px] mb-2"
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
                <div className="w-full flex items-center justify-center h-[300px]">
                  <p className="text-3xl font-bold text-muted mb-4 text-center">
                    No games found
                  </p>
                </div>
              )}
            </div>
        </Drawer>
      </section>
    </>
  );
};

export default SearchGamesRow;
