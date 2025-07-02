import DirectChat from "@/components/Buttons/Chat/DirectChat";
import { Indiv_ProfileCard } from "@/components/Profile/Indiv_ProfileCard";

export const ProfilePage = () => {

  return (
    <div className="max-w-7xl mx-auto p-6 h-[calc(100vh-2rem)] flex gap-6">
      
        <Indiv_ProfileCard />
      {/* Chat Box - fills remaining space */}
      <main className="flex-1 bg-white rounded-xl shadow-md p-4 flex flex-col">
        <DirectChat />
      </main>
    </div>
  );
};
