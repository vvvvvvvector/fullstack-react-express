export type UserType = {
  _id: string;
  email: string;
} | null;

export type PostType = {
  id: string;
  userEmail: string;
  createdAt: string;
  title: string;
  text: string;
  tags: string[];
  views: number;
};

export type TagType = {
  key: number;
  value: string;
};
