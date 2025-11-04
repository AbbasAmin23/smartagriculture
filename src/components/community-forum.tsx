'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Users, MessageSquare, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCollection, useFirestore, useUser, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, serverTimestamp, doc } from 'firebase/firestore';
import React from 'react';


export function CommunityForum() {
  const firestore = useFirestore();
  const { user } = useUser();
  const [newPostContent, setNewPostContent] = React.useState('');

  const postsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'forumPosts'), orderBy('dateCreated', 'desc'));
  }, [firestore]);

  const { data: posts, isLoading: postsLoading } = useCollection<any>(postsQuery);

  const handlePost = () => {
    if (!firestore || !user || !newPostContent.trim()) return;

    const postsCollection = collection(firestore, 'forumPosts');
    addDocumentNonBlocking(postsCollection, {
      farmerId: user.uid,
      authorName: user.displayName || user.email,
      authorAvatarId: '1', // Default avatar for now
      content: newPostContent,
      dateCreated: serverTimestamp(),
    });
    setNewPostContent('');
  };

  const handleDeletePost = (postId: string) => {
    if (!firestore) return;
    const postDoc = doc(firestore, 'forumPosts', postId);
    deleteDocumentNonBlocking(postDoc);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          <span>Community Forum</span>
        </CardTitle>
        <CardDescription>
          Connect with fellow farmers. Ask questions and share knowledge.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {user && (
          <div className="space-y-2">
            <Textarea 
              placeholder="Share your thoughts or ask a question..." 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <Button size="sm" className="float-right" onClick={handlePost}>Post</Button>
          </div>
        )}
        <div className="space-y-4 pt-4">
          {postsLoading && <p>Loading posts...</p>}
          {posts?.map((post) => {
            const authorAvatar = PlaceHolderImages.find((img) => img.id === post.authorAvatarId);
            const postDate = post.dateCreated?.toDate().toLocaleTimeString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const isOwner = user && post.farmerId === user.uid;

            return (
              <div key={post.id} className="flex gap-3">
                <Avatar>
                  {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.authorName} data-ai-hint={authorAvatar.imageHint}/>}
                  <AvatarFallback>{post.authorName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{post.authorName}</p>
                      <p className="text-xs text-muted-foreground">{postDate}</p>
                    </div>
                    {isOwner && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeletePost(post.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <p className="mt-2 text-sm">{post.content}</p>
                   {/* Comment section can be added later */}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
