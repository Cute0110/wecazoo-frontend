import axiosInstance from "@/lib/action";
import { useAuth } from "@/lib/authContext";
import { dot, eot } from "@/lib/cryptoUtils";
import { PayPalButtons, PayPalScriptProvider, FUNDING } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const PayPalButton = ({ depositAmount }: any) => {
  const { authData } = useAuth();
  const [paymentId, setPaymentId] = useState(null);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
  const [api, contextHolder] = notification.useNotification();
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setAmount(depositAmount);
  }, [depositAmount]);

  const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
    api[type]({
      message: title,
      description: content,
      duration: 2,
      placement,
    });
  };

  const paypalCreateOrder = async () => {
    if (Number(amount) < 5 || amount == "") {
      openNotification("warning", "Warning", "Minimum value is 5$!", "topRight");
    } else {
      try {
        let response = await axiosInstance.post('api/create_order', eot({
          user_id: authData.id,
          order_price: amount,
          application_context: {
            experience_context: {
              no_shipping: 1, // ✅ Another way to disable shipping
            },
            shipping_preference: "NO_SHIPPING" // 🚀 Removes address input
          }
        }))
        const data = dot(response.data);
        return data.orderId;
      } catch (err) {
        openNotification("error", "Error", "Deposit Failed!", "topRight");
        return null
      }
    }
  };

  const paypalCaptureOrder = async (orderID: any) => {
    try {
      let response = await axiosInstance.post('api/capture_order', eot({
        orderID
      }))
      const data = dot(response.data);
      if (data.success) {
        openNotification("success", "Success", "Deposit Success!", "topRight");
      } else {
        openNotification("error", "Error", "Deposit Failed!", "topRight");
      }
    } catch (err) {
      openNotification("error", "Error", "Deposit Failed!", "topRight");
    }
  };

  return (
    <>
      {contextHolder}
      <PayPalScriptProvider
        options={{
          clientId,
          currency: 'USD',
          intent: 'capture',
          'disable-funding': 'venmo'
        }}
      >
        <div className="bg-white rounded-md">
          <PayPalButtons
            createOrder={async (data, actions) => {
              let order_id = await paypalCreateOrder()
              return order_id + ''
            }}
            onApprove={async (data, actions) => {
              await paypalCaptureOrder(data.orderID)
            }}
            fundingSource={FUNDING.CARD} // Debit or Credit Card
          />
        </div >
      </PayPalScriptProvider>
    </>
  );
};

export default PayPalButton;
