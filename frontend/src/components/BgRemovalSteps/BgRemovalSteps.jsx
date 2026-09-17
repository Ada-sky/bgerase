import { ImagePlus, WandSparkles, Download } from "lucide-react";
import { steps } from "../../assets/assets";

const icons = [ImagePlus, WandSparkles, Download];
const BgRemovalSteps = () => (
  <section className="home-steps" aria-labelledby="steps-title">
    <div className="home-container">
      <div className="home-section-heading">
        <h2 id="steps-title">How it works</h2>
        <p>Remove backgrounds in three simple steps.</p>
      </div>
      <div className="home-step-grid">
        {steps.map((item, index) => {
          const Icon = icons[index];
          return (
            <article className="home-step" key={item.step}>
              <div className="home-step-marker">
                <Icon size={25} aria-hidden="true" />
                <span>0{index + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
export default BgRemovalSteps;
