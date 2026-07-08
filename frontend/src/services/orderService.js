const API_URL = "http://localhost:8080/api/orders";

export const getOrders = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load orders");
  }

  return response.json();
};

export const createOrder = async (orderRequest) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderRequest),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
};