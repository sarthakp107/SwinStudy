import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import useUserProfile from "@/Hooks/GetUserInfo/useUserProfile";
import { Link } from "react-router-dom";

const TitleAndButton = () => {
  const { user } = useAuthContext();
  const { displayName } = useUserProfile();

  return (
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600 mb-1">
        Built for Swinburne students
      </p>

      {user ? (
        <h1 className="text-4xl lg:text-6xl font-semibold text-slate-900 leading-tight mb-6">
          Welcome <span className="text-red-600">{displayName || "Swinburne Student"}</span>
          <br />
          Let&apos;s boost your <span className="text-red-600">studies</span>.
        </h1>
      ) : (
        <h1 className="text-4xl lg:text-6xl font-semibold text-slate-900 leading-tight mb-6">
          Unlock Your Full Potential as a <span className="text-red-600">Swinburne Student</span>
        </h1>
      )}

      <p className="text-lg lg:text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
        Upload your notes, find unit buddies, and get smart flashcards in seconds — all tailored to
        Swinburne units.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {user ? (
          <Link
            to="/dashboard"
            className="bg-red-600 text-white px-10 py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/signup"
            className="bg-red-600 text-white px-10 py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            Get Started for Free
          </Link>
        )}
        <Link
          to="/features"
          className="border-2 border-red-600 text-red-600 px-10 py-3 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default TitleAndButton;
