// components/Modals/DepositPaymentDialog.tsx
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

    const handleIframeLoad = () => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;

      // Use Function constructor instead of eval
      const script = new Function(`
        const acceptButton = document.querySelector('.cookie-notice__accept');
        if (acceptButton) acceptButton.click();
        
        const gdprButton = document.querySelector('.gdpr-banner__button');
        if (gdprButton) gdprButton.click();
        
        // Remove cookie banner if exists
        const cookieBanner = document.querySelector('.cookie-notice');
        if (cookieBanner) cookieBanner.remove();
      `);

      try {
        // Execute script safely in iframe context
        iframe.contentWindow.postMessage({
          type: 'EXECUTE_SCRIPT',
          script: script.toString()
        }, '*');
      } catch (e) {
        console.error('Failed to execute script in iframe');
      }
    };

    // Set required cookies
    document.cookie = "nowpayments_cookie_consent=accepted; path=/; max-age=31536000; SameSite=None; Secure";
    document.cookie = "cookie_consent=accepted; path=/; max-age=31536000; SameSite=None; Secure";

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] min-h-[800px] p-0">
        <DialogTitle className='p-3 h-[30px]'>Deposit Balance</DialogTitle>
        <div className="w-full h-full">
          <iframe
            ref={iframeRef}
            src={paymentUrl}
            className="w-full h-[800px]"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            style={{ borderRadius: '8px' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositPaymentDialog;
