import DirectChat from "@/components/Buttons/Chat/DirectChat";
import { Indiv_ProfileCard } from "@/components/Profile/Indiv_ProfileCard";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import useUserProfile from "@/Hooks/GetUserInfo/useUserProfile";

import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const {id: otherId }= useParams();
  const {displayName} =useUserProfile();
  const {user}= useAuthContext();

  console.log(user?.id);
  console.log(otherId);

  //creating same room id for the user
  const roomName = [user?.id, otherId].sort().join("_");

  if(!otherId || !displayName){
    return;
  }
  return (
    <div className="max-w-7xl mx-auto p-6 h-[calc(100vh-2rem)] flex gap-6">
      
        <Indiv_ProfileCard />
      {/* Chat Box - fills remaining space */}
      <main className="flex-1 bg-white rounded-xl shadow-md p-4 flex flex-col">
        <DirectChat roomName={roomName} currentUser={displayName} />
      </main>
    </div>
  );
};
