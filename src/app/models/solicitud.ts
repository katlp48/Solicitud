import { Profile } from "./profile";

export interface Solicitud{
    id:number;
    user:Profile;
    tipomoneda:string;
    v:number;
    ci:number;
    cf:number;
    frecuencia: string;
    fechaci:Date;
    tipotasa:string;
    periodotasa:string;
    valortasa:number;
    capitalizacion:string;
    plazo: number;
    periodogracia:string;
    cantperiodo:number;
    tasaefectiva: number;
}