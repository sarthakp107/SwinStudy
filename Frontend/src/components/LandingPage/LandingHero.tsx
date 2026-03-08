import TitleAndButton from "./TitleAndButton";
import Navbar from "../Navbar";

const LandingHero = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 100%), url(/landing-bg-v2.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
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
