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
      <DialogContent className="max-w-[100vw] h-[100vh] p-0">
        <div className="relative h-full w-full flex flex-col">
          {/* Header Bar */}
          <div className="w-full h-16 bg-[#130D25] flex items-center justify-between px-4 z-20">
            <Image
              priority
              src="/images/wecazoo.png"
              width={9}
              height={9}
              alt="Wecazoo Logo"
              className="h-9 w-auto"
            />
            <Button
              onClick={onModalClose}
              className="rounded-full bg-white/10 hover:bg-white/20 p-2"
            >
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>

          {/* Game Container */}
          <div className="flex-1 w-full bg-gradient-to-b from-blue-900 to-black">
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

          {/* Footer Bar */}
          <div className="w-full bg-[#130D25] py-4">
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