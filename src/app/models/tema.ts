import { Curso } from "./curso";

export interface Tema{
    id:number;
    title: string;
    position:number;
    description: string;
    body:string;
    video:string;
    curso:Curso;
    
  
}