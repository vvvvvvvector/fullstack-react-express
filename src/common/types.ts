export type User = {
  _id: string;
  email: string;
} | null;

export type NewPost = {
  title: string;
  text: string;
  tags: string[];
};

export type AwesomePost = {
  id?: string;
  userEmail?: string;
  createdAt?: string;
  title?: string;
  text?: string;
  tags?: string[];
  views?: number;
};
