import { useNavigate } from "react-router-dom";
import { useOUserDegree } from "@/Hooks/GetUserInfo/GetOtherUserInfo/useOUserDegree";

interface User {
  user_id: string;
  display_name: string;
}

interface UnitUserCardsProps {
  users: User[];
}

const UnitUserCards = ({ users }: UnitUserCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.length > 0 ? (
        users.map((user) => <SingleUserCard key={user.user_id} user={user} />)
      ) : (
        <div className="text-gray-600 italic text-center py-8 text-xl col-span-3">
          No buddies found.
        </div>
      )}
    </div>
  );
};

export default UnitUserCards;

const SingleUserCard = ({ user }: { user: User }) => {
  const { degree, loading } = useOUserDegree(user.user_id);
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 flex flex-col gap-2 hover:shadow-xl transition-all cursor-pointer"
      onClick={() => navigate(`/profile/${user.user_id}`)}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center bg-red-500 text-white text-2xl font-bold rounded-full shadow">
          {user.display_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-800">{user.display_name}</p>
          <p className="text-gray-500 text-sm">
            {loading ? "Loading degree..." : degree ?? "No degree"}
          </p>
        </div>
      </div>
      <span className="text-indigo-500 font-medium mt-4">View Profile →</span>
    </div>
  );
};
