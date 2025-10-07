import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ExternalLink,
  Bell,
  Star,
  Users
} from "lucide-react";

const AnnouncementsFeed = () => {
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [rsvpedEvents, setRsvpedEvents] = useState<string[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);
  
  const announcements = [
    {
      id: "1",
      type: "event",
      priority: "high",
      title: "Annual Hackathon 2024 Registration Open",
      content: "Join us for the biggest coding event of the year! Teams of up to 4 students can register now. Prizes include internship opportunities and $10,000 in cash prizes.",
      author: {
        name: "Computer Science Department",
        avatar: "/placeholder.svg"
      },
      date: "March 15-17, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Engineering Building",
      timestamp: "2 hours ago",
      tags: ["Hackathon", "Competition", "Prizes"],
      rsvpCount: 156
    },
    {
      id: "2",
      type: "deadline",
      priority: "urgent",
      title: "Final Project Submissions Due",
      content: "Reminder: All CS 401 final projects must be submitted through the portal by 11:59 PM. Late submissions will incur a 10% penalty per day.",
      author: {
        name: "Prof. Johnson",
        avatar: "/placeholder.svg"
      },
      date: "February 28, 2024",
      time: "11:59 PM",
      timestamp: "6 hours ago",
      tags: ["Deadline", "CS 401", "Final Project"]
    },
    {
      id: "3",
      type: "club",
      priority: "medium",
      title: "Women in Tech Weekly Meetup",
      content: "This week we're hosting a panel discussion on breaking into the tech industry. Guest speakers from Google, Microsoft, and local startups will share their experiences.",
      author: {
        name: "Women in Tech Club",
        avatar: "/placeholder.svg"
      },
      date: "February 22, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Student Center Room 201",
      timestamp: "1 day ago",
      tags: ["Women in Tech", "Panel", "Networking"],
      rsvpCount: 42
    },
    {
      id: "4",
      type: "holiday",
      priority: "low",
      title: "Spring Break - Campus Closed",
      content: "The university will be closed for Spring Break. All classes are suspended, and most campus facilities will have limited hours. Check individual department websites for specific schedules.",
      author: {
        name: "University Administration",
        avatar: "/placeholder.svg"
      },
      date: "March 4-8, 2024",
      timestamp: "3 days ago",
      tags: ["Holiday", "Spring Break", "Campus Closure"]
    },
    {
      id: "5",
      type: "workshop",
      priority: "medium",
      title: "Git & GitHub Workshop for Beginners",
      content: "Learn the fundamentals of version control with hands-on practice. Perfect for students new to collaborative coding. Bring your laptop!",
      author: {
        name: "Coding Club",
        avatar: "/placeholder.svg"
      },
      date: "February 25, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Computer Lab B",
      timestamp: "5 days ago",
      tags: ["Workshop", "Git", "GitHub", "Beginner"],
      rsvpCount: 28
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-destructive";
      case "high": return "bg-campus-orange";
      case "medium": return "bg-campus-blue";
      case "low": return "bg-campus-green";
      default: return "bg-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "event": return Calendar;
      case "deadline": return Clock;
      case "club": return Users;
      case "workshop": return Star;
      case "holiday": return MapPin;
      default: return Bell;
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    toast({
      title: isSubscribed ? "Unsubscribed" : "Subscribed!",
      description: isSubscribed 
        ? "You will no longer receive notifications" 
        : "You'll now receive notifications for new announcements"
    });
  };

  const handleRSVP = (announcementId: string) => {
    if (rsvpedEvents.includes(announcementId)) {
      setRsvpedEvents(rsvpedEvents.filter(id => id !== announcementId));
      toast({
        title: "RSVP Cancelled",
        description: "Your RSVP has been cancelled"
      });
    } else {
      setRsvpedEvents([...rsvpedEvents, announcementId]);
      toast({
        title: "RSVP Confirmed!",
        description: "We'll see you there!"
      });
    }
  };

  const handleLearnMore = (title: string) => {
    toast({
      title: "Opening details...",
      description: `Loading more information about ${title}`
    });
  };

  const handleReminder = (announcementId: string) => {
    if (reminders.includes(announcementId)) {
      setReminders(reminders.filter(id => id !== announcementId));
      toast({
        title: "Reminder removed",
        description: "You won't be reminded about this event"
      });
    } else {
      setReminders([...reminders, announcementId]);
      toast({
        title: "Reminder set!",
        description: "We'll remind you about this event"
      });
    }
  };

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Filter options coming soon"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Campus Announcements</h2>
          <p className="text-muted-foreground">Stay updated with the latest news and events</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={isSubscribed ? "default" : "outline"} 
            size="sm"
            onClick={handleSubscribe}
          >
            <Bell className="h-4 w-4 mr-2" />
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleFilter}>
            Filter
          </Button>
        </div>
      </div>

      {/* Announcements */}
      {announcements.map((announcement) => {
        const TypeIcon = getTypeIcon(announcement.type);
        
        return (
          <Card key={announcement.id} className="shadow-elegant hover:shadow-glow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getPriorityColor(announcement.priority)}`}>
                    <TypeIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          announcement.priority === "urgent" ? "border-destructive text-destructive" :
                          announcement.priority === "high" ? "border-campus-orange text-campus-orange" :
                          announcement.priority === "medium" ? "border-campus-blue text-campus-blue" :
                          "border-campus-green text-campus-green"
                        }`}
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={announcement.author.avatar} />
                          <AvatarFallback className="text-xs">
                            {announcement.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{announcement.author.name}</span>
                      </div>
                      <span>•</span>
                      <span>{announcement.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-foreground mb-4">{announcement.content}</p>

              {/* Event Details */}
              {(announcement.date || announcement.time || announcement.location) && (
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    {announcement.date && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-campus-blue" />
                        <span>{announcement.date}</span>
                      </div>
                    )}
                    {announcement.time && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-campus-green" />
                        <span>{announcement.time}</span>
                      </div>
                    )}
                    {announcement.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-campus-purple" />
                        <span>{announcement.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {announcement.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  {announcement.rsvpCount && (
                    <Button 
                      variant={rsvpedEvents.includes(announcement.id) ? "default" : "outline"}
                      size="sm" 
                      className={rsvpedEvents.includes(announcement.id) ? "bg-gradient-accent text-accent-foreground" : ""}
                      onClick={() => handleRSVP(announcement.id)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {rsvpedEvents.includes(announcement.id) ? "RSVP'd" : "RSVP"} ({announcement.rsvpCount + (rsvpedEvents.includes(announcement.id) ? 1 : 0)})
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleLearnMore(announcement.title)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </div>
                
                <Button 
                  variant={reminders.includes(announcement.id) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleReminder(announcement.id)}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  {reminders.includes(announcement.id) ? "Reminder Set" : "Remind Me"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AnnouncementsFeed;