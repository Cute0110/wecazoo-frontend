"use client";

import React from "react";
import WelcomeScreen from "./WelcomeScreen";
import HamiltonSection from "./HamiltonSection";
import RaffleSection from "./RaffleSection";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import 'swiper/css';

const images = [
  { src: <WelcomeScreen />, alt: "BTC" },
  { src: <HamiltonSection />, alt: "ETH" },
  { src: <RaffleSection />, alt: "BNB" },
];

export default function SportCarousel() {
  return (
    <Swiper 
      slidesPerView={1}
      spaceBetween={20} // Adds space between images
      autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-scroll every 3 sec
      loop={true} // Infinite scrolling
      modules={[Autoplay]} className="w-full container cursor-pointer"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-auto">
            {image.src}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}