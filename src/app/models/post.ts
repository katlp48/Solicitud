import { Profile } from "./profile";


export interface Post{
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string;
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
  favoritesCount: number;
  author: Profile;
  published:boolean;
}