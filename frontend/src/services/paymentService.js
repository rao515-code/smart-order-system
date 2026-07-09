const API_URL = "http://localhost:8080/api/payments";

export const processPayment = async (paymentRequest) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentRequest),
  });

  if (!response.ok) {
    throw new Error("Payment failed");
  }

  return response.json();
};