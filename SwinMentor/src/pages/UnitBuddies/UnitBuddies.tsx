import { useGetUnitMembers } from "@/Hooks/useGetUnitMembers";
import { useParams } from "react-router-dom";

export const UnitBuddies = () => {
    const { unitName } = useParams<{ unitName?: string }>();
    const safeUnitName = unitName ?? ""; // Ensure it's always a string
    const { users, loading, error } = useGetUnitMembers(safeUnitName);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div>
            <h2 className="text-lg font-semibold">Unit Buddies for {safeUnitName}</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.user_id}>
                            {user.display_name}
                        </li>
                    ))
                ) : (
                    <li>No buddies found.</li>
                )}
            </ul>
        </div>
    );
};
