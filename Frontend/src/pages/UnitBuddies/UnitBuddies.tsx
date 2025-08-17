import Spinner from "@/components/Loading/Spinner";
import { useGetUnitMembers } from "@/Hooks/useGetUnitMembers";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { GroupChat } from "@/components/Chat/GroupChat/GroupChat";
import useUserProfile from '@/Hooks/GetUserInfo/useUserProfile';

export const UnitBuddies = () => {
  const { unitName } = useParams<{ unitName?: string }>();
  const safeUnitName = unitName ?? "";
  const { users, loading, error } = useGetUnitMembers(safeUnitName);
  const { displayName } = useUserProfile();
  const navigate = useNavigate();

  if (loading) return <div className="mt-16"><Spinner /></div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 md:p-10 max-w-screen-xl mx-auto">
      {/* Left: Unit Buddies */}
      <div className="w-full md:w-1/3 bg-white border border-gray-300 shadow-xl rounded-3xl p-6 h-[600px] overflow-y-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
          <FaUserFriends className="text-red-500 text-4xl" />
          Buddies: {safeUnitName}
        </h2>

        <ul className="divide-y divide-gray-300" >
          {users.length > 0 ? (
            users.map((user) => (
              <li
                key={user.user_id}
                className="py-4 px-3 flex items-center gap-4 hover:bg-indigo-100 rounded-xl transition-all"
                onClick={() => navigate(`/profile/${user.user_id}`)}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-red-500 text-white font-bold rounded-full shadow" >
                  {user.display_name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-800 font-medium text-lg">{user.display_name}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-600 italic text-center py-8 text-xl">No buddies found.</li>
          )}
        </ul>
      </div>

      {/* Right: Group Chat */}
      <div className="w-full md:w-2/3">
        <GroupChat
          unitName={safeUnitName}
          currentUser={displayName ?? "SwinStudyUser"}
        />
      </div>
    </div>
  );
};
