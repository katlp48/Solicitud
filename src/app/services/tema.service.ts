import { Tema } from './../models/tema';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  basePath2:string=environment.api_url;
  constructor(private http: HttpClient) {
   }

   getTemas() {
    return this.http.get<Tema[]>(`${this.basePath2}/temas`);
  }

  getTemaId(id:any){
    return this.http.get<Tema>(`${this.basePath2}/temas/${id}`);
  }
  addTema(tema: Tema) {
    return this.http.post<Tema>(
      `${this.basePath2}/temas`,
      tema
    );  
  }
  updateTema(id: any, tema: Tema) {
    return this.http.put<Tema>(`${this.basePath2}/temas/${id}`, tema);
  }
  deleteTema(id: any) {
    return this.http.delete<Tema>(`${this.basePath2}/temas/${id}`);
  }
  temasByCurso(id:any){
    return this.http.get<Tema[]>(`${this.basePath2}/cursos/${id}/temas`);
  }
  editTema(id: any, tema: Tema) {
    return this.http.put<Tema>(`${this.basePath2}/temas/${id}`, tema);
  }
}
