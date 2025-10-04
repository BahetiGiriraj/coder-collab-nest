import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Code2, 
  MessageSquare, 
  Users, 
  FolderGit2, 
  Trophy, 
  Megaphone,
  Bell,
  Search,
  Menu,
  LogOut
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { name: "Posts", path: "/", icon: Code2 },
    { name: "Announcements", path: "/announcements", icon: Megaphone },
    { name: "Teams", path: "/teams", icon: Users },
    { name: "Repositories", path: "/repositories", icon: FolderGit2 },
    { name: "Achievements", path: "/achievements", icon: Trophy },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {isAuthenticated ? (
              // Show all navigation items when authenticated
              navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))
            ) : (
              // Only show Explore when not authenticated
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
            )}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // Show user actions when authenticated
              <>
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Avatar className="h-8 w-8 hidden sm:block">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="hidden sm:flex"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              // Show auth buttons when not authenticated
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <NavLink to="/login">Log In</NavLink>
                </Button>
                <Button variant="premium" asChild>
                  <NavLink to="/signin">Sign Up</NavLink>
                </Button>
              </div>
            )}

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
              {isAuthenticated ? (
                // Show all navigation items when authenticated
                <>
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  ))}
                  <div className="px-4 py-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </div>
                </>
              ) : (
                // Show Explore and auth buttons when not authenticated
                <>
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
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;