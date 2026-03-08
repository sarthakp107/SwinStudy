import heroimage from "../../assets/images/heroImage.png";
import { Link } from "react-router-dom";

const HeroPhoto = () => {
  return (
    <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-end space-y-6">
      <img
        src={heroimage}
        alt="Abstract illustration of a Swinburne student using study tools like flashcards and collaboration network"
        className="w-full h-auto max-w-md lg:max-w-lg rounded-xl shadow-2xl border border-white/10 object-cover"
      />
      <Link
        to="/flashcardupload"
        className="bg-white/90 text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white transition-colors shadow-xl"
      >
        Create Flashcards
      </Link>
    </div>
  );
};

export default HeroPhoto;