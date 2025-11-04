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
import { Users, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useCollection,
  useFirestore,
  useUser,
  useMemoFirebase,
  addDocumentNonBlocking,
  deleteDocumentNonBlocking,
  updateDocumentNonBlocking,
} from '@/firebase';
import { collection, query, orderBy, serverTimestamp, doc } from 'firebase/firestore';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from './ui/input';
import { useLanguage } from '@/context/language-context';


export function CommunityForum() {
  const firestore = useFirestore();
  const { user } = useUser();
  const [newPostContent, setNewPostContent] = React.useState('');
  const [editingPostId, setEditingPostId] = React.useState<string | null>(null);
  const [editingContent, setEditingContent] = React.useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [postToDelete, setPostToDelete] = React.useState<string | null>(null);
  const { translations } = useLanguage();

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
      authorName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
      authorAvatarId: '1', // Default avatar for now
      content: newPostContent,
      dateCreated: serverTimestamp(),
    });
    setNewPostContent('');
  };

  const confirmDeletePost = (postId: string) => {
    setPostToDelete(postId);
    setShowDeleteConfirm(true);
  };

  const handleDeletePost = () => {
    if (!firestore || !postToDelete) return;
    const postDoc = doc(firestore, 'forumPosts', postToDelete);
    deleteDocumentNonBlocking(postDoc);
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  };
  
  const handleEditPost = (post: any) => {
    setEditingPostId(post.id);
    setEditingContent(post.content);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditingContent('');
  };

  const handleUpdatePost = () => {
    if (!firestore || !editingPostId || !editingContent.trim()) return;
    const postDoc = doc(firestore, 'forumPosts', editingPostId);
    updateDocumentNonBlocking(postDoc, { content: editingContent });
    handleCancelEdit();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          <span>{translations.communityForum.title}</span>
        </CardTitle>
        <CardDescription>
          {translations.communityForum.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {user && (
          <div className="space-y-2">
            <Textarea
              placeholder={translations.communityForum.postPlaceholder}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <Button size="sm" className="float-right" onClick={handlePost}>{translations.communityForum.postButton}</Button>
          </div>
        )}
        <div className="space-y-4 pt-4">
          {postsLoading && <p>{translations.communityForum.loadingPosts}</p>}
          {posts?.map((post) => {
            const authorAvatar = PlaceHolderImages.find((img) => img.id === post.authorAvatarId);
            const postDate = post.dateCreated?.toDate().toLocaleTimeString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const isOwner = user && post.farmerId === user.uid;
            const authorName = post.authorName || 'Anonymous';

            return (
              <div key={post.id} className="flex gap-3">
                <Avatar>
                  {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={authorName} data-ai-hint={authorAvatar.imageHint}/>}
                  <AvatarFallback>{authorName.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{authorName}</p>
                      <p className="text-xs text-muted-foreground">{postDate || translations.communityForum.justNow}</p>
                    </div>
                    {isOwner && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditPost(post)}><Edit className="mr-2 h-4 w-4" /> {translations.communityForum.edit}</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => confirmDeletePost(post.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2 h-4 w-4" /> {translations.communityForum.delete}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  {editingPostId === post.id ? (
                     <div className="mt-2 space-y-2">
                        <Input value={editingContent} onChange={(e) => setEditingContent(e.target.value)} />
                        <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>{translations.communityForum.cancel}</Button>
                            <Button size="sm" onClick={handleUpdatePost}>{translations.communityForum.update}</Button>
                        </div>
                     </div>
                  ) : (
                    <p className="mt-2 text-sm">{post.content}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
       <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{translations.communityForum.deleteConfirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {translations.communityForum.deleteConfirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteConfirm(false)}>{translations.communityForum.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-destructive hover:bg-destructive/90">{translations.communityForum.delete}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
