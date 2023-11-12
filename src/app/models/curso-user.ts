import { Curso } from "./curso";
import { User } from "./user";

export interface CursoUser{
    id:number;
    curso:Curso;
    user:User;
    progreso:number;
    subscrito:boolean;
}