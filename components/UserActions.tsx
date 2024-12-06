import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/authContext";
import {
  ArrowDownIcon,
  ChevronDown,
  GiftIcon,
  ListIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface userLink {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const UserActions = () => {
  const {setIsAuthenticated, authData} = useAuth();

  const userLinks: userLink[] = [
    { title: "My Profile", icon: <UserIcon size={20} />, link: "/profile" },
    { title: "Wallet", icon: <WalletIcon size={20} />, link: "/wallet" },
    { title: "Transactions", icon: <ListIcon size={20} />, link: "" },
    { title: "Refer & Earn", icon: <GiftIcon size={20} />, link: "" },
    { title: "Settings", icon: <SettingsIcon size={20} />, link: "" },
    { title: "Logout", icon: <LogOutIcon size={20}/>, link: "" },
  ];
  const router = useRouter();

  const onUserActionClick = (link: any) => {
    if (link.title == "Logout") {
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      router.push("/");
    } else {
      router.push(link.link);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-sm outline-none relative group">
        <div className="flex items-center gap-x-2 mr-1">
          <Image src={authData?.avatarURL} alt={authData?.avatarURL} width={32} height={32} className="rounded-full"></Image>
          <span>USDT {authData?.balance.toFixed(2)}$</span>
        </div>
        <ChevronDown
          size={16}
          className="text-gray-600 group-hover:text-foreground"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute right-0 sm:right-4 md:-right-16 mt-2 w-fit bg-background border-muted p-3 flex flex-col items-start justify-center">
        {userLinks.map((link, index) => (
          <DropdownMenuItem
            key={index}
            className="w-full cursor-pointer focus:bg-background text-muted focus:text-white"
            onClick={() => onUserActionClick(link)}
          >
            <div className="flex items-center">
              {link.icon}
              <span className="ml-2 text-xs">{link.title}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
