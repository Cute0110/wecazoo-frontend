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
import TrendingGames from "@/components/TrendingGames";
import WelcomeScreen from "@/components/WelcomeScreen";
import FAQ from "@/components/WecazooFAQ";
import { MoreHorizontal } from "lucide-react";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Home = () => {
  const { isAuthenticated, isSidebarCollapsed } = useAuth();
  const [allGamesData, setAllGamesData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
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
    document.title = "Wecazoo - Best Crypto Casino | 500% Bonus, No KYC & Fast Payouts";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Wecazoo is a top crypto casino offering Solana, Bitcoin & more. Play with no KYC in the UK, Canada, Sverige, Netherlands & more. 500% deposit bonus!");
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

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is the lg breakpoint in Tailwind
    };

    checkMobile();

    fetchData();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
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
        <Navbar isNavLinksHidden={false} onScrollTo={onScrollTo} />

        <main
          className={`mt-[-40px] ${isSidebarCollapsed ? 'md:ml-[50px]' : 'md:ml-[280px]'} transform scale-90`} // Added transform and scale
        >
          <div className="md:container flex flex-row w-full">
            <Hero />
          </div>

          <div id="trending-games">
            <GamesRow allGamesData={allGamesData} gameSectionType={"isTrending"} sectionTitle={"Trending"} onViewAll={null} />
          </div>

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

          <div className="md:container flex flex-row w-full">
            <CarPlay onScrollTo={onScrollTo} />
          </div>

          <BetInfoSection allGamesData={allGamesData} />
          <FAQ />
        </main>
        <Footer onScrollTo={onScrollTo} />
      </div >
    </>
  );
}

export default Home;