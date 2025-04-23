import React from "react";
import { WebView } from "react-native-webview";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

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

const PaymentWebView = () => {
  const { paymentData: paymentDataString } = useLocalSearchParams<{
    paymentData: string;
  }>();
  const paymentData: PaymentData = JSON.parse(paymentDataString);

  const formHtml = `
    <!DOCTYPE html>
    <html>
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

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: formHtml }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size='large' color='#0000ff' />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default PaymentWebView;
