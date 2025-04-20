import heroImage from '../../assets/images/heroimage.png'
const HeroDemo = () => {
    return (
        <>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
                {/* Will Use a demo animation later, for now, a simple image */}
                <img
                    src={heroImage}
                    alt="Abstract illustration of a Swinburne student using study tools like flashcards and collaboration network"
                    className="w-full h-auto max-w-lg lg:max-w-xl rounded-lg shadow-lg object-cover" 
                />
            </div>
        </>
    );
}

export default HeroDemo;