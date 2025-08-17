// import IndividualChatButton from "@/components/Buttons/Chat/IndividualChatButton";
import { useOUserDegree } from "@/Hooks/GetUserInfo/GetOtherUserInfo/useOUserDegree";
import useOUserProfile from "@/Hooks/GetUserInfo/GetOtherUserInfo/useOUserProfile";
import { useOUserUnits } from "@/Hooks/GetUserInfo/GetOtherUserInfo/useOUserUnit";


export const Indiv_ProfileCard = () => {
  const { displayName } = useOUserProfile();
  const { units } = useOUserUnits();
  const { degree } = useOUserDegree();

  return (
    <aside className="w-72 bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{displayName}</h2>
      {/* <IndividualChatButton recipientId={id} /> */}
      <div className="mt-6 w-full">
        <h3 className="text-xs font-semibold text-gray-500 uppercase">Degree</h3>
        <p className="text-red-600 font-semibold">{degree || "N/A"}</p>
      </div>
      <div className="mt-6 w-full">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Current Units</h3>
        <div className="flex flex-wrap gap-1">
          {units.length > 0 ? (
            units.map((unit, i) => (
              <span
                key={i}
                className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs"
              >
                {unit}
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-xs">No units</p>
          )}
        </div>
      </div>

      <h3>FLASHCARDS COUNT</h3>
    </aside>
  );
};
