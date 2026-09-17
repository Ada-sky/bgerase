import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const PaymentSuccess = () => {
  const { getToken } = useAuth();
  const { backendUrl, loadUserCredits } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = new URLSearchParams(window.location.search).get(
          "session_id",
        );

        if (!sessionId) {
          toast.error("Missing payment session.");
          navigate("/");
          return;
        }

        const token = await getToken();

        // A checkout redirect is not proof of payment; the backend verifies the session with Stripe.
        const response = await axios.post(
          `${backendUrl}/orders/verify`,
          { sessionId },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (response.data.success) {
          // Reload the persisted balance after the backend confirms payment and applies the top-up.
          await loadUserCredits();
          toast.success("Credits added successfully!");
        } else {
          toast.error(response.data.message || "Payment verification failed.");
        }

        navigate("/");
      } catch (error) {
        console.error(error);
        toast.error("Payment verification failed.");
        navigate("/");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      Verifying payment...
    </div>
  );
};

export default PaymentSuccess;
