"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const cryptoIcons = [
  { src: "/images/coins/bitcoin.svg", alt: "BTC" },
  { src: "/images/coins/ethereum.png", alt: "ETH" },
  { src: "/images/coins/bnb.svg", alt: "BNB" },
  { src: "/images/coins/usdt.svg", alt: "USDT" },
  { src: "/images/coins/usdc.jpg", alt: "USDC" },
  { src: "/images/coins/tron.jpg", alt: "TRON" },
  { src: "/images/coins/litecoin.jpg", alt: "Litecoin" },
  { src: "/images/coins/dogecoin.jpg", alt: "Dogecoin" },
  { src: "/images/coins/ripple.jpg", alt: "Ripple" },
  { src: "/images/coins/solana.jpg", alt: "Solana" },
  { src: "/images/coins/pol.png", alt: "POL" },
];

export default function CryptoCarousel() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: false })
  );

  const carouselOptions = {
    align: "start" as const,
    loop: true,
    skipSnaps: true,
  };

  return (
    <Carousel
      opts={carouselOptions}
      plugins={[autoplayPlugin.current]}
      className="w-full container"
    >
      <CarouselContent className="-ml-4">
        {cryptoIcons.map((icon, index) => (
          <CarouselItem
            key={index}
            className="pl-4 basis-1/3 sm:basis-1/4 md:1/5 lg:basis-1/6"
          >
            <div className="flex items-center justify-center p-2">
              <Image
                src={icon.src}
                alt={icon.alt}
                width={75}
                height={75}
                className="object-contain w-[64px] h-[64px] md:w-[75px] md:h-[75px]"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
