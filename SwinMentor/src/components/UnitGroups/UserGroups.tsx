import { useUserUnits } from "@/Hooks/GetUserInfo/useUserUnits";
import { SkeletonUserGroups } from "../Loading/SkeletonUserGroups";



export const UserGroups: React.FC = () => {
    const { units, loading, error } = useUserUnits();

    if (loading) {
        return <SkeletonUserGroups />;  // Show a spinner while loading
    }

    if (error) {
        return <div>Error: {error}</div>;  // Show an error message if something goes wrong
    }

    return (
        <div>

            <ul>
                {units.length > 0 ? (
                    units.map((unit) => (
                        <li key={unit.id}>{unit.name}</li>
                    ))
                ) : (
                    <li className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md">
                        Seems like you haven't completed the survey yet!😄
                    </li>
                )}
            </ul>
        </div>
    );
};