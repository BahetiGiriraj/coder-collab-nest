import { useState } from "react";
import Header from "@/components/layout/Header";
import ChatSidebar from "@/components/layout/ChatSidebar";
import AnnouncementsFeed from "@/components/announcements/AnnouncementsFeed";

const Announcements = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header />
      
      <main className={`container mx-auto px-4 py-8 transition-all duration-300 ${
        isChatOpen ? "mr-80" : "mr-12"
      }`}>
        <div className="max-w-6xl mx-auto">
          <AnnouncementsFeed />
        </div>
      </main>

      <ChatSidebar isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default Announcements;