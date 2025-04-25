import { router } from "expo-router";

export const handleInitiatePayment = ({ amount }: { amount: string }) => {
  //   const amount = "1000"; // Example amount; this could come from your app's state or UI
  router.push({
    pathname: "/paymentConfirmation",
    params: { amount },
  });
};
