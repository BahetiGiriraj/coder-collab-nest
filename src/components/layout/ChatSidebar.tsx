import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  ChevronLeft, 
  Search, 
  Users, 
  Send,
  MoreHorizontal 
} from "lucide-react";

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatSidebar = ({ isOpen, onToggle }: ChatSidebarProps) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      lastMessage: "Thanks for helping with the algorithm!",
      timestamp: "2m",
      unread: 2,
      isOnline: true,
      type: "direct"
    },
    {
      id: "2",
      name: "React Study Group",
      avatar: "/placeholder.svg",
      lastMessage: "Alex: Anyone free for the hackathon?",
      timestamp: "15m",
      unread: 0,
      isOnline: false,
      type: "group",
      members: 12
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg",
      lastMessage: "Check out this new library I found",
      timestamp: "1h",
      unread: 1,
      isOnline: true,
      type: "direct"
    },
    {
      id: "4",
      name: "CS 301 Project Team",
      avatar: "/placeholder.svg",
      lastMessage: "Emma: Updated the requirements doc",
      timestamp: "3h",
      unread: 0,
      isOnline: false,
      type: "group",
      members: 4
    }
  ];

  const messages = [
    {
      id: "1",
      sender: "Sarah Chen",
      content: "Hey! I'm stuck on this sorting algorithm. Could you take a look?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: "2",
      sender: "You",
      content: "Of course! Can you share your code?",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: "3",
      sender: "Sarah Chen",
      content: "Thanks for helping with the algorithm!",
      timestamp: "11:15 AM",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
      // Handle message sending logic here
    }
  };

  return (
    <div className={`fixed right-0 top-0 h-full bg-card border-l border-border transition-all duration-300 ease-in-out z-30 ${
      isOpen ? "w-80" : "w-12"
    }`}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={`absolute top-4 transition-all duration-300 ${
          isOpen ? "left-4" : "left-1"
        }`}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <MessageCircle className="h-4 w-4" />
        )}
      </Button>

      {isOpen && (
        <div className="flex flex-col h-full pt-16">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-lg mb-3">Messages</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </div>

          {!selectedChat ? (
            /* Chat List */
            <ScrollArea className="flex-1">
              <div className="p-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>
                          {chat.type === "group" ? (
                            <Users className="h-5 w-5" />
                          ) : (
                            chat.name.split(" ").map(n => n[0]).join("")
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {chat.isOnline && chat.type === "direct" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-campus-green rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.type === "group" && (
                        <p className="text-xs text-muted-foreground">{chat.members} members</p>
                      )}
                    </div>
                    {chat.unread > 0 && (
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            /* Chat View */
            <div className="flex flex-col flex-1">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <h4 className="font-medium">Sarah Chen</h4>
                    <p className="text-xs text-campus-green">Online</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          msg.isOwn
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;