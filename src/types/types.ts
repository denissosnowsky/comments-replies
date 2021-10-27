export type ReplyType = {
  id: number;
  commentId: number;
  name: string;
  body: string;
  date: number;
  avatar: string;
};

export type CommentType = {
  id: number;
  name: string;
  body: string;
  date: number;
  avatar: string;
  replies: Array<ReplyType>;
};

export type CommentMutationType = {
  id: number;
  name: string;
  body: string;
  date: number;
  avatar: string;
};
