import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
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
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [rsvpedEvents, setRsvpedEvents] = useState<string[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);
  const [rsvpCounts, setRsvpCounts] = useState<Record<string, number>>({});
  
  useEffect(() => {
    if (user) {
      fetchUserPreferences();
      fetchRsvpCounts();
    }
  }, [user]);

  const fetchUserPreferences = async () => {
    if (!user) return;

    try {
      // Check subscription status
      const { data: subData } = await supabase
        .from("notification_subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      setIsSubscribed(!!subData);

      // Fetch RSVPs
      const { data: rsvpData } = await supabase
        .from("announcement_rsvps")
        .select("announcement_id")
        .eq("user_id", user.id);
      
      setRsvpedEvents(rsvpData?.map(r => r.announcement_id) || []);

      // Fetch reminders
      const { data: reminderData } = await supabase
        .from("announcement_reminders")
        .select("announcement_id")
        .eq("user_id", user.id);
      
      setReminders(reminderData?.map(r => r.announcement_id) || []);
    } catch (error: any) {
      console.error("Error fetching preferences:", error);
    }
  };

  const fetchRsvpCounts = async () => {
    try {
      const { data, error } = await supabase
        .from("announcement_rsvps")
        .select("announcement_id");
      
      if (error) throw error;

      const counts: Record<string, number> = {};
      data?.forEach(rsvp => {
        counts[rsvp.announcement_id] = (counts[rsvp.announcement_id] || 0) + 1;
      });
      
      setRsvpCounts(counts);
    } catch (error: any) {
      console.error("Error fetching RSVP counts:", error);
    }
  };

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
      baseRsvpCount: 156
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
      baseRsvpCount: 42
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
      baseRsvpCount: 28
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

  const handleSubscribe = async () => {
    if (!user) return;

    try {
      if (isSubscribed) {
        await supabase
          .from("notification_subscriptions")
          .delete()
          .eq("user_id", user.id);
        
        setIsSubscribed(false);
        toast({
          title: "Unsubscribed",
          description: "You will no longer receive notifications"
        });
      } else {
        await supabase
          .from("notification_subscriptions")
          .insert({ user_id: user.id });
        
        setIsSubscribed(true);
        toast({
          title: "Subscribed!",
          description: "You'll now receive notifications for new announcements"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRSVP = async (announcementId: string) => {
    if (!user) return;

    try {
      if (rsvpedEvents.includes(announcementId)) {
        await supabase
          .from("announcement_rsvps")
          .delete()
          .eq("user_id", user.id)
          .eq("announcement_id", announcementId);
        
        setRsvpedEvents(rsvpedEvents.filter(id => id !== announcementId));
        setRsvpCounts(prev => ({
          ...prev,
          [announcementId]: (prev[announcementId] || 0) - 1
        }));
        toast({
          title: "RSVP Cancelled",
          description: "Your RSVP has been cancelled"
        });
      } else {
        await supabase
          .from("announcement_rsvps")
          .insert({ user_id: user.id, announcement_id: announcementId });
        
        setRsvpedEvents([...rsvpedEvents, announcementId]);
        setRsvpCounts(prev => ({
          ...prev,
          [announcementId]: (prev[announcementId] || 0) + 1
        }));
        toast({
          title: "RSVP Confirmed!",
          description: "We'll see you there!"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLearnMore = (title: string) => {
    toast({
      title: "Opening details...",
      description: `Loading more information about ${title}`
    });
  };

  const handleReminder = async (announcementId: string) => {
    if (!user) return;

    try {
      if (reminders.includes(announcementId)) {
        await supabase
          .from("announcement_reminders")
          .delete()
          .eq("user_id", user.id)
          .eq("announcement_id", announcementId);
        
        setReminders(reminders.filter(id => id !== announcementId));
        toast({
          title: "Reminder removed",
          description: "You won't be reminded about this event"
        });
      } else {
        await supabase
          .from("announcement_reminders")
          .insert({ user_id: user.id, announcement_id: announcementId });
        
        setReminders([...reminders, announcementId]);
        toast({
          title: "Reminder set!",
          description: "We'll remind you about this event"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Filter options coming soon"
    });
  };

  const getRsvpCount = (announcement: any) => {
    const dbCount = rsvpCounts[announcement.id] || 0;
    const baseCount = announcement.baseRsvpCount || 0;
    return dbCount + baseCount;
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
                  {announcement.baseRsvpCount !== undefined && (
                    <Button 
                      variant={rsvpedEvents.includes(announcement.id) ? "default" : "outline"}
                      size="sm" 
                      className={rsvpedEvents.includes(announcement.id) ? "bg-gradient-accent text-accent-foreground" : ""}
                      onClick={() => handleRSVP(announcement.id)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {rsvpedEvents.includes(announcement.id) ? "RSVP'd" : "RSVP"} ({getRsvpCount(announcement)})
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
