import TitleAndButton from "./TitleAndButton";
import Navbar from "../Navbar";

const LandingHero = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(/landing-bg-v2.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center calc(60% + 10px)",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f9fafb",
      }}
    >
      <Navbar inline />
      <div className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-24">
        <div className="w-full max-w-3xl mx-auto text-center">
          <TitleAndButton />
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
