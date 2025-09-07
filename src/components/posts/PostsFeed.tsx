import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  BookmarkPlus, 
  Code,
  Image,
  Video,
  MoreHorizontal,
  Send
} from "lucide-react";

const PostsFeed = () => {
  const [posts] = useState([
    {
      id: "1",
      author: {
        name: "Alex Thompson",
        username: "alexdev",
        avatar: "/placeholder.svg",
        year: "Junior"
      },
      timestamp: "2 hours ago",
      content: "Struggling with this React state management issue. Has anyone dealt with prop drilling in a large component tree? Looking for best practices and maybe some code review.",
      tags: ["React", "JavaScript", "State Management"],
      code: `const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// This gets passed down 5+ levels...
<UserProfile user={user} setUser={setUser} />`,
      likes: 12,
      comments: 8,
      hasLiked: false,
      hasBookmarked: false
    },
    {
      id: "2",
      author: {
        name: "Sarah Chen",
        username: "sarahc",
        avatar: "/placeholder.svg",
        year: "Senior"
      },
      timestamp: "4 hours ago",
      content: "Just finished implementing a binary search tree for our data structures class! The visualization came out really clean. Anyone want to collaborate on more algorithm visualizations?",
      tags: ["Data Structures", "Algorithms", "Python"],
      image: "/placeholder.svg",
      likes: 24,
      comments: 15,
      hasLiked: true,
      hasBookmarked: true
    },
    {
      id: "3",
      author: {
        name: "Mike Rodriguez",
        username: "mikerod",
        avatar: "/placeholder.svg",
        year: "Sophomore"
      },
      timestamp: "6 hours ago",
      content: "Quick tip: Use CSS Grid for layout and Flexbox for component alignment. Game changer for responsive design! Here's a simple example that solved my layout issues.",
      tags: ["CSS", "Web Design", "Frontend"],
      likes: 18,
      comments: 6,
      hasLiked: false,
      hasBookmarked: false
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    // Handle like logic here
    console.log("Liked post:", postId);
  };

  const handleComment = (postId: string) => {
    setActiveCommentPost(activeCommentPost === postId ? null : postId);
  };

  const handleSendComment = (postId: string) => {
    if (newComment.trim()) {
      // Handle comment sending logic
      console.log("Comment on post:", postId, newComment);
      setNewComment("");
      setActiveCommentPost(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Post Card */}
      <Card className="shadow-elegant">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share a coding problem, ask for help, or showcase your project..."
                className="min-h-[100px] mb-4"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Image className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                </div>
                <Button className="bg-gradient-accent">
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="shadow-elegant hover:shadow-glow transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex space-x-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{post.author.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    @{post.author.username} • {post.author.year} • {post.timestamp}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pb-3">
            <p className="text-foreground mb-4">{post.content}</p>
            
            {post.code && (
              <div className="bg-muted rounded-lg p-4 mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{post.code}</code>
                </pre>
              </div>
            )}

            {post.image && (
              <div className="mb-4">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="rounded-lg w-full max-h-96 object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="pt-3 border-t border-border">
            <div className="flex items-center justify-between w-full">
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={post.hasLiked ? "text-campus-orange" : ""}
                >
                  <Heart className={`h-4 w-4 mr-2 ${post.hasLiked ? "fill-current" : ""}`} />
                  {post.likes}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleComment(post.id)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {post.comments}
                </Button>

                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className={post.hasBookmarked ? "text-campus-blue" : ""}
              >
                <BookmarkPlus className={`h-4 w-4 ${post.hasBookmarked ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Comment Section */}
            {activeCommentPost === post.id && (
              <div className="w-full mt-4 pt-4 border-t border-border">
                <div className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveCommentPost(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSendComment(post.id)}
                        disabled={!newComment.trim()}
                        className="bg-gradient-accent"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PostsFeed;