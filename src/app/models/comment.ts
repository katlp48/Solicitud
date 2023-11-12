import { Post } from "./post";
import { Profile } from "./profile";

export interface Comentario{    
    id: number;
    body:string;
    createdAt:string;
    autor: Profile; 
    post:Post;
}