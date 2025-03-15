import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa"; // Importing the user icon
import { supabase } from "../../supabase-client";
import { useAuth } from "@/context/AuthContext";


interface Group {
  unitID: string;
  unitName: string;
  members: { profileID: string; displayName: string }[];
}

const YourGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  useEffect(() => {
    const fetchUnitGroups = async () => {
      setLoading(true);

      // Fetch data from user_units, profile, and units tables with proper joins
      const { data, error } = await supabase
        .from("user_units")
        .select(`
          unit_id,
          profile_id,
          profile:profile_id(display_name),  
          units:unit_id(unit_name)  
        `)
        .eq("profile_id", user?.id);  // Only fetch data where profile_id matches current user's profile_id
        ;

      if (error) {
        console.error("Error fetching unit groups:", error);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        console.log("No data found");
        setLoading(false);
        return;
      }

      // Group users by unit_id, including their names
      const groupedUsers: Record<string, { unitName: string; members: { profileID: string; displayName: string }[] }> = {};

      // Iterate through the data and group by unit_id
      data.forEach((item: any) => {
        const { unit_id, profile_id, profile, units } = item; // Explicitly extracting the fields

        // Check if profile and unit are populated, otherwise skip
        if (!profile || !units) return;

        if (!groupedUsers[unit_id]) {
          groupedUsers[unit_id] = {
            unitName: units.unit_name,
            members: [],
          };
        }

        // Push user with display_name to members array
        groupedUsers[unit_id].members.push({
          profileID: profile_id,
          displayName: profile.display_name,
        });
      });

      // Convert grouped data into an array of groups
      const groupsArray: Group[] = Object.entries(groupedUsers).map(
        ([unitID, { unitName, members }]) => ({
          unitID,
          unitName,
          members,
        })
      );
      setGroups(groupsArray);
      setLoading(false);
    };

    fetchUnitGroups();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Groups</h2>
      {loading ? (
        <p>Loading groups...</p>
      ) : groups.length === 0 ? (
        <p>No groups found.</p>
      ) : (
        groups.map((group) => (
          <div key={group.unitID} className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <FaRegUserCircle className="text-2xl mr-2" />
              <h3 className="font-semibold text-lg">{group.unitName}</h3>
            </div>
            <div className="text-sm mb-2">
              <strong>Members:</strong> {group.members.length}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.members.map((member, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 text-xs py-1 px-2 rounded-full"
                >
                  {member.displayName}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YourGroups;
