import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Aviso } from '../models/aviso';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  basePath:string=environment.api_url;
  constructor(private http: HttpClient) { }

  getAvisos() {
    return this.http.get<Aviso[]>(`${this.basePath}/avisos`);
  }

  getAvisosdeUserId(id:any){
    return this.http.get<Aviso[]>(`${this.basePath}/users/${id}/avisos`);
  }

  addAviso(aviso: Aviso) {
    return this.http.post<Aviso>(
      `${this.basePath}/avisos`,
      aviso
    );  
  }
  
}
