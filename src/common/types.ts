export type UserType = {
  _id: string;
  email: string;
} | null;

export interface PostType {
  id: string;
  userEmail: string;
  createdAt: string;
  title: string;
  text: string;
  tags: string[];
  views: number;
  onRemovePost: (postToRemoveId: string) => void;
}
