import UnitUserCards from "@/components/Cards/UnitUserCards";
import Spinner from "@/components/Loading/Spinner";
import { useGetUnitMembers } from "@/Hooks/useGetUnitMembers";
import { FaUserFriends } from "react-icons/fa";
import { useParams } from "react-router-dom";
// import useUserProfile from '@/Hooks/GetUserInfo/useUserProfile';

export const UnitBuddies = () => {
  const { unitName } = useParams<{ unitName?: string }>();
  const safeUnitName = unitName ?? "";
  const { users, loading, error } = useGetUnitMembers(safeUnitName);

  if (loading) return <div className="mt-16"><Spinner /></div>;
  if (error) return <div className="error">Error: {error}</div>;

 return (
   <div className="p-6 md:p-10 max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <FaUserFriends className="text-red-500 text-5xl" />
        Buddies in {safeUnitName}
      </h2>
      <UnitUserCards users={users} />
    </div>
  );
};

