import Image from "next/image";

interface VIPCardProps {
  imageSrc: string;
  levelName: string;
}

const VIPCard: React.FC<VIPCardProps> = ({ imageSrc, levelName }) => {
  return (
    <div className="flex-none w-64 transition-transform duration-300 hover:scale-105">
      <Image
        src={imageSrc}
        alt={`VIP ${levelName}`}
        width={200}
        height={200}
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
};

export default VIPCard;