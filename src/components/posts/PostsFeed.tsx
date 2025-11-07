import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  BookmarkPlus, 
  Code,
  Image,
  Video,
  Send,
  Trash2
} from "lucide-react";

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  year: string | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: Profile;
}

interface Post {
  id: string;
  user_id: string;
  content: string;
  code: string | null;
  image: string | null;
  tags: string[];
  likes: number;
  created_at: string;
  profiles: Profile;
  comments: Comment[];
  hasLiked: boolean;
  hasBookmarked: boolean;
}

const PostsFeed = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      // Fetch posts with profiles
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select(`
          *,
          profiles (*)
        `)
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      // Fetch comments for all posts
      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select(`
          *,
          profiles (*)
        `)
        .order("created_at", { ascending: true });

      if (commentsError) throw commentsError;

      // Fetch user's likes
      const { data: likesData, error: likesError } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("user_id", user?.id);

      if (likesError) throw likesError;

      // Fetch user's bookmarks
      const { data: bookmarksData, error: bookmarksError } = await supabase
        .from("post_bookmarks")
        .select("post_id")
        .eq("user_id", user?.id);

      if (bookmarksError) throw bookmarksError;

      const likedPostIds = new Set(likesData?.map(like => like.post_id) || []);
      const bookmarkedPostIds = new Set(bookmarksData?.map(bm => bm.post_id) || []);

      const postsWithComments = postsData?.map(post => ({
        ...post,
        comments: commentsData?.filter(comment => comment.post_id === post.id) || [],
        hasLiked: likedPostIds.has(post.id),
        hasBookmarked: bookmarkedPostIds.has(post.id),
      })) || [];

      setPosts(postsWithComments);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    try {
      if (post.hasLiked) {
        await supabase
          .from("post_likes")
          .delete()
          .eq("user_id", user.id)
          .eq("post_id", postId);

        await supabase
          .from("posts")
          .update({ likes: post.likes - 1 })
          .eq("id", postId);

        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, hasLiked: false, likes: p.likes - 1 }
            : p
        ));

        toast({
          title: "Unliked",
          description: "Removed from liked posts",
        });
      } else {
        await supabase
          .from("post_likes")
          .insert({ user_id: user.id, post_id: postId });

        await supabase
          .from("posts")
          .update({ likes: post.likes + 1 })
          .eq("id", postId);

        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, hasLiked: true, likes: p.likes + 1 }
            : p
        ));

        toast({
          title: "Liked!",
          description: "Added to liked posts",
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

  const handleBookmark = async (postId: string) => {
    if (!user) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    try {
      if (post.hasBookmarked) {
        await supabase
          .from("post_bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("post_id", postId);

        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, hasBookmarked: false }
            : p
        ));

        toast({
          title: "Removed bookmark",
          description: "Removed from saved posts",
        });
      } else {
        await supabase
          .from("post_bookmarks")
          .insert({ user_id: user.id, post_id: postId });

        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, hasBookmarked: true }
            : p
        ));

        toast({
          title: "Bookmarked!",
          description: "Added to saved posts",
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

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    toast({
      title: "Link copied!",
      description: "Post link copied to clipboard",
    });
  };

  const handleComment = (postId: string) => {
    setActiveCommentPost(activeCommentPost === postId ? null : postId);
  };

  const handleSendComment = async (postId: string) => {
    if (!user || !newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          post_id: postId,
          user_id: user.id,
          content: newComment,
        })
        .select(`
          *,
          profiles (*)
        `)
        .single();

      if (error) throw error;

      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, data] }
          : post
      ));

      toast({
        title: "Comment posted!",
        description: "Your comment has been added",
      });
      setNewComment("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreatePost = async () => {
    if (!user || !newPostContent.trim()) return;

    try {
      const { data, error } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          content: newPostContent,
          tags: [],
          likes: 0,
        })
        .select(`
          *,
          profiles (*)
        `)
        .single();

      if (error) throw error;

      setPosts([{ ...data, comments: [], hasLiked: false, hasBookmarked: false }, ...posts]);
      
      toast({
        title: "Post created!",
        description: "Your post has been published successfully",
      });
      setNewPostContent("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);

      if (error) throw error;

      setPosts(posts.filter(post => post.id !== postId));
      toast({
        title: "Post deleted",
        description: "Your post has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleMediaAction = (type: string) => {
    toast({
      title: `${type} selected`,
      description: `${type} upload feature coming soon`,
    });
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    const days = Math.floor(hours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

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
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share a coding problem, ask for help, or showcase your project..."
                className="min-h-[100px] mb-4"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleMediaAction("Code")}>
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleMediaAction("Image")}>
                    <Image className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleMediaAction("Video")}>
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                </div>
                <Button 
                  className="bg-gradient-accent" 
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                >
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
                  <AvatarImage src={post.profiles.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback>
                    {post.profiles.full_name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{post.profiles.full_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    @{post.profiles.username} • {post.profiles.year || "Student"} • {getTimeAgo(post.created_at)}
                  </p>
                </div>
              </div>
              {post.user_id === user?.id && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeletePost(post.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
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
                  {post.comments.length}
                </Button>

                <Button variant="ghost" size="sm" onClick={() => handleShare(post.id)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBookmark(post.id)}
                className={post.hasBookmarked ? "text-campus-blue" : ""}
              >
                <BookmarkPlus className={`h-4 w-4 ${post.hasBookmarked ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Comment Section */}
            {activeCommentPost === post.id && (
              <div className="w-full mt-4 pt-4 border-t border-border space-y-4">
                {/* Display existing comments */}
                {post.comments.length > 0 && (
                  <div className="space-y-4 mb-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.profiles.avatar_url || "/placeholder.svg"} />
                          <AvatarFallback>
                            {comment.profiles.full_name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm">{comment.profiles.full_name}</span>
                              <span className="text-xs text-muted-foreground">{getTimeAgo(comment.created_at)}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment input */}
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
