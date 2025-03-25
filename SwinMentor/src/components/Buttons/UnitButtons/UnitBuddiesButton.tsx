import { useGetUnitMembers } from "@/Hooks/useGetUnitMembers";

interface UnitBuddiesButtonProps {
  unit: string;
}

export const UnitBuddiesButton: React.FC<UnitBuddiesButtonProps> = ({ unit }) => {
    const { users, loading, error } = useGetUnitMembers(unit);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h3>Unit Buddies for {unit}</h3>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.user_id}>
                            <strong>{user.display_name}</strong>
                        </li>
                    ))
                ) : (
                    <li>No buddies found.</li>
                )}
            </ul>
        </div>
    );
};
