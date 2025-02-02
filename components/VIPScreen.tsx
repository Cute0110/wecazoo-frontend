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
import Footer from './Footer';

interface VIPLevel {
  name: string;
  image: string;
  rakeBack: string;
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
    { name: 'Bronze I', image: '/images/vip/bronze-1.jpg', rakeBack: '0.1%' },
    { name: 'Bronze II', image: '/images/vip/bronze-2.jpg', rakeBack: '0.2%' },
    { name: 'Bronze III', image: '/images/vip/bronze-3.jpg', rakeBack: '0.3%' },
    { name: 'Silver I', image: '/images/vip/silver-1.jpg', rakeBack: '0.4%' },
    { name: 'Silver II', image: '/images/vip/silver-2.jpg', rakeBack: '0.5%' },
    { name: 'Silver III', image: '/images/vip/silver-3.jpg', rakeBack: '0.6%' },
    { name: 'Gold I', image: '/images/vip/gold-1.jpg', rakeBack: '0.7%' },
    { name: 'Gold II', image: '/images/vip/gold-2.jpg', rakeBack: '0.8%' },
    { name: 'Gold III', image: '/images/vip/gold-3.jpg', rakeBack: '0.9%' },
    { name: 'Diamond I', image: '/images/vip/diamond-1.jpg', rakeBack: '1.0%' },
    { name: 'Diamond II', image: '/images/vip/diamond-2.jpg', rakeBack: '1.1%' },
    { name: 'Diamond III', image: '/images/vip/diamond-3.jpg', rakeBack: '1.2%' },
    { name: 'Ruby I', image: '/images/vip/ruby-1.jpg', rakeBack: '1.3%' },
    { name: 'Ruby II', image: '/images/vip/ruby-2.jpg', rakeBack: '1.4%' },
    { name: 'Ruby III', image: '/images/vip/ruby-3.jpg', rakeBack: '1.5%' },
    { name: 'Emerald I', image: '/images/vip/emerald-1.jpg', rakeBack: '1.6%' },
    { name: 'Emerald II', image: '/images/vip/emerald-2.jpg', rakeBack: '1.7%' },
    { name: 'Emerald III', image: '/images/vip/emerald-3.jpg', rakeBack: '1.8%' }
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

  return (
    <>
      <div className="min-h-screen bg-opacity-10 p-4">
        <div className={`max-w-7xl ${isSidebarCollapsed ? 'md:ml-[180px]' : 'md:ml-[350px]'}`}>
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

          {/* Rake Back Explanation Card */}
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

          {/* VIP Levels Scroll Section */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4 text-green-100">VIP Levels</h2>
            <div className="overflow-x-auto">
              <Carousel
                opts={carouselOptions}
                className="w-full"
              >
                <CarouselContent className="flex gap-4 md:gap-6 lg:gap-8">
                  {vipLevels.map((level, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 relative group cursor-pointer p-0"
                    >
                      <VIPCard
                        imageSrc={level.image}
                        levelName={level.name}
                        rakeBack={level.rakeBack}
                        className="h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
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
      <Footer onScrollTo={onScrollTo} />
    </>
  );
};

export default VIPScreen;