import React, { useContext } from "react";
import { plans } from "../../assets/assets";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import { placeOrder } from "../../service/OrderService";

const Pricing = () => {
  const { isSignedIn, getToken } = useAuth();
  const { openSignIn } = useClerk();
  const { backendUrl } = useContext(AppContext);

  const handleOrder = (planId) => {
    if (!isSignedIn) {
      return openSignIn();
    }

    placeOrder({
      planId,
      getToken,
      backendUrl,
    });
  };

  return (
    <section
      id="pricing"
      className="home-pricing home-container"
      aria-labelledby="pricing-title"
    >
      <div className="home-section-heading">
        <h2 id="pricing-title">Choose your package</h2>
        <p>Get more credits and process more images.</p>
      </div>
      <div className="home-price-grid">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`home-price-card ${plan.popular ? "home-price-featured" : ""}`}
          >
            {plan.popular && (
              <span className="home-package-badge">Most Popular</span>
            )}
            <h3>{plan.name}</h3>
            <p className="home-price">€{plan.price}</p>
            <p className="home-credits">{plan.credits}</p>
            <p className="home-plan-description">{plan.description}</p>
            <button
              className={`home-button ${plan.popular ? "" : "home-button-outline"}`}
              onClick={() => handleOrder(plan.id)}
            >
              Choose plan
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};
export default Pricing;
