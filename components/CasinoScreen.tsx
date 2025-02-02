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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import GamesAll from "@/components/GamesAll";
import FAQ from "@/components/WecazooFAQ";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const categories = [
  { label: "Trending Games", section: "trending-games", type: "isTrending" },
  { label: "Popular Games", section: "popular-games", type: "isPopular" },
  { label: "Most Profitable", section: "profitable-games", type: "isProfitable" },
  { label: "Wecazoo Favorite", section: "favorite-games", type: "isFavorite" },
  { label: "Live Casino", section: "live-games", type: "isLive" },
  { label: "Slots", section: "slot-games", type: "isSlot" },
  { label: "Very entertaining", section: "entertaining-games", type: "isEntertaining" },
];


const CasinoScreen = () => {
  const { isAuthenticated, isSidebarCollapsed } = useAuth();
  const [allGamesData, setAllGamesData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [searchValue, setSearchValue] = useState('');

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
    console.log(".......")
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

        <main className={`mt-[-60px] ${isSidebarCollapsed ? 'md:ml-[50px]' : 'md:ml-[280px]'} transform scale-90`}>
          <section className="container mb-8">
            <div id="sport_section" className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full mb-4 sm:mb-0">
              <HamiltonSection />
              <RaffleSection />
            </div>
          </section>

          <div id="search-games"><SearchGamesRow allGamesData={allGamesData} gameSectionType={"isAll"} sectionTitle={"Search Games"} setSearchValue={setSearchValue} /></div>

          <div className="container">
            <ScrollArea className="w-full whitespace-nowrap rounded-[50px] bg-[#130d25] h-18 md:h-20 px-2">
              <div className="flex w-max space-x-4 p-3">
                {categories.map((item: any) => (
                  <Button
                    key={item.label}
                    variant="link"
                    className="text-white hover:no-underline text-lg md:text-2xl font-bold rounded-[50px] bg-[#07001a] hover:bg-zinc-300"
                    onClick={() => onScrollTo(item.section)}
                  >
                    <div className="flex items-center">
                      <img src={`images/gameTypes/${item.type}.png`} alt={item.label} className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px]" />
                      <h2 className="text-md lg:text-lg font-bold ml-2">{item.label}</h2>
                    </div>
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          {searchValue == '' ?
            (<div>
              <div id="trending-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isTrending"} sectionTitle={"Trending Games"} /></div>
              <div id="popular-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isPopular"} sectionTitle={"Popular Games"} /></div>
              <div id="profitable-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isProfitable"} sectionTitle={"Most Profitable"} /></div>
              <div id="favorite-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isFavorite"} sectionTitle={"Wecazoo Favorite"} /></div>
              <div id="live-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isLive"} sectionTitle={"Live Casino"} /></div>
              <div id="slot-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isSlot"} sectionTitle={"Slots"} /></div>
              <div id="entertaining-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isEntertaining"} sectionTitle={"Very Entertaining"} /></div>
            </div>) : (<div>
              <GamesAll allGamesData={allGamesData.filter((item : any) => item.name.toLowerCase().includes(searchValue.toLowerCase()))} sectionTitle={""} />
            </div>)
          }
          <BetInfoSection allGamesData={allGamesData} />
          <FAQ />
        </main>

        <Footer onScrollTo={onScrollTo} />
      </div>
    </>
  );
}

export default CasinoScreen;