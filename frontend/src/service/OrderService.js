import axios from "axios";
import toast from "react-hot-toast";

export const placeOrder = async ({ planId, getToken, backendUrl }) => {
  try {
    const token = await getToken();
    // Send only the plan ID; the backend determines the price and credits for the checkout session.
    const response = await axios.post(
      `${backendUrl}/orders?planId=${planId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const checkoutUrl = response.data.url || response.data.data?.url;

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      toast.error("Stripe checkout URL not found.");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data || error.message);
  }
};
