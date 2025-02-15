"use client"

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import axiosInstance from "@/lib/action";
import { dot } from '@/lib/cryptoUtils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import Footer from './Footer';
import { notification } from 'antd';

interface VIPLevel {
  name: string;
  image: string;
  rakeBack: string;
  requiredWager: number;
}

interface UserVIPData {
  current_vip_level_id: string | null;
  total_wager: number;
  weekly_wager: number;
  monthly_wager: number;
}

const VIPScreen: React.FC = () => {
  const [userVIPData, setUserVIPData] = useState<UserVIPData>({
    current_vip_level_id: null,
    total_wager: 0,
    weekly_wager: 0,
    monthly_wager: 0
  });
  const [claimedLevels, setClaimedLevels] = useState<Set<number>>(new Set());

  const { isSidebarCollapsed } = useAuth();
  const [api, contextHolder] = notification.useNotification();

  const vipLevels: VIPLevel[] = [
    { name: 'Bronze I', image: '/images/vip/bronze-1.jpg', rakeBack: '0.1%', requiredWager: 1000 },
    { name: 'Bronze II', image: '/images/vip/bronze-2.jpg', rakeBack: '0.2%', requiredWager: 5000 },
    { name: 'Bronze III', image: '/images/vip/bronze-3.jpg', rakeBack: '0.3%', requiredWager: 10000 },
    { name: 'Silver I', image: '/images/vip/silver-1.jpg', rakeBack: '0.4%', requiredWager: 25000 },
    { name: 'Silver II', image: '/images/vip/silver-2.jpg', rakeBack: '0.5%', requiredWager: 50000 },
    { name: 'Silver III', image: '/images/vip/silver-3.jpg', rakeBack: '0.6%', requiredWager: 100000 },
    { name: 'Gold I', image: '/images/vip/gold-1.jpg', rakeBack: '0.7%', requiredWager: 250000 },
    { name: 'Gold II', image: '/images/vip/gold-2.jpg', rakeBack: '0.8%', requiredWager: 500000 },
    { name: 'Gold III', image: '/images/vip/gold-3.jpg', rakeBack: '0.9%', requiredWager: 1000000 },
    { name: 'Diamond I', image: '/images/vip/diamond-1.jpg', rakeBack: '1.0%', requiredWager: 2500000 },
    { name: 'Diamond II', image: '/images/vip/diamond-2.jpg', rakeBack: '1.1%', requiredWager: 5000000 },
    { name: 'Diamond III', image: '/images/vip/diamond-3.jpg', rakeBack: '1.2%', requiredWager: 10000000 },
    { name: 'Ruby I', image: '/images/vip/ruby-1.jpg', rakeBack: '1.3%', requiredWager: 25000000 },
    { name: 'Ruby II', image: '/images/vip/ruby-2.jpg', rakeBack: '1.4%', requiredWager: 50000000 },
    { name: 'Ruby III', image: '/images/vip/ruby-3.jpg', rakeBack: '1.5%', requiredWager: 75000000 },
    { name: 'Emerald I', image: '/images/vip/emerald-1.jpg', rakeBack: '1.6%', requiredWager: 85000000 },
    { name: 'Emerald II', image: '/images/vip/emerald-2.jpg', rakeBack: '1.7%', requiredWager: 95000000 },
    { name: 'Emerald III', image: '/images/vip/emerald-3.jpg', rakeBack: '1.8%', requiredWager: 100000000 }
  ];

  useEffect(() => {
    const fetchUserVIPData = async () => {
      try {
        const response = await axiosInstance.get('/api/vip/status');
        const data = dot(response.data);
        setUserVIPData(data.data);
        console.log(data.data);
        // Set claimed levels based on total wager
        const claimed = new Set<number>();
        vipLevels.forEach((level, index) => {
          if (data.data.total_wager >= level.requiredWager) {
            claimed.add(index);
          }
        });
        setClaimedLevels(claimed);
      } catch (error) {
        console.error('Error fetching VIP data:', error);
      }
    };

    fetchUserVIPData();
  }, []);

  const onScrollTo = (gameSection: any) => {
    const element = document.getElementById(gameSection);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
  }

  const carouselOptions = {
    align: "start" as const,
    loop: false,
    skipSnaps: true,
  };

  const handleClaimClick = (level: number) => {
    setClaimedLevels(prev => new Set([...prev, level]));
    api.success({
      message: 'VIP Level Claimed',
      description: `Congratulations! You've claimed ${vipLevels[level].name}!`,
      duration: 3,
    });
  };

  const VIPLevelCard = ({ level, index }: { level: VIPLevel, index: number }) => {
    const isClaimable = userVIPData.total_wager >= level.requiredWager;
    const isClaimed = claimedLevels.has(index);

    return (
      <div className="relative group">
        <img
          src={level.image}
          alt={level.name}
          className="rounded-lg w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
          <h3 className="text-xl font-bold text-white">{level.name}</h3>
          <p className="text-yellow-300">Rake Back: {level.rakeBack}</p>
          <p className="text-gray-300 text-sm mb-2">Required Wager: ${level.requiredWager.toLocaleString()}</p>
          <Button
            className={`w-full ${isClaimed
                ? 'bg-gray-600 cursor-not-allowed'
                : isClaimable
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            onClick={() => isClaimable && !isClaimed && handleClaimClick(index)}
            disabled={!isClaimable || isClaimed}
          >
            {isClaimed ? 'Claimed' : 'Claim Now'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen bg-opacity-10 p-4">
        <div className={`max-w-7xl ${isSidebarCollapsed ? 'md:ml-[180px]' : 'md:ml-[350px]'}`}>
          <Card className="mb-8 bg-gradient-to-r from-green-800 to-green-900 text-white">
            <CardHeader>
              <CardTitle>Your VIP Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-lg mb-2">
                    Current Level: {userVIPData.current_vip_level_id ? vipLevels[Number(userVIPData.current_vip_level_id)].name : 'No VIP Rank Yet'}
                  </p>
                  <p className="text-lg">
                    Total Wager: ${userVIPData.total_wager.toLocaleString()}
                  </p>
                  {userVIPData.current_vip_level_id && (
                    <p className="text-lg text-yellow-300">
                      Current Rake Back: {vipLevels[Number(userVIPData.current_vip_level_id)].rakeBack}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm">
                    Weekly Bonus Available: ${Math.floor(userVIPData.weekly_wager / 1000)}
                  </p>
                  <p className="text-sm">
                    Monthly Bonus Available: ${Math.floor(userVIPData.monthly_wager / 1000)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-gradient-to-r from-purple-800 to-purple-900 text-white">
            <CardHeader>
              <CardTitle>Understanding Rake Back</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Rake Back is our way of rewarding our most loyal players by reducing the house edge. As you climb up the VIP levels,
                the house edge decreases, giving you better odds and more value for your gameplay. The higher your VIP level,
                the lower the house edge becomes, making your gaming experience more rewarding.
              </p>
            </CardContent>
          </Card>

          <div className="relative">
            <h2 className="text-2xl font-bold mb-4 text-green-100">VIP Levels</h2>
            <Carousel opts={carouselOptions} className="w-full">
              <CarouselContent className="-ml-4">
                {vipLevels.map((level, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <VIPLevelCard level={level} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>

          <Card className="mt-8 bg-gradient-to-r from-green-800 to-green-900 text-white">
            <CardHeader>
              <CardTitle>VIP Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Level Up Bonuses</h3>
                  <p className="mb-1">• 0.2% of total wager amount for all levels</p>
                  <p>• 1% bonus at Emerald III (100M wagered)</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Weekly & Monthly Rewards</h3>
                  <p className="mb-1">• Weekly Bonus: $1 for every $1,000 wagered</p>
                  <p>• Monthly Bonus: $1 for every $1,000 wagered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer onScrollTo={onScrollTo} />
    </>
  );
};

export default VIPScreen;