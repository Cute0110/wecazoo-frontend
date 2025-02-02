import React from 'react';
import { Collapse, type CollapseProps } from 'antd';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  key: string;
  label: string;
  children: string;
}

const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      key: '1',
      label: "What Is Wecazoo?",
      children: "Wecazoo is a online crypto casino and betting platform with slots, live casino games and sports betting available, Wecazoo crypto casino is based out of San José, Costa Rica. Wecazoo & wecazoo.com were founded in 2023."
    },
    {
      key: '2',
      label: "Is Wecazoo Licensed?",
      children: "Yes wecazoo.com and wecazoo are licensed and regulated by the government of Costa Rica."
    },
    {
      key: '3',
      label: "Is Playing On Wecazoo Safe?",
      children: "Yes, playing on wecazoo is safe, we follow all regulatory requirements and we always do our best to make our player's experiences on our crypto casino platform at wecazoo the best possible. And if you have any issues at all do not hesitate to contact our friendly support team for help."
    },
    {
      key: '4',
      label: "In Which Crypto's Can I Deposit?",
      children: "Wecazoo accepts over +40 different cryptocurrencies as a form of deposit on our platform. Including all major blockchains and coins like btc, eth, sol, bnb, usdt, usdc, trx, xrp and many others."
    },
    {
      key: '5',
      label: "What Type Of Games Can I Play On Wecazoo?",
      children: "You can play slot games from game providers like pragmatic, hacksaw and a many others, wecazoo original games like the popular crash or mines game. You can also Play live casino games like live poker or roulette with a real dealer."
    },
    {
      key: '6',
      label: "What Type Of Sports Can I Bet On In Wecazoo?",
      children: "You can bet on all major sports and sporting events on Wecazoo. You can also bet on your favorite players to perform, on wecazoo crypto casino."
    },
    {
      key: '7',
      label: "Does Wecazoo Really Give A 500% Deposit Bonus?",
      children: "Yes, wecazoo will give you an up to 500% deposit bonus in wecazoo crypto casino in terms of locked balance. Locked Balance can be unlocked from wagering on wecazoo and then claimable from the bonus page on wecazoo, you can find the bonus page from the side panel menu."
    },
    {
      key: '8',
      label: "Is Wecazoo Actually Crypto's Most Rewarding Casino?",
      children: "Yes wecazoo is crypto's most rewarding casino, since we give out locked balance bonuses on every deposit made on wecazoo crypto casino and wecazoo also has the most rewarding player VIP program on the crypto casino market. With a maximum level up reward bonus of $1M when reaching Emerald III, the highest rank of VIP you can have in wecazoo crypto casino."
    }
  ];

  return (
    <div className="w-full mt-20 px-5 pb-0 md:px-10 rounded-md font-bold">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <Collapse
        items={faqItems}
        defaultActiveKey={[]}
        expandIcon={({ isActive }: { isActive?: boolean }) => (
          <ChevronDown className={`collapse-icon ${isActive ? 'rotate' : ''}`} />
        )}
        expandIconPosition="end"
      />
    </div>
  );
};

export default FAQ;