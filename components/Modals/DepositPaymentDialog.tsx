import { useEffect, useRef, useState } from 'react';
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
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;

    // Ensure URL is HTTPS
    const secureUrl = new URL(paymentUrl);
    if (secureUrl.protocol !== 'https:') {
      secureUrl.protocol = 'https:';
    }

    const handleIframeLoad = () => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;

      // Message handler for iframe communication
      const handleMessage = (event: MessageEvent) => {
        // Verify origin
        if (!event.origin.includes('nowpayments.io')) return;

        if (event.data.type === 'PAYMENT_ERROR') {
          setError('Payment loading failed. Please try again.');
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    };

    // Set secure cookies
    document.cookie = "nowpayments_cookie_consent=accepted; path=/; max-age=31536000; SameSite=None; Secure";
    document.cookie = "cookie_consent=accepted; path=/; max-age=31536000; SameSite=None; Secure";

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);

      // Handle load errors
      iframe.onerror = () => {
        setError('Failed to load payment interface. Please ensure you have a secure connection.');
      };
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [isOpen, paymentUrl]);

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[800px] min-h-[800px] p-0">
        <DialogTitle className="p-3 h-[30px] flex items-center justify-between">
          Deposit Balance
        </DialogTitle>

        <div className="w-full h-full relative">
          <iframe
            ref={iframeRef}
            src={paymentUrl}
            className="w-full h-[800px]"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            style={{ borderRadius: '8px' }}
            // Add security headers
            security="restricted"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositPaymentDialog;