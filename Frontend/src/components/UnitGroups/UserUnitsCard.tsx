import { useUserUnits } from "@/Hooks/GetUserInfo/useUserUnits";
import { SkeletonUserGroups } from "../Loading/SkeletonUserGroups";
import { Link } from "react-router-dom";
import { UnitBuddiesButton } from "../Buttons/UnitButtons/UnitBuddiesButton";
// import UnitActions from "./UnitActions";

export const UserUnitsCard: React.FC = () => {
    const { unitNames, loading, error } = useUserUnits();

    if (loading) {
        return <SkeletonUserGroups />;  // Show a spinner while loading
    }

    if (error) {
        return <div className="error">Error: {error}</div>;  // Show an error message if something goes wrong
    }

    return (
        <div className="p-2 sm:p-4 lg:p-0">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {unitNames.length > 0 ? (
                    unitNames.map((unitName, index) => (
                        <Link key={index} to={`/dashboard/${encodeURIComponent(unitName)}`}>
                            <li  
                                className="group relative overflow-hidden rounded-2xl border border-red-100 bg-white/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-red-200"
                            >
                                {/* Accent bar */}
                                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-red-500 via-red-400 to-red-600" />

                                <div className="relative flex flex-col h-full p-5 lg:p-6">
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 group-hover:bg-red-100">
                                                <i className="fas fa-book text-lg" />
                                            </div>
                                            <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                                                {unitName}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between gap-3">
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Tap to open your buddies space for this unit.
                                        </p>
                                        <div className="shrink-0">
                                            <UnitBuddiesButton/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))
                ) : (
                    <li className="col-span-full">
                        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-red-200 bg-red-50/60 px-4 py-6 text-center">
                            <p className="text-sm sm:text-base font-medium text-red-700">
                                It looks like we don&apos;t have your units yet.
                            </p>
                            <p className="text-xs sm:text-sm text-red-600">
                                Complete the short setup survey so we can load your units and buddies.
                            </p>
                        </div>
                    </li>
                )}
            </ul>
        </div>


    );
};