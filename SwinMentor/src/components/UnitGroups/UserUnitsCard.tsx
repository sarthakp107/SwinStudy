import { useUserUnits } from "@/Hooks/GetUserInfo/useUserUnits";
import { SkeletonUserGroups } from "../Loading/SkeletonUserGroups";
import { Link } from "react-router-dom";
import { UnitBuddiesButton } from "../Buttons/UnitButtons/UnitBuddiesButton";

// import UnitActions from "./UnitActions";



export const UserUnitsCard: React.FC = () => {
    const { units, loading, error } = useUserUnits();

    if (loading) {
        return <SkeletonUserGroups />;  // Show a spinner while loading
    }

    if (error) {
        return <div className="error">Error: {error}</div>;  // Show an error message if something goes wrong
    }

    return (
        <div className="p-6">

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {units.length > 0 ? (
                    units.map((unit, index) => (
                        <Link key={index} to={`/dashboard/${unit}`}>
                            <li  
                                className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <i className="fas fa-book text-4xl text-green-500"></i>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xl font-medium">{unit}</h4>
                                </div>
                            <UnitBuddiesButton/>
                            </li>
                        </Link>
                    ))
                ) : (
                    <li className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md col-span-full text-center">
                        Seems like you haven't completed the survey yet!😄
                    </li>
                )}
            </ul>
        </div>


    );
};