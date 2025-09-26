import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Code2, 
  MessageSquare, 
  Users, 
  FolderGit2, 
  Trophy, 
  Megaphone,
  Bell,
  Search,
  Menu
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Posts", path: "/", icon: Code2 },
    { name: "Announcements", path: "/announcements", icon: Megaphone },
    { name: "Teams", path: "/teams", icon: Users },
    { name: "Repositories", path: "/repositories", icon: FolderGit2 },
    { name: "Achievements", path: "/achievements", icon: Trophy },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-primary">404Found</h1>
            </div>
          </div>

          {/* Desktop Navigation - Hidden until authenticated */}
          <nav className="hidden lg:flex space-x-1">
            {/* Only show home/posts link when not authenticated */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`
              }
            >
              <Code2 className="h-4 w-4" />
              <span>Explore</span>
            </NavLink>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <NavLink to="/login">Log In</NavLink>
              </Button>
              <Button variant="premium" asChild>
                <NavLink to="/signin">Sign Up</NavLink>
              </Button>
            </div>

            <Avatar className="h-8 w-8 sm:hidden">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Code2 className="h-4 w-4" />
                <span>Explore</span>
              </NavLink>
              <div className="px-4 py-2 space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Log In</NavLink>
                </Button>
                <Button variant="premium" className="w-full justify-start" asChild>
                  <NavLink to="/signin" onClick={() => setIsMenuOpen(false)}>Sign Up</NavLink>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;