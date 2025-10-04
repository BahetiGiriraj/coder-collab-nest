import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatSidebar from "@/components/layout/ChatSidebar";
import PostsFeed from "@/components/posts/PostsFeed";
import heroImage from "@/assets/campus-hero.jpg";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const postsRef = useRef<HTMLDivElement>(null);

  const scrollToPosts = () => {
    postsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Community platform hero" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Discover. Connect. Grow.
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join 404Found where you can explore posts and engage with the community. 
              Connect with like-minded individuals and showcase your expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToPosts}
                className="bg-gradient-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:shadow-glow transition-all"
              >
                Explore Posts
              </button>
              <button 
                onClick={() => navigate('/signin')}
                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main 
        ref={postsRef}
        className={`container mx-auto px-4 py-8 transition-all duration-300 flex-1 ${
          isChatOpen ? "mr-80" : "mr-12"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <PostsFeed />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Chat Sidebar */}
      <ChatSidebar isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default Index;