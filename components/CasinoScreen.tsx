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
import WelcomeScreen from "@/components/WelcomeScreen";
import FAQ from "@/components/WecazooFAQ";

import { MoreHorizontal } from "lucide-react";
import ProvidersRow from "./ProvidersRow";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const categories = [
  { label: "Game Lobby", section: "isLobby", type: "provider" },
  { label: "Zoo Originals", section: "isOriginal", type: "isOriginal" },
  { label: "Improved RTP", section: "isImproved", type: "isImproved" },
  // { label: "Game Providers", section: "providers", type: "provider" },
  { label: "Trending Games", section: "isTrending", type: "isTrending" },
  // { label: "Popular Games", section: "popular-games", type: "isPopular" },
  // { label: "Most Profitable", section: "profitable-games", type: "isProfitable" },
  { label: "Live Casino", section: "isLive", type: "isLive" },
  { label: "Slots", section: "isSlot", type: "isSlot" },
  { label: "Entertaining", section: "isEntertaining", type: "isEntertaining" },
];


const CasinoScreen = () => {
  const { isAuthenticated, isSidebarCollapsed } = useAuth();
  const [allGamesData, setAllGamesData] = useState([]);
  const [filteredGameData, setFilteredGame] = useState([]);
  const [allProvidersData, setAllProvidersData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [searchValue, setSearchValue] = useState('');
  const [selectedType, setSelectedType] = useState('isLobby');

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
          setAllProvidersData(res.providerData);
        } else {
          openNotification("error", "Error", res.msg, "topRight");
        }
      } catch (err) {
        openNotification("error", "Error", "Network error!", "topRight");
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is the lg breakpoint in Tailwind
    };

    checkMobile();

    fetchData();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onShowGames = (gameSection: any) => {
    setSelectedType(gameSection);
    if (gameSection === "isLobby") {
      setFilteredGame([]);
      return;
    }

    const tempData = allGamesData.filter((item: any) => item[gameSection] == true);
    if (gameSection == "isPopular" || gameSection == "isLive") {
      tempData.sort((a: any, b: any) => b.order - a.order);
    }

    setFilteredGame(tempData);

    // Wait for the next render cycle to complete
    setTimeout(() => {
      const element = document.getElementById("search-games");
      if (element) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 76;
        const top = element.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: top,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-background text-foreground">

        <main className={`mt-[-60px] ${isSidebarCollapsed ? 'md:ml-[50px]' : 'md:ml-[280px]'} transform scale-90`}>
          <section className="container mb-8">
            <div id="sport_section" className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full mb-4 sm:mb-0">
              {/* Mobile Welcome Screen */}
              {isMobile && !isExpanded && <WelcomeScreen />}

              {/* Desktop Layout */}
              {(!isMobile || isExpanded) && (
                <>
                  <WelcomeScreen />
                  <HamiltonSection />
                  <RaffleSection />
                </>
              )}

              {/* Expand button - Only visible on mobile when not expanded */}
              {isMobile && !isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="p-2 bg-[#060019] rounded-full shadow-md hover:bg-[#130d25] transition-colors"
                  aria-label="Show more sections"
                >
                  <MoreHorizontal className="w-6 h-6 text-white" />
                </button>
              )}

              {/* Collapse button - Only visible on mobile when expanded */}
              {isMobile && isExpanded && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="mt-4 w-full py-2 px-4 bg-[#060019] rounded-md hover:bg-[#130d25] transition-colors text-white"
                >
                  Show less
                </button>
              )}
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
                    className={`text-white hover:no-underline text-lg md:text-2xl font-bold rounded-[50px]  ${item.section === selectedType ? "bg-[#3c3c3fe6]" : "bg-[#07001a]"} hover:bg-zinc-300`}
                    onClick={() => onShowGames(item.section)}
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
          {searchValue == '' && filteredGameData.length == 0 ?
            (<div>
              <div id="original-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isOriginal"} sectionTitle={"Zoo Originals"} onViewAll={() => onShowGames("isOriginal")} /></div>
              <div id="improved-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isImproved"} sectionTitle={"Improved RTP"} onViewAll={() => onShowGames("isImproved")} /></div>
              <div id="providers"><ProvidersRow allProvidersData={allProvidersData} /></div>
              <div id="trending-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isTrending"} sectionTitle={"Trending Games"} onViewAll={() => onShowGames("isTrending")} /></div>
              {/* <div id="popular-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isPopular"} sectionTitle={"Popular Games"} /></div>
              <div id="profitable-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isProfitable"} sectionTitle={"Most Profitable"} /></div>
              <div id="favorite-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isFavorite"} sectionTitle={"Wecazoo Favorite"} /></div> */}
              <div id="live-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isLive"} sectionTitle={"Live Casino"} onViewAll={() => onShowGames("isLive")} /></div>
              <div id="slot-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isSlot"} sectionTitle={"Slots"} onViewAll={() => onShowGames("isSlot")} /></div>
              <div id="entertaining-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isEntertaining"} sectionTitle={"Entertaining"} onViewAll={() => onShowGames("isEntertaining")} /></div>
            </div>) : (<div>
              <GamesAll allGamesData={filteredGameData.length == 0 ? allGamesData.filter((item: any) => item.name.toLowerCase().includes(searchValue.toLowerCase())) :
                filteredGameData.filter((item: any) => item.name.toLowerCase().includes(searchValue.toLowerCase()))} sectionTitle={""} />
            </div>)
          }
          <BetInfoSection allGamesData={allGamesData} />
          <FAQ />
        </main>

        <Footer onShowGames={onShowGames} />
      </div>
    </>
  );
}

export default CasinoScreen;