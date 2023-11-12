/*export interface User{
    id: number;
    name:string;
    lastname:string;
    phone:string;
    grade:string;
    email:string;
    username:string;
    password:string;
}*/

import { Role } from "./role";

export interface User{
    id: number;
    email:string;
    password:string;
    username:string;
    role: Role;
}