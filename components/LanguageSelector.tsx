"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  // { code: "FR", name: "Français", Flag: FR },
  // { code: "DE", name: "Deutsch", Flag: DE },
  // { code: "ES", name: "Español", Flag: ES },
  // { code: "RU", name: "Русский", Flag: RU },
  // { code: "SV", name: "Svenska", Flag: SE },
  // { code: "NO", name: "Norsk", Flag: NO },
  // { code: "DA", name: "Dansk", Flag: DK },
  // { code: "FI", name: "Suomi", Flag: FI },
  // { code: "ET", name: "Eesti", Flag: EE },
  // { code: "LV", name: "Latviešu", Flag: LV },
  // { code: "LT", name: "Lietuvių", Flag: LT },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex w-full items-center text-sm outline-none relative px-3 py-2 bg-slate-900 rounded-md">
        <div className="flex items-center gap-x-1 mr-1">
          <selectedLanguage.Flag className="w-5 h-3" />
          <span className="font-semibold font-mono w-6 inline-block text-center text-slate-200">
            {selectedLanguage.code}
          </span>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        sideOffset={5}
        className="bg-slate-900 border border-slate-700 rounded-md p-1 w-40 mt-1"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            className="flex items-center px-2 py-1.5 text-sm text-slate-200 hover:bg-slate-800 cursor-pointer rounded-sm"
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