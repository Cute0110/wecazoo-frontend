import Image from "next/image";

interface VIPCardProps {
  imageSrc: string;
  levelName: string;
}

const VIPCard: React.FC<VIPCardProps> = ({ imageSrc, levelName }) => {
  return (
    <div className="flex-none max-w-[350px] transition-transform duration-300 hover:scale-105">
      <Image
        src={imageSrc}
        alt={`VIP ${levelName}`}
        width={400}
        height={400}
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
};

export default VIPCard;