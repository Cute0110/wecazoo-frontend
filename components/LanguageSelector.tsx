"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  GB,
  DE,
  SE,
  DK,
  NO,
  FI,
  EE,
  LV,
  LT,
  RU,
  FR,
  ES,
} from "country-flag-icons/react/3x2";

const languages = [
  { code: "EN", name: "English", Flag: GB },
  { code: "FR", name: "Français", Flag: FR },
  { code: "DE", name: "Deutsch", Flag: DE },
  { code: "ES", name: "Español", Flag: ES },
  { code: "RU", name: "Русский", Flag: RU },
  { code: "SV", name: "Svenska", Flag: SE },
  { code: "NO", name: "Norsk", Flag: NO },
  { code: "DA", name: "Dansk", Flag: DK },
  { code: "FI", name: "Suomi", Flag: FI },
  { code: "ET", name: "Eesti", Flag: EE },
  { code: "LV", name: "Latviešu", Flag: LV },
  { code: "LT", name: "Lietuvių", Flag: LT },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-sm outline-none relative">
        <div className="flex items-center gap-x-1 mr-1">
          <selectedLanguage.Flag className="w-5 h-3" />
          <span className="font-semibold font-mono w-6 inline-block text-center">
            {selectedLanguage.code}
          </span>
        </div>
        <ChevronDown size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute right-0 sm:right-10 md:-right-8 mt-2 w-fit bg-background border border-gray-600">
        {languages.map((lang) => (
          <DropdownMenuItem
            className="cursor-pointer"
            key={lang.code}
            onClick={() => setSelectedLanguage(lang)}
          >
            <lang.Flag className="w-5 h-3 mr-2" />
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
