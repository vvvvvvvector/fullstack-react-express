interface UserType {
  _id: string;
  email: string;
}

export interface FetchPostType {
  _id: string;
  user: UserType;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ComponentPostType {
  userEmail: string;
  createdAt: string;
  title: string;
  text: string;
  tags: string[];
  views: number;
}
