import heroImage from '../../assets/images/heroimage.png'
import { Link } from 'react-router-dom';
const HeroDemo = () => {
    return (
        <>
            <div className="lg:w-1/2 flex flex-col justify-center lg:justify-end space-y-4">
                {/* Will Use a demo animation later, for now, a simple image */}
                <img
                    src={heroImage}
                    alt="Abstract illustration of a Swinburne student using study tools like flashcards and collaboration network"
                    className="w-full h-auto max-w-lg lg:max-w-xl rounded-lg shadow-lg object-cover" 
                />
                <div className='flex justify-center mr-40'>
                <Link to="/upload" className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg">
                            Create Flashcards
                        </Link>
                       

                </div>
            </div>
            
        </>
    );
}

export default HeroDemo;