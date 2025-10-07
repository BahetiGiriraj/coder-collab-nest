import { useState } from "react";
import Header from "@/components/layout/Header";
import ChatSidebar from "@/components/layout/ChatSidebar";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Target,
  GitBranch,
  MessageCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Teams = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();
  const [joinedTeams, setJoinedTeams] = useState<string[]>([]);

  const teams = [
    {
      id: "1",
      name: "AI Study Group",
      description: "Exploring machine learning algorithms and building cool AI projects together",
      members: [
        { name: "Sarah Chen", avatar: "/placeholder.svg" },
        { name: "Alex Kumar", avatar: "/placeholder.svg" },
        { name: "Mike Johnson", avatar: "/placeholder.svg" },
        { name: "Emma Davis", avatar: "/placeholder.svg" }
      ],
      totalMembers: 8,
      maxMembers: 12,
      category: "Study Group",
      technologies: ["Python", "TensorFlow", "PyTorch"],
      progress: 65,
      deadline: "March 15, 2024",
      status: "active",
      isPublic: true
    },
    {
      id: "2", 
      name: "Hackathon Team Alpha",
      description: "Building a sustainable transportation app for the upcoming eco-hackathon",
      members: [
        { name: "Jordan Lee", avatar: "/placeholder.svg" },
        { name: "Taylor Smith", avatar: "/placeholder.svg" },
        { name: "Casey Williams", avatar: "/placeholder.svg" }
      ],
      totalMembers: 4,
      maxMembers: 4,
      category: "Competition",
      technologies: ["React Native", "Node.js", "MongoDB"],
      progress: 80,
      deadline: "February 28, 2024",
      status: "recruiting",
      isPublic: true
    },
    {
      id: "3",
      name: "Web Dev Capstone",
      description: "CS 499 capstone project - building a comprehensive e-learning platform",
      members: [
        { name: "Riley Chen", avatar: "/placeholder.svg" },
        { name: "Sam Rodriguez", avatar: "/placeholder.svg" },
        { name: "Morgan Kim", avatar: "/placeholder.svg" },
        { name: "Avery Thompson", avatar: "/placeholder.svg" },
        { name: "Quinn Davis", avatar: "/placeholder.svg" }
      ],
      totalMembers: 5,
      maxMembers: 6,
      category: "Capstone",
      technologies: ["React", "Django", "PostgreSQL"],
      progress: 45,
      deadline: "May 1, 2024",
      status: "active",
      isPublic: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recruiting": return "bg-campus-green";
      case "active": return "bg-campus-blue";
      case "completed": return "bg-campus-purple";
      default: return "bg-muted";
    }
  };

  const handleCreateTeam = () => {
    toast({
      title: "Create Team",
      description: "Team creation form coming soon"
    });
  };

  const handleBrowseAll = () => {
    toast({
      title: "Browsing Teams",
      description: "Showing all available teams"
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Filter options coming soon"
    });
  };

  const handleJoinTeam = (teamId: string, teamName: string, isFull: boolean) => {
    if (isFull) return;
    
    if (joinedTeams.includes(teamId)) {
      setJoinedTeams(joinedTeams.filter(id => id !== teamId));
      toast({
        title: "Left team",
        description: `You've left ${teamName}`
      });
    } else {
      setJoinedTeams([...joinedTeams, teamId]);
      toast({
        title: "Joined team!",
        description: `Welcome to ${teamName}!`
      });
    }
  };

  const handleChat = (teamName: string) => {
    toast({
      title: "Opening chat",
      description: `Starting conversation with ${teamName}`
    });
  };

  const handleViewDetails = (teamName: string) => {
    toast({
      title: "Team Details",
      description: `Loading details for ${teamName}`
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
              <h1 className="text-3xl font-bold text-primary">Teams & Collaboration</h1>
              <p className="text-muted-foreground">Join forces with fellow coders on amazing projects</p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-accent" onClick={handleCreateTeam}>
                <Plus className="h-4 w-4 mr-2" />
                Create Team
              </Button>
              <Button variant="outline" onClick={handleBrowseAll}>
                <Users className="h-4 w-4 mr-2" />
                Browse All
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams by name, technology, or project type..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teams.map((team) => (
              <Card key={team.id} className="shadow-elegant hover:shadow-glow transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-xl">{team.name}</CardTitle>
                        <Badge 
                          className={`${getStatusColor(team.status)} text-white text-xs`}
                        >
                          {team.status}
                        </Badge>
                        {!team.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            Private
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {team.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {team.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Members */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Team Members</span>
                      <span className="text-xs text-muted-foreground">
                        {team.totalMembers}/{team.maxMembers}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 4).map((member, index) => (
                          <Avatar key={index} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {team.totalMembers > 4 && (
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background text-xs">
                            +{team.totalMembers - 4}
                          </div>
                        )}
                      </div>
                      <Progress value={(team.totalMembers / team.maxMembers) * 100} className="flex-1 h-2" />
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <span className="text-sm font-medium mb-2 block">Technologies</span>
                    <div className="flex flex-wrap gap-1">
                      {team.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Project Progress</span>
                      <span className="text-xs text-muted-foreground">{team.progress}%</span>
                    </div>
                    <Progress value={team.progress} className="h-2" />
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {team.deadline}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      className={joinedTeams.includes(team.id) ? "flex-1" : "flex-1 bg-gradient-accent"}
                      variant={joinedTeams.includes(team.id) ? "outline" : "default"}
                      size="sm"
                      disabled={team.totalMembers >= team.maxMembers && !joinedTeams.includes(team.id)}
                      onClick={() => handleJoinTeam(team.id, team.name, team.totalMembers >= team.maxMembers)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {team.totalMembers >= team.maxMembers && !joinedTeams.includes(team.id) 
                        ? "Team Full" 
                        : joinedTeams.includes(team.id) 
                          ? "Leave Team" 
                          : "Join Team"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleChat(team.name)}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(team.name)}>
                      <Target className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center p-6">
              <div className="text-2xl font-bold text-campus-blue">24</div>
              <div className="text-sm text-muted-foreground">Active Teams</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-2xl font-bold text-campus-green">156</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-2xl font-bold text-campus-purple">8</div>
              <div className="text-sm text-muted-foreground">Recruiting</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-2xl font-bold text-campus-orange">12</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </Card>
          </div>
        </div>
      </main>

      <ChatSidebar isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default Teams;