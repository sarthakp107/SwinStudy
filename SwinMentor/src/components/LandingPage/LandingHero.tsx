import HeroDemo from "./HeroDemo"; 
import TitleAndButton from "./TitleAndButton";

const LandingHero = () => {
    return (
        <>
            {/* Parent Section Container */}
            <section className="relative bg-white py-20">
                {/* Shapes and Graphics Divs*/}
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 opacity-30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-black opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-red-500 opacity-30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>

                {/* Main Div */}
                <div className="container mx-auto relative ">
                    {/* Flex Container*/}
                    <div className="flex items-center lg:justify-between">
                        <TitleAndButton />{/* Text and Button (Left) */}
                        <HeroDemo /> {/* Image (Right) */}
                    </div> {/* Flex Container End*/}
                </div>
            </section>
        </>
    );
};

export default LandingHero;