import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useUserDegree } from "@/Hooks/GetUserInfo/useUserDegree";
import useUserProfile from "@/Hooks/GetUserInfo/useUserProfile";
import { useUserUnits } from "@/Hooks/GetUserInfo/useUserUnits";

export const ProfilePage = () => {
    const { displayName } = useUserProfile();
    const { user} = useAuthContext();
    const { units } = useUserUnits();
    const {degree} = useUserDegree();
    console.log(user?.id);
    console.log(degree);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8">
      
        <div className="flex-1">
          {/* <h2 className="text-2xl font-semibold text-gray-800">{dummyProfile.name}</h2> */}
          <h2 className="text-2xl font-semibold text-gray-800">{displayName}</h2>
          <p className="text-gray-500">{user?.user_metadata.email}</p>


          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 uppercase">Degree</h3>
            <p className="text-red-600 font-semibold">{degree}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-600 uppercase mb-2">Current Units</h3>
            <div className="flex flex-wrap gap-2">
              {units.map((interest, idx) => (
                <span
                  key={idx}
                  className="bg-red-100 text-red-700 px-3 py-1 text-sm rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
