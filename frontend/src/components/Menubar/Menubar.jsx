import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useClerk,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

const Menubar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSignIn, openSignUp } = useClerk();
  const { user } = useUser();
  const { credit } = useContext(AppContext);

  const openRegister = () => {
    setMenuOpen(false);
    openSignUp({});
  };

  const openLogin = () => {
    setMenuOpen(false);
    openSignIn({});
  };

  return (
    <nav className="bg-white px-8 py-4 flex justify-between items-center">
      {/* left side: logo + text */}
      <Link className="flex items-center gap-3" to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="h-12 w-12 object-contain"
        />

        <div className="flex flex-col">
          <span className="text-[28px] font-bold leading-none text-slate-900">
            Bg<span className="text-indigo-600">Erase</span>
          </span>

          <span className="mt-1.5 text-[8px] font-medium tracking-[0.28em] text-gray-400">
            REMOVE BACKGROUNDS IN SECONDS
          </span>
        </div>
      </Link>

      {/* Right Side: Action button */}
      <div className="hidden md:flex items-center space-x-4">
        <a
          href="/#pricing"
          className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
        >
          Pricing
        </a>

        <SignedOut>
          <button
            className="text-gray-700 hover:text-blue-600 font-medium"
            onClick={openLogin}
          >
            Login
          </button>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-full transition"
            onClick={openRegister}
          >
            Sign up
          </button>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-500 cursor-pointer">
              <img src={assets.credits} alt="credits" height={24} width={24} />
              <p className="text-xs sm:text-sm font-medium text-gray-600 ">
                Credits: {credit}
              </p>
            </button>
            {/* add */}
            <p className="text-gray-600 max-sm:hidden">Hi, {user?.fullName}</p>
          </div>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile hamburger */}
      <div className="flex md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Moblie menu */}
      {menuOpen && (
        <div className="absolute top-16 right-8 bg-white shadow-md rounded-md flex flex-col items-center space-y-4 p-4 w-40">
          <a
            href="/#pricing"
            className="text-gray-700 hover:text-indigo-600 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </a>

          <SignedOut>
            <button
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={openLogin}
            >
              Login
            </button>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-full transition"
              onClick={openRegister}
            >
              Sign up
            </button>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-500 cursor-pointer">
                <img
                  src={assets.credits}
                  alt="credits"
                  height={24}
                  width={24}
                />
                <p className="text-xs sm:text-sm font-medium text-gray-600 ">
                  Credits: {credit}
                </p>
              </button>
            </div>
            <UserButton />
          </SignedIn>
        </div>
      )}
    </nav>
  );
};

export default Menubar;
