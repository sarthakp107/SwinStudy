import Spinner from "@/components/Loading/Spinner";
import { useGetUnitMembers } from "@/Hooks/useGetUnitMembers";
import { FaUserFriends } from "react-icons/fa";
import { useParams } from "react-router-dom";


export const UnitBuddies = () => {
    const { unitName } = useParams<{ unitName?: string }>();
    const safeUnitName = unitName ?? ""; // Ensure it's always a string
    const { users, loading, error } = useGetUnitMembers(safeUnitName);

    if (loading) return <div className="mt-16"><Spinner/></div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="max-w-xl mx-auto p-10 bg-white rounded-3xl shadow-2xl border border-gray-300 mt-12 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <FaUserFriends className="text-red-500 text-4xl" /> Unit Buddies for {safeUnitName}
        </h2>
        <ul className="divide-y divide-gray-300 rounded-lg overflow-hidden shadow-lg">
            {users.length > 0 ? (
                users.map((user) => (
                    <li key={user.user_id} className="py-5 px-8 flex items-center gap-4 hover:bg-indigo-100 transition-all rounded-lg">
                        <div className="w-12 h-12 flex items-center justify-center bg-red-500 text-white text-xl font-bold rounded-full shadow-md">
                            {user.display_name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-800 font-semibold text-xl">{user.display_name}</span>
                    </li>
                ))
            ) : (
                <li className="text-gray-600 italic text-center py-8 text-xl">No buddies found.</li>
            )}
        </ul>
    </div>
    );
};
