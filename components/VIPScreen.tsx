"use client"

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import VIPCard from '@/components/VIPCard';
import axiosInstance from "@/lib/action";
import { dot } from '@/lib/cryptoUtils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import { useAuth } from "@/lib/authContext";

interface VIPLevel {
  name: string;
  image: string;
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

  
  const { isSidebarCollapsed } = useAuth();

  const vipLevels: VIPLevel[] = [
    { name: 'Bronze I', image: '/images/vip/bronze-1.jpg' },
    { name: 'Bronze II', image: '/images/vip/bronze-2.jpg' },
    { name: 'Bronze III', image: '/images/vip/bronze-3.jpg' },
    { name: 'Silver I', image: '/images/vip/silver-1.jpg' },
    { name: 'Silver II', image: '/images/vip/silver-2.jpg' },
    { name: 'Silver III', image: '/images/vip/silver-3.jpg' },
    { name: 'Gold I', image: '/images/vip/gold-1.jpg' },
    { name: 'Gold II', image: '/images/vip/gold-2.jpg' },
    { name: 'Gold III', image: '/images/vip/gold-3.jpg' },
    { name: 'Diamond I', image: '/images/vip/diamond-1.jpg' },
    { name: 'Diamond II', image: '/images/vip/diamond-2.jpg' },
    { name: 'Diamond III', image: '/images/vip/diamond-3.jpg' },
    { name: 'Ruby I', image: '/images/vip/ruby-1.jpg' },
    { name: 'Ruby II', image: '/images/vip/ruby-2.jpg' },
    { name: 'Ruby III', image: '/images/vip/ruby-3.jpg' },
    { name: 'Emerald I', image: '/images/vip/emerald-1.jpg' },
    { name: 'Emerald II', image: '/images/vip/emerald-2.jpg' },
    { name: 'Emerald III', image: '/images/vip/emerald-3.jpg' },
  ];

  useEffect(() => {
    const fetchUserVIPData = async () => {
      try {
        const response = await axiosInstance.get('/api/vip/status');
        const data = dot(response.data);
        setUserVIPData(data.data);
      } catch (error) {
        console.error('Error fetching VIP data:', error);
      }
    };

    fetchUserVIPData();
  }, []);

  const carouselOptions = {
    align: "start" as const,
    loop: false,
    skipSnaps: true,
  };

  return (
    <div className="min-h-screen bg-green-900 bg-opacity-10 p-4">
      <div className={`max-w-7xl ${isSidebarCollapsed ? 'md:ml-[50px]' : 'md:ml-[280px]'}`}>
        {/* User's Current VIP Status */}
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
                  Total Wager: ${userVIPData.total_wager}
                </p>
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

        {/* VIP Levels Scroll Section */}
        <div className="relative">
          <h2 className="text-2xl font-bold mb-4 text-green-100">VIP Levels</h2>
          <div className="overflow-x-auto">
            <Carousel
              opts={carouselOptions}
              className="w-full"
            >
              <CarouselContent className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                {vipLevels.map((level: any, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:gap-4 relative group cursor-pointer p-0"
                  >
                    <VIPCard
                      key={level.name}
                      imageSrc={level.image}
                      levelName={level.name}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            {/* <div className="flex space-x-6 pb-6">
              {vipLevels.map((level) => (
                <VIPCard
                  key={level.name}
                  imageSrc={level.image}
                  levelName={level.name}
                />
              ))}
            </div> */}
          </div>
        </div>

        {/* VIP Benefits Info */}
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
  );
};

export default VIPScreen;