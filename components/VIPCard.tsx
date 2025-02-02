interface VIPCardProps {
  imageSrc: string;
  levelName: string;
  rakeBack: string;
  className?: string;
}

const VIPCard: React.FC<VIPCardProps> = ({ imageSrc, levelName, rakeBack, className }) => {
  return (
    <div className="relative group">
      <img
        src={imageSrc}
        alt={levelName}
        className={`rounded-lg ${className}`}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
        <h3 className="text-xl font-bold text-white">{levelName}</h3>
        <p className="text-yellow-300">Rake Back: {rakeBack}</p>
      </div>
    </div>
  );
};

export default VIPCard;