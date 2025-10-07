import { useState } from "react";
import Header from "@/components/layout/Header";
import ChatSidebar from "@/components/layout/ChatSidebar";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FolderGit2,
  Star,
  GitFork,
  Eye,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Code,
  Download
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Repositories = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();
  const [starredRepos, setStarredRepos] = useState<string[]>([]);
  const [forkedRepos, setForkedRepos] = useState<string[]>([]);

  const repositories = [
    {
      id: "1",
      name: "AI-Powered Study Assistant",
      description: "Machine learning app that helps students organize their study materials and provides personalized learning recommendations based on performance analytics.",
      author: {
        name: "Sarah Chen",
        username: "sarahc",
        avatar: "/placeholder.svg"
      },
      language: "Python",
      languages: ["Python", "JavaScript", "CSS"],
      stars: 24,
      forks: 8,
      watchers: 15,
      lastUpdated: "2 days ago",
      tags: ["Machine Learning", "Education", "React", "Flask"],
      isPublic: true,
      hasDemo: true
    },
    {
      id: "2",
      name: "Campus Event Tracker",
      description: "Full-stack web application for tracking campus events with real-time notifications, RSVP functionality, and social integration features.",
      author: {
        name: "Alex Kumar",
        username: "alexk",
        avatar: "/placeholder.svg"
      },
      language: "TypeScript",
      languages: ["TypeScript", "React", "Node.js", "MongoDB"],
      stars: 31,
      forks: 12,
      watchers: 22,
      lastUpdated: "5 hours ago",
      tags: ["Full Stack", "React", "MongoDB", "WebSockets"],
      isPublic: true,
      hasDemo: true
    },
    {
      id: "3",
      name: "Code Review Bot",
      description: "Automated code review tool that uses static analysis to detect common programming errors and suggest improvements for student submissions.",
      author: {
        name: "Mike Rodriguez", 
        username: "mikerod",
        avatar: "/placeholder.svg"
      },
      language: "Java",
      languages: ["Java", "Spring Boot", "PostgreSQL"],
      stars: 18,
      forks: 5,
      watchers: 11,
      lastUpdated: "1 week ago",
      tags: ["Code Analysis", "Spring Boot", "Education Tools"],
      isPublic: true,
      hasDemo: false
    },
    {
      id: "4",
      name: "Recipe Sharing Platform",
      description: "Social platform for sharing and discovering recipes with ingredient-based search, nutritional analysis, and meal planning features.",
      author: {
        name: "Emma Davis",
        username: "emmad",
        avatar: "/placeholder.svg"
      },
      language: "JavaScript",
      languages: ["JavaScript", "Vue.js", "Express", "MySQL"],
      stars: 42,
      forks: 16,
      watchers: 28,
      lastUpdated: "3 days ago", 
      tags: ["Vue.js", "Social Platform", "API Integration"],
      isPublic: true,
      hasDemo: true
    },
    {
      id: "5",
      name: "Blockchain Voting System",
      description: "Secure and transparent voting system built on blockchain technology for student government elections with cryptographic verification.",
      author: {
        name: "Jordan Lee",
        username: "jordanl",
        avatar: "/placeholder.svg"
      },
      language: "Solidity",
      languages: ["Solidity", "JavaScript", "Web3.js", "React"],
      stars: 67,
      forks: 23,
      watchers: 45,
      lastUpdated: "4 days ago",
      tags: ["Blockchain", "Solidity", "Web3", "Security"],
      isPublic: true,
      hasDemo: false
    },
    {
      id: "6",
      name: "Virtual Lab Simulator",
      description: "Physics lab simulation environment with interactive experiments, data collection, and analysis tools for remote learning.",
      author: {
        name: "Taylor Smith",
        username: "taylors",
        avatar: "/placeholder.svg"
      },
      language: "C#",
      languages: ["C#", "Unity", "SQLite"],
      stars: 15,
      forks: 4,
      watchers: 9,
      lastUpdated: "1 week ago",
      tags: ["Unity", "Education", "Simulation", "Physics"],
      isPublic: true,
      hasDemo: true
    }
  ];

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      "Python": "bg-campus-blue",
      "JavaScript": "bg-campus-orange",
      "TypeScript": "bg-campus-purple",
      "Java": "bg-campus-green",
      "Solidity": "bg-primary",
      "C#": "bg-destructive"
    };
    return colors[language] || "bg-muted";
  };

  const handleNewRepository = () => {
    toast({
      title: "Create Repository",
      description: "Repository creation form coming soon"
    });
  };

  const handleMyProjects = () => {
    toast({
      title: "My Projects",
      description: "Loading your repositories"
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Filter options coming soon"
    });
  };

  const handleStar = (repoId: string, repoName: string) => {
    if (starredRepos.includes(repoId)) {
      setStarredRepos(starredRepos.filter(id => id !== repoId));
      toast({
        title: "Unstarred",
        description: `Removed ${repoName} from starred repositories`
      });
    } else {
      setStarredRepos([...starredRepos, repoId]);
      toast({
        title: "Starred!",
        description: `Added ${repoName} to starred repositories`
      });
    }
  };

  const handleFork = (repoId: string, repoName: string) => {
    if (forkedRepos.includes(repoId)) {
      toast({
        title: "Already forked",
        description: `You've already forked ${repoName}`
      });
    } else {
      setForkedRepos([...forkedRepos, repoId]);
      toast({
        title: "Forked!",
        description: `Successfully forked ${repoName} to your account`
      });
    }
  };

  const handleDemo = (repoName: string) => {
    toast({
      title: "Opening demo",
      description: `Loading live demo for ${repoName}`
    });
  };

  const handleViewCode = (repoName: string) => {
    toast({
      title: "Opening repository",
      description: `Loading code for ${repoName}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header />
      
      <main className={`container mx-auto px-4 py-8 transition-all duration-300 ${
        isChatOpen ? "mr-80" : "mr-12"
      }`}>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Project Repositories</h1>
              <p className="text-muted-foreground">Showcase your code and discover amazing student projects</p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-accent" onClick={handleNewRepository}>
                <Plus className="h-4 w-4 mr-2" />
                New Repository
              </Button>
              <Button variant="outline" onClick={handleMyProjects}>
                <FolderGit2 className="h-4 w-4 mr-2" />
                My Projects
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories by name, language, or technology..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Featured Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-campus-blue">127</div>
              <div className="text-sm text-muted-foreground">Public Repos</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-campus-green">1.2k</div>
              <div className="text-sm text-muted-foreground">Total Stars</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-campus-purple">456</div>
              <div className="text-sm text-muted-foreground">Total Forks</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-campus-orange">18</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </Card>
          </div>

          {/* Repositories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {repositories.map((repo) => (
              <Card key={repo.id} className="shadow-elegant hover:shadow-glow transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <FolderGit2 className="h-5 w-5 text-campus-blue" />
                        <CardTitle className="text-lg hover:text-campus-blue cursor-pointer">
                          {repo.name}
                        </CardTitle>
                        {repo.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            Public
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {repo.description}
                      </p>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-2 text-sm">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={repo.author.avatar} />
                      <AvatarFallback className="text-xs">
                        {repo.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground">
                      {repo.author.name} (@{repo.author.username})
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Languages */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                      <span className="text-sm font-medium">{repo.language}</span>
                      <span className="text-xs text-muted-foreground">
                        +{repo.languages.length - 1} more
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {repo.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {repo.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{repo.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-4 w-4" />
                        <span>{repo.forks}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{repo.watchers}</span>
                      </div>
                    </div>
                    <span>Updated {repo.lastUpdated}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      variant={starredRepos.includes(repo.id) ? "default" : "outline"} 
                      className="flex-1"
                      onClick={() => handleStar(repo.id, repo.name)}
                    >
                      <Star className={`h-4 w-4 mr-2 ${starredRepos.includes(repo.id) ? "fill-current" : ""}`} />
                      {starredRepos.includes(repo.id) ? "Starred" : "Star"}
                    </Button>
                    <Button 
                      size="sm" 
                      variant={forkedRepos.includes(repo.id) ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => handleFork(repo.id, repo.name)}
                    >
                      <GitFork className="h-4 w-4 mr-2" />
                      {forkedRepos.includes(repo.id) ? "Forked" : "Fork"}
                    </Button>
                    {repo.hasDemo && (
                      <Button size="sm" className="bg-gradient-accent" onClick={() => handleDemo(repo.name)}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleViewCode(repo.name)}>
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <ChatSidebar isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default Repositories;