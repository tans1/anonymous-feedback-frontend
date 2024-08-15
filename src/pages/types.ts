export type Comment = {
    id: string;
    content: string;
    user_fingerprint: string; 
    post_id: string;
    created_at: string;
  }
  
export type User = {
    id: string;
    email: string;
    user_fingerprint: string; 
  }
  
export type Post = {
    id: string;
    content: string;
    title: string;
    user_id: string;
    comments: Comment[];
    created_by: User;
    created_at: string;
  }
  
  export type PostWithCount = {
    id: string;
    content: string;
    title: string;
    user_id: string;
    comments: Comment[];
    created_by: User;
    commentsCount: number;
    created_at: string;
  }
