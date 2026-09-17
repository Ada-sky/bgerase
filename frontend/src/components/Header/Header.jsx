import { useContext } from "react";
import { Upload } from "lucide-react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Header = () => {
  const { removeBg } = useContext(AppContext);
  return (
    <section className="home-hero home-container" aria-labelledby="hero-title">
      <img className="home-hero-image" src={assets.plant} alt="plant" />
      <div className="home-hero-copy">
        <h1 id="hero-title">
          The fastest <span>background eraser.</span>
        </h1>
        <p>
          Remove image backgrounds in seconds. Upload an image, preview the
          result and download it with a transparent background.
        </p>
        <div className="home-upload">
          <input
            className="home-file-input"
            type="file"
            accept="image/*"
            id="upload1"
            onChange={(e) => removeBg(e.target.files[0])}
          />
          <label htmlFor="upload1" className="home-button">
            <Upload size={20} aria-hidden="true" />
            Upload your image
          </label>
        </div>
        <p className="home-upload-hint">Select an image from your device.</p>
      </div>
    </section>
  );
};
export default Header;
