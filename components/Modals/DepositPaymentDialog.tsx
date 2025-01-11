import { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface DepositPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentUrl: string;
}

const DepositPaymentDialog = ({ isOpen, onClose, paymentUrl }: DepositPaymentDialogProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Ensure URL uses HTTPS
    if (iframeRef.current) {
      const secureUrl = paymentUrl.replace('http://', 'https://');
      iframeRef.current.src = secureUrl;
    }
  }, [isOpen, paymentUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] min-h-[800px] p-0">
        <DialogTitle className="p-3 h-[30px]">Deposit Balance</DialogTitle>
        <div className="w-full h-full">
          <iframe
            ref={iframeRef}
            src={paymentUrl.replace('http://', 'https://')}
            className="w-full h-[800px]"
            style={{ borderRadius: '8px' }}
            // Add security attributes
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer"
            loading="lazy"
            // Remove allow="*" as it's too permissive
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositPaymentDialog;
