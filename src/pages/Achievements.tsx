import { useState } from "react";
import Header from "@/components/layout/Header";
import ChatSidebar from "@/components/layout/ChatSidebar";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy,
  Award,
  Medal,
  Star,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  Building,
  Users,
  Target
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Achievements = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();
  const [endorsedAchievements, setEndorsedAchievements] = useState<string[]>([]);

  const achievements = [
    {
      id: "1",
      title: "Google Summer of Code 2023",
      organization: "Google",
      type: "internship",
      description: "Contributed to open-source machine learning libraries, implementing new algorithms for computer vision tasks and improving documentation.",
      student: {
        name: "Sarah Chen",
        username: "sarahc", 
        avatar: "/placeholder.svg",
        year: "Senior"
      },
      date: "Summer 2023",
      skills: ["Python", "TensorFlow", "Computer Vision"],
      verification: "verified",
      category: "Professional Experience"
    },
    {
      id: "2",
      title: "1st Place - University Hackathon",
      organization: "University Tech Week",
      type: "competition",
      description: "Led a team of 4 developers to build an AI-powered sustainability app that won first place out of 50+ teams competing.",
      student: {
        name: "Alex Kumar",
        username: "alexk",
        avatar: "/placeholder.svg",
        year: "Junior"
      },
      date: "November 2023",
      skills: ["React Native", "Node.js", "AI/ML"],
      verification: "verified",
      category: "Competition",
      teamSize: 4,
      prize: "$5,000"
    },
    {
      id: "3",
      title: "AWS Cloud Practitioner",
      organization: "Amazon Web Services",
      type: "certification",
      description: "Earned foundational cloud computing certification demonstrating understanding of AWS services, security, and best practices.",
      student: {
        name: "Mike Rodriguez",
        username: "mikerod",
        avatar: "/placeholder.svg",
        year: "Sophomore"
      },
      date: "October 2023",
      skills: ["AWS", "Cloud Computing", "DevOps"],
      verification: "verified",
      category: "Certification",
      credentialId: "AWS-CCP-2023-1234"
    },
    {
      id: "4",
      title: "Research Publication - AI Ethics",
      organization: "IEEE Computer Society",
      type: "publication",
      description: "Co-authored research paper on ethical considerations in machine learning algorithms, published in IEEE Computer Society journal.",
      student: {
        name: "Emma Davis",
        username: "emmad",
        avatar: "/placeholder.svg",
        year: "Senior"
      },
      date: "September 2023",
      skills: ["Research", "AI Ethics", "Academic Writing"],
      verification: "verified",
      category: "Research",
      coAuthors: 3
    },
    {
      id: "5",
      title: "Microsoft Student Ambassador",
      organization: "Microsoft",
      type: "leadership",
      description: "Selected as campus representative to promote Microsoft technologies, organize workshops, and mentor fellow students in cloud computing.",
      student: {
        name: "Jordan Lee",
        username: "jordanl", 
        avatar: "/placeholder.svg",
        year: "Junior"
      },
      date: "August 2023 - Present",
      skills: ["Leadership", "Public Speaking", "Azure"],
      verification: "verified",
      category: "Leadership"
    },
    {
      id: "6",
      title: "Volunteer Teaching Assistant",
      organization: "CS Department",
      type: "volunteer",
      description: "Volunteered 20+ hours per week helping underclassmen with programming fundamentals, grading assignments, and running study sessions.",
      student: {
        name: "Taylor Smith",
        username: "taylors",
        avatar: "/placeholder.svg",
        year: "Senior"
      },
      date: "Fall 2023",
      skills: ["Teaching", "Mentoring", "Java"],
      verification: "pending",
      category: "Volunteer Work",
      hoursPerWeek: 20
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "competition": return Trophy;
      case "certification": return Award;
      case "internship": return Building;
      case "publication": return Star;
      case "leadership": return Users;
      case "volunteer": return Target;
      default: return Medal;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "competition": return "text-campus-orange";
      case "certification": return "text-campus-blue";
      case "internship": return "text-campus-green";
      case "publication": return "text-campus-purple";
      case "leadership": return "text-primary";
      case "volunteer": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getVerificationBadge = (verification: string) => {
    if (verification === "verified") {
      return <Badge className="bg-campus-green text-white text-xs">Verified</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Pending</Badge>;
  };

  const handleAddAchievement = () => {
    toast({
      title: "Add Achievement",
      description: "Achievement submission form coming soon"
    });
  };

  const handleMyPortfolio = () => {
    toast({
      title: "My Portfolio",
      description: "Loading your achievements portfolio"
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Filter options coming soon"
    });
  };

  const handleEndorse = (achievementId: string, title: string) => {
    if (endorsedAchievements.includes(achievementId)) {
      setEndorsedAchievements(endorsedAchievements.filter(id => id !== achievementId));
      toast({
        title: "Endorsement removed",
        description: `Removed endorsement from ${title}`
      });
    } else {
      setEndorsedAchievements([...endorsedAchievements, achievementId]);
      toast({
        title: "Endorsed!",
        description: `You endorsed ${title}`
      });
    }
  };

  const handleViewDetails = (title: string) => {
    toast({
      title: "Achievement Details",
      description: `Loading full details for ${title}`
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
              <h1 className="text-3xl font-bold text-primary">Student Achievements</h1>
              <p className="text-muted-foreground">Celebrate success and build your professional portfolio</p>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-gradient-accent" onClick={handleAddAchievement}>
                <Plus className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
              <Button variant="outline" onClick={handleMyPortfolio}>
                <Trophy className="h-4 w-4 mr-2" />
                My Portfolio
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search achievements by student, skill, or organization..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="text-center p-4">
              <Trophy className="h-8 w-8 text-campus-orange mx-auto mb-2" />
              <div className="text-xl font-bold">42</div>
              <div className="text-xs text-muted-foreground">Competitions</div>
            </Card>
            <Card className="text-center p-4">
              <Award className="h-8 w-8 text-campus-blue mx-auto mb-2" />
              <div className="text-xl font-bold">67</div>
              <div className="text-xs text-muted-foreground">Certifications</div>
            </Card>
            <Card className="text-center p-4">
              <Building className="h-8 w-8 text-campus-green mx-auto mb-2" />
              <div className="text-xl font-bold">23</div>
              <div className="text-xs text-muted-foreground">Internships</div>
            </Card>
            <Card className="text-center p-4">
              <Star className="h-8 w-8 text-campus-purple mx-auto mb-2" />
              <div className="text-xl font-bold">15</div>
              <div className="text-xs text-muted-foreground">Publications</div>
            </Card>
            <Card className="text-center p-4">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold">31</div>
              <div className="text-xs text-muted-foreground">Leadership</div>
            </Card>
            <Card className="text-center p-4">
              <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-xl font-bold">89</div>
              <div className="text-xs text-muted-foreground">Volunteer</div>
            </Card>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const TypeIcon = getTypeIcon(achievement.type);
              
              return (
                <Card key={achievement.id} className="shadow-elegant hover:shadow-glow transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg bg-muted ${getTypeColor(achievement.type)}`}>
                          <TypeIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <CardTitle className="text-lg">{achievement.title}</CardTitle>
                            {getVerificationBadge(achievement.verification)}
                          </div>
                          <p className="text-sm text-campus-blue font-medium mb-2">
                            {achievement.organization}
                          </p>
                          <Badge variant="secondary" className="text-xs mb-2">
                            {achievement.category}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={achievement.student.avatar} />
                        <AvatarFallback className="text-xs">
                          {achievement.student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{achievement.student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          @{achievement.student.username} • {achievement.student.year}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>

                    {/* Additional Details */}
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{achievement.date}</span>
                      </div>
                      
                      {achievement.prize && (
                        <div className="flex items-center space-x-2 text-campus-orange">
                          <Trophy className="h-3 w-3" />
                          <span>Prize: {achievement.prize}</span>
                        </div>
                      )}
                      
                      {achievement.teamSize && (
                        <div className="flex items-center space-x-2">
                          <Users className="h-3 w-3" />
                          <span>Team Size: {achievement.teamSize}</span>
                        </div>
                      )}
                      
                      {achievement.credentialId && (
                        <div className="flex items-center space-x-2">
                          <Award className="h-3 w-3" />
                          <span>ID: {achievement.credentialId}</span>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    <div>
                      <span className="text-sm font-medium mb-2 block">Skills & Technologies</span>
                      <div className="flex flex-wrap gap-1">
                        {achievement.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        size="sm" 
                        variant={endorsedAchievements.includes(achievement.id) ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => handleEndorse(achievement.id, achievement.title)}
                      >
                        <Star className={`h-4 w-4 mr-2 ${endorsedAchievements.includes(achievement.id) ? "fill-current" : ""}`} />
                        {endorsedAchievements.includes(achievement.id) ? "Endorsed" : "Endorse"}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewDetails(achievement.title)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <ChatSidebar isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

export default Achievements;