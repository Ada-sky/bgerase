import logo from "./logo.png";
import plant from "./plant.png";
import bag_before from "./bag_before.png";
import bag_after from "./bag_after.png";
import slide_icon from "./slide_icon.png";
import credits from "./credits.png";

export const assets = {
  logo,
  plant,
  bag_before,
  bag_after,
  slide_icon,
  credits,
};

export const steps = [
  {
    step: "Step 1",
    title: "Upload an image",
    description: "Select a PNG or JPG image from your device.",
  },
  {
    step: "Step 2",
    title: "Remove the background",
    description: "The image is processed automatically.",
  },
  {
    step: "Step 3",
    title: "Download the result",
    description:
      "Preview and download your image with a transparent background.",
  },
];
export const categories = ["people", "Products", "Animals", "Cars", "Graphics"];

export const plans = [
  {
    id: "Basic",
    name: "Basic Package",
    price: "9.99",
    credits: "10 credits",
    description: "Occasional use",
    popular: false,
  },
  {
    id: "Premium",
    name: "Premium Package",
    price: "19.99",
    credits: "25 credits",
    description: "Regular use",
    popular: true,
  },
  {
    id: "Ultimate",
    name: "Ultimate Package",
    price: "39.99",
    credits: "50 credits",
    description: "Frequent use",
    popular: false,
  },
];

export const FOOTER_CONSTANTS = [
  {
    url: "https://facebook.com",
    logo: "https://img.icons8.com/fluent/30/000000/facebook-new.png",
  },
  {
    url: "https://linkedin.com",
    logo: "https://img.icons8.com/fluent/30/000000/linkedin-2.png",
  },
  {
    url: "https://instagram.com",
    logo: "https://img.icons8.com/fluent/30/000000/instagram-new.png",
  },
  {
    url: "https://twitter.com",
    logo: "https://img.icons8.com/fluent/30/000000/twitter.png",
  },
];
