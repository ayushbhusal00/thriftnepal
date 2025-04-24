import React from "react";
import { WebView } from "react-native-webview";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

interface PaymentData {
  amount: string;
  failure_url: string;
  product_delivery_charge: string;
  product_service_charge: string;
  product_code: string;
  signed_field_names: string;
  success_url: string;
  tax_amount: string;
  total_amount: string;
  transaction_uuid: string;
  signature: string;
}

const PaymentWebView: React.FC = () => {
  const { paymentData: paymentDataString } = useLocalSearchParams<{
    paymentData: string;
  }>();
  const paymentData: PaymentData = JSON.parse(paymentDataString);

  const formHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      </head>
      <body>
        <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
          <input type="hidden" name="amount" value="${paymentData.amount}">
          <input type="hidden" name="tax_amount" value="${paymentData.tax_amount}">
          <input type="hidden" name="total_amount" value="${paymentData.total_amount}">
          <input type="hidden" name="transaction_uuid" value="${paymentData.transaction_uuid}">
          <input type="hidden" name="product_code" value="${paymentData.product_code}">
          <input type="hidden" name="product_service_charge" value="${paymentData.product_service_charge}">
          <input type="hidden" name="product_delivery_charge" value="${paymentData.product_delivery_charge}">
          <input type="hidden" name="success_url" value="${paymentData.success_url}">
          <input type="hidden" name="failure_url" value="${paymentData.failure_url}">
          <input type="hidden" name="signed_field_names" value="${paymentData.signed_field_names}">
          <input type="hidden" name="signature" value="${paymentData.signature}">
          <input type="submit" value="Pay with eSewa" style="display:none;">
        </form>
        <script>document.forms[0].submit();</script>
      </body>
    </html>
  `;

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;

    // Check if the URL matches the success_url
    if (url.includes("http://localhost:3000/success")) {
      // Extract query parameters from the URL
      const params = new URLSearchParams(url.split("?")[1]);
      const rawData = params.get("data"); // Get the base64-encoded data string

      let data = {};
      if (rawData) {
        try {
          // Decode the base64 string and parse it as JSON
          const decodedData = atob(rawData);
          data = JSON.parse(decodedData);
        } catch (error) {
          console.error("Error decoding eSewa response:", error);
        }
      }

      // Navigate to the success page with the decoded data
      router.replace({
        pathname: "/success",

        params: {
          message: "Payment successful",
          data: JSON.stringify(data),
        },
      });
    }

    // Check if the URL matches the failure_url
    if (url.includes("http://localhost:3000/failure")) {
      // Extract query parameters from the URL
      const params = new URLSearchParams(url.split("?")[1]);
      const rawData = params.get("data");

      let data = {};
      if (rawData) {
        try {
          const decodedData = atob(rawData);
          data = JSON.parse(decodedData);
        } catch (error) {
          console.error("Error decoding eSewa response:", error);
        }
      }

      // Navigate to the failure page with the decoded data
      router.replace({
        pathname: "/failure",
        params: {
          message: "Payment failed",
          data: JSON.stringify(data),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: formHtml }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size='large' color='#0000ff' />}
        scalesPageToFit={false}
        minimumZoomScale={1.0}
        maximumZoomScale={1.0}
        setSupportMultipleWindows={false}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default PaymentWebView;
