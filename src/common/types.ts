export type UserType = {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
} | null;

export interface FetchPostType {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ComponentPostType {
  id: string;
  userEmail: string;
  createdAt: string;
  title: string;
  text: string;
  tags: string[];
  views: number;
}
