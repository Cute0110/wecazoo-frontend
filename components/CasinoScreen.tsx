"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/action";
import { dot, eot } from "@/lib/cryptoUtils";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { useAuth } from "@/lib/authContext";
import GamesRow from "@/components/GamesRow";
import BetInfoSection from "@/components/BetInfoSection";
import CarPlay from "@/components/CarPlay";
import SearchGamesRow from "@/components/SearchGamesRow";
import HamiltonSection from "@/components/HamiltonSection";
import RaffleSection from "@/components/RaffleSection";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const CasinoScreen = () => {
  const { isAuthenticated } = useAuth();
  const [allGamesData, setAllGamesData] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };

  useEffect(() => {
    document.title = "Wecazoo";
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post('/api/game_list', eot({ start: 0, length: 0, search: 0, order: "order", dir: "asc" }));
        const res = dot(response.data);
        if (res.status == 1) {
          setAllGamesData(res.data);
        } else {
          openNotification("error", "Error", res.msg, "topRight");
        }
      } catch (err) {
        openNotification("error", "Error", "Network error!", "topRight");
      }
    };

    fetchData();
  }, []);

  const onScrollTo = (gameSection: any) => {
    const element = document.getElementById(gameSection); // Replace with your target element's ID
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({
        top: top,
        behavior: "smooth", // Adds smooth scrolling
      });
    }
  }

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-background text-foreground">

        <main className="container py-8 mt-[76px]">
          <section className="container mb-8">
            <div id="sport_section" className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full mb-4 sm:mb-0">
              <HamiltonSection />
              <RaffleSection />
            </div>
          </section>

          <BetInfoSection />

          <div id="search-games"><SearchGamesRow allGamesData={allGamesData} gameSectionType={"isAll"} sectionTitle={"Search Games"} /></div>

          <div id="trending-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isTrending"} sectionTitle={"Trending Games"} /></div>
          <div id="popular-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isPopular"} sectionTitle={"Popular Games"} /></div>
          <div id="profitable-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isProfitable"} sectionTitle={"Most Profitable"} /></div>
          <div id="favorite-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isFavorite"} sectionTitle={"Wecazoo Favorite"} /></div>
          <div id="live-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isLive"} sectionTitle={"Live Casino"} /></div>
          <div id="slot-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isSlot"} sectionTitle={"Slots"} /></div>
          <div id="entertaining-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isEntertaining"} sectionTitle={"Very Entertaining"} /></div>

        </main>

        <Footer onScrollTo={onScrollTo} />
      </div>
    </>
  );
}

export default CasinoScreen;