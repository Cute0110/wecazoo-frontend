import React from "react";
import Image from "next/image";

const WelcomeScreen = ({}: any) => {
  return (
    <div className="relative w-full aspect-[10/7]">
      <Image src="/images/welcome.jpg" alt="hamilton" fill className="object-cover z-0 rounded-lg" />
    </div>
  );
};

export default WelcomeScreen;
