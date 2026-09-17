import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [synced, setSynced] = useState(false);
  const { backendUrl, loadUserCredits } = useContext(AppContext);

  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || !user || synced) {
        return;
      }

      try {
        const token = await getToken();

        const userData = {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.photoUrl,
        };

        await axios.post(`${backendUrl}/users`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSynced(true); //prevent re-posting
        // The local user record must exist before the backend can return its credit balance.
        await loadUserCredits();
      } catch (error) {
        console.error("User sync failed", error);
        toast.error("User sync failed. Please try again.");
      }
    };
    saveUser();
  }, [
    isLoaded,
    isSignedIn,
    getToken,
    user,
    synced,
    backendUrl,
    loadUserCredits,
  ]);
  return null;
};

export default UserSyncHandler;
