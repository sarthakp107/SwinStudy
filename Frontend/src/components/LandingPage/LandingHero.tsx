import TitleAndButton from "./TitleAndButton";

/** Hero background: add your PNG to public/hero-bg.png to show behind the text. */
const HERO_BG_IMAGE = "/landing-bg-v2.png";

const LandingHero = () => {
  return (
    <section
      className="relative min-h-screen -mt-16 pt-24 flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.25) 100%), url(${HERO_BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f9fafb",
      }}
    >
      <div className="w-full max-w-3xl mx-auto px-8 sm:px-12 lg:px-24 relative z-10 text-center">
        <TitleAndButton />
      </div>
    </section>
  );
};

export default LandingHero;
