import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [credit, setCredit] = useState(false);
  const { getToken } = useAuth();
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const loadUserCredits = async () => {
    try {
      // The backend identifies the user from the Clerk token rather than a client-supplied user ID.
      const token = await getToken();
      const response = await axios.get(`${backendUrl}/users/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setCredit(response.data.data.credits);
      } else {
        toast.error("Error loading credits.");
      }
    } catch {
      toast.error("Error loading credits.");
    }
  };

  const removeBg = async (selectedImage) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }
      // Show the original immediately; the result page displays a spinner until processing returns.
      setImage(selectedImage);
      setResultImage(false);
      navigate("/result");

      const token = await getToken();
      const formData = new FormData();
      selectedImage && formData.append("file", selectedImage);
      const { data: base64Image } = await axios.post(
        `${backendUrl}/images/remove-background`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // The API returns raw Base64; preview and download require a complete image data URL.
      setResultImage(`data:image/png;base64,${base64Image}`);
      // Mirror the backend deduction in the UI; the persisted balance is updated server-side.
      setCredit((prev) => prev - 1);
    } catch (error) {
      console.error(error);
      toast.error("Error while removing background image.");
    }
  };

  const contextValue = {
    backendUrl,
    credit,
    setCredit,
    loadUserCredits,
    image,
    setImage,
    resultImage,
    setResultImage,
    removeBg,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
