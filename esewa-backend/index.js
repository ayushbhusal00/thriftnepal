const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// eSewa test configuration
const esewaConfig = {
  merchantId: 'EPAYTEST',
  secret: '8gBm/:&EnhH.1/q',
  esewaPaymentUrl: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
};

// Generate HMAC SHA256 signature
const generateHmacSha256Hash = (data, secret) => {
  return crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64');
};

// Route to initiate payment
app.post('/initiate-payment', async (req, res) => {
  const { amount, productId } = req.body;
  const paymentData = {
    amount,
    failure_url: 'http://localhost:3000/failure',
    product_delivery_charge: '0',
    product_service_charge: '0',
    product_code: esewaConfig.merchantId,
    signed_field_names: 'total_amount,transaction_uuid,product_code',
    success_url: 'http://localhost:3000/success',
    tax_amount: '0',
    total_amount: amount,
    transaction_uuid: productId,
  };

  const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
  const signature = generateHmacSha256Hash(data, esewaConfig.secret);
  paymentData.signature = signature;

  res.json({ paymentData });
  console.log("Payment:", paymentData);
});

// Success and failure routes (for testing)
app.get('/success', (req, res) => {
  res.json({ message: 'Payment successful', data: req.query });
});

app.get('/failure', (req, res) => {
  res.json({ message: 'Payment failed', data: req.query });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});