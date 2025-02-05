import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import Logo from "@/public/wecazoo-logo.svg";

interface SlotGameListProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  isLoading: boolean;
  modalTitle: string;
  launchURL: string;
}

const SlotGameList: React.FC<SlotGameListProps> = ({
  isModalOpen,
  onModalClose,
  isLoading,
  modalTitle,
  launchURL
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onModalClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen, onModalClose]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="max-w-[100vw] h-[100vh] p-0 bg-gradient-to-b from-blue-900 to-black">
        <div className="relative h-full w-full flex flex-col">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <Image priority src={Logo} alt="Wecazoo Logo" className="h-9 lg:h-11 w-auto" />
          </div>

          {/* <Button
            onClick={onModalClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 hover:bg-white/20 p-2"
          >
            <X className="h-6 w-6 text-white" />
          </Button> */}

          <div className="flex-1 w-full h-full">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white" />
              </div>
            ) : (
              <iframe
                src={launchURL}
                className="w-full h-full border-none"
                allow="fullscreen"
              />
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-4">
            <h2 className="text-white text-center text-xl font-semibold">
              {modalTitle}
            </h2>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlotGameList;