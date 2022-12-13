export type User = {
  _id: string;
  email: string;
} | null;

export type AwesomePost = {
  id: string;
  userEmail: string;
  createdAt: string;
  title: string;
  text: string;
  tags: string[];
  views: number;
};

export type Tag = {
  key: number;
  value: string;
};

export type CustomTextField = {
  type: string;
  label: string;
};
