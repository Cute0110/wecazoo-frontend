"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroCard from "@/components/HeroCard";
import BetCard from "@/components/BetCard";
import GamesSection from "@/components/GamesSection";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import withAuth from '@/lib/withAuth';
import axios from "axios";
import axiosInstance from "@/lib/action";
import { dot, eot } from "@/lib/cryptoUtils";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import BonusMarket from "@/components/BonusMarket";
import { useAuth } from "@/lib/authContext";
import GamesRow from "@/components/GamesRow";
import BetInfoSection from "@/components/BetInfoSection";

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Home = () => {
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
        const response = await axiosInstance.post('/api/game_list', eot({start: 0, length: 0, search: 0, order: "order", dir: "asc"}));
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
        <Navbar isNavLinksHidden={false} onScrollTo={onScrollTo} />

        <main className="container py-8">
          <Hero />

          
          <div id="trending-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isTrending"} sectionTitle={"Trending Games"}/></div>

          <section className="container mb-8">
            <div id="sport_section" className="flex flex-col md:flex-row justify-between items-center gap-4 w-full mb-4 sm:mb-0">
              <BonusMarket />
              <HeroCard
                title="Casino"
                description="Dive in to our wide range of in-house games, live casino and slots to experience a thrilling casino adventure."
                buttonText="Slots"
                buttonTextSecondary="Live Casino"
                imageSrc="/images/hero-card-bg-1.png"
                iconType="casino"
                onScrollTo={onScrollTo}
              />
              {/* <HeroCard
                title="Sport"
                description="Explore our sports, live betting, and virtual games for an exciting sports adventure."
                buttonText="Sport"
                buttonTextSecondary="Live Sport"
                imageSrc="/images/hero-card-bg-2.png"
                iconType="sports"
                onScrollTo={onScrollTo}
              /> */}
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <BetCard
                league="Premier League"
                date="Feb 2"
                time="00:00"
                homeTeam="Chelsea"
                awayTeam="Liverpool"
                homeTeamLogo="/images/teams/CHE.png"
                awayTeamLogo="/images/teams/ARS.png"
                odds={{ home: 2.5, draw: 3.2, away: 2.8 }}
              />
              <BetCard
                league="Premier League"
                date="Feb 2"
                time="00:00"
                homeTeam="West Ham"
                awayTeam="Arsenal"
                homeTeamLogo="/images/teams/WHU.png"
                awayTeamLogo="/images/teams/ARS.png"
                odds={{ home: 2.5, draw: 3.2, away: 2.8 }}
              />
              <BetCard
                league="Premier League"
                date="Feb 2"
                time="00:00"
                homeTeam="Chelsea"
                awayTeam="Liverpool"
                homeTeamLogo="/images/teams/CHE.png"
                awayTeamLogo="/images/teams/ARS.png"
                odds={{ home: 2.5, draw: 3.2, away: 2.8 }}
              />
              <BetCard
                league="Premier League"
                date="Feb 2"
                time="00:00"
                homeTeam="West Ham"
                awayTeam="Arsenal"
                homeTeamLogo="/images/teams/ARS.png"
                awayTeamLogo="/images/teams/WHU.png"
                odds={{ home: 2.5, draw: 3.2, away: 2.8 }}
              />
            </div> */}
          </section>

          <div id="popular-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isPopular"} sectionTitle={"Popular Games"}/></div>
          <div id="profitable-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isProfitable"} sectionTitle={"Most Profitable"}/></div>
          <div id="favorite-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isFavorite"} sectionTitle={"Wecazoo Favorite"}/></div>
          <div id="live-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isLive"} sectionTitle={"Live Casino"}/></div>
          <div id="slot-games"><GamesRow allGamesData={allGamesData} gameSectionType={"isSlot"} sectionTitle={"Slots"}/></div>

          <BetInfoSection />
        </main>

        <Footer onScrollTo={onScrollTo}/>
      </div>
    </>
  );
}

export default Home;