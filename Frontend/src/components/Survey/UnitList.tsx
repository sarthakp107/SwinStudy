import { useAvailableUnits } from "@/Hooks/Database/useAvailableUnits";



export const UnitList = () => {
    const { units, loading, error } = useAvailableUnits();

    if (loading) return <div>Loading units...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <select>
                <option value="">Select a Units</option>
                {units.map(unit => (
                    <option key={unit.unit_id} value={unit.unit_id}>
                        {unit.unit_name}
                    </option>
                ))}
            </select>
        </div>
    );
}