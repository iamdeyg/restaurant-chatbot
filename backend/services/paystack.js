import axios from "axios";

export const initializePayment = async (totalAmount) => {
  try {
    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: "customer@example.com",
        amount: totalAmount * 100, // Paystack expects amount in kobo
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return paystackResponse.data.data.authorization_url;
  } catch (error) {
    throw new Error("Payment initialization failed");
  }
};
