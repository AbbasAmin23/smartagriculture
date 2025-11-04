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
import { communityPosts } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Users, MessageSquare, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function CommunityForum() {
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
        <div className="space-y-2">
          <Textarea placeholder="Share your thoughts or ask a question..." />
          <Button size="sm" className="float-right">Post</Button>
        </div>
        <div className="space-y-4 pt-4">
          {communityPosts.map((post) => {
            const authorAvatar = PlaceHolderImages.find((img) => img.id === post.author.avatarId);
            return (
              <div key={post.id} className="flex gap-3">
                <Avatar>
                  {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.author.name} data-ai-hint={authorAvatar.imageHint}/>}
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="mt-2 text-sm">{post.content}</p>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 -ml-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments.length}</span>
                    </Button>
                  </div>
                  {post.comments.length > 0 && (
                     <div className="mt-2 flex gap-3 border-l-2 pl-4">
                      <div className="flex flex-col gap-2 w-full">
                        {post.comments.map(comment => {
                          const commentAvatar = PlaceHolderImages.find((img) => img.id === comment.author.avatarId);
                          return (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="w-8 h-8">
                                {commentAvatar && <AvatarImage src={commentAvatar.imageUrl} alt={comment.author.name} data-ai-hint={commentAvatar.imageHint}/>}
                                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-muted p-2 rounded-lg">
                                <p className="font-semibold text-sm">{comment.author.name}</p>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                     </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
