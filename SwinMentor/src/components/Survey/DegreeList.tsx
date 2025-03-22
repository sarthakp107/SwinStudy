import { useAvailableDegrees } from "@/Hooks/Database/useAvailableDegrees";
import { SearchableDropdown } from "./SearchableDropdown";

interface DegreeListProps {
    onDegreeChange: (value: string) => void;
    selectedDegree: string;
}

export const DegreeList: React.FC<DegreeListProps> = ({ onDegreeChange, selectedDegree }) => {
    const { degrees, loading, error } = useAvailableDegrees();

    if (loading) return <div>Loading degrees...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <SearchableDropdown
            options={degrees.map(degree => ({ id: degree.degree_id, name: degree.degree_name }))}
            value={selectedDegree}
            onChange={onDegreeChange}
            placeholder="Search Degree"
        />
    );
};
