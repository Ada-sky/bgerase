import Header from "../../components/Header/Header";
import BgRemovalSteps from "../../components/BgRemovalSteps/BgRemovalSteps";
import BgSlider from "../../components/BgSlider/BgSlider";
import Pricing from "../../components/Pricing/Pricing";
import "./Home.css";

const Home = () => (
  <main className="homepage">
    <Header />
    <BgRemovalSteps />
    <BgSlider />
    <Pricing />
  </main>
);
export default Home;
