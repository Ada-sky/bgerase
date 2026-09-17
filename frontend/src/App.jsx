import React from "react";
import Menubar from "./components/Menubar/Menubar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserSyncHandler from "./components/UserSyncHandler/UserSyncHandler";
import Result from "./pages/Result";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import PaymentSuccess from "./pages/PaymentSuccess";

const App = () => {
  return (
    <div>
      <UserSyncHandler />
      <Menubar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/pricing' element={<BuyCredits />} /> */}
        <Route
          path="/result"
          element={
            <>
              <SignedIn>
                <Result />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
