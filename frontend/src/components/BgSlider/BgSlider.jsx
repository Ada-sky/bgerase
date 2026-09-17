import { useState } from "react";
import { assets } from "../../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  return (
    <section
      className="home-result home-container"
      aria-labelledby="comparison-title"
    >
      <div className="home-result-panel">
        <div className="home-result-copy">
          <span className="home-eyebrow">Background removal</span>
          <h2 id="comparison-title">See the difference.</h2>
          <p>High-quality background removal for your images.</p>
          <p className="home-comparison-hint">Move the slider to compare.</p>
        </div>
        <div className="home-comparison">
          <img
            src={assets.bag_before}
            alt="Original portrait with background"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          />
          <img
            src={assets.bag_after}
            alt="Portrait with background removed"
            className="home-comparison-after"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          />
          <span className="home-image-label home-label-original">Original</span>
          <span className="home-image-label home-label-result">
            Background removed
          </span>
          <div className="home-divider" style={{ left: `${sliderPosition}%` }}>
            <span>↔</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            aria-label="Compare original and background-removed image"
            aria-valuetext={`${sliderPosition}% original image visible`}
          />
        </div>
      </div>
    </section>
  );
};
export default BgSlider;
