import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';
import { Comentario } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  basePath:string=environment.api_url;
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Comentario[]>(`${this.basePath}/comentarios`);
  }

  add(comment: Comentario) {
    return this.http.post<Comentario>(
      `${this.basePath}/comentarios`,
      comment
    );  
  }
  commentsbyPost(id:any){
    return this.http.get<Comentario[]>(`${this.basePath}/posts/${id}/comentarios`);
  }
  delete(id:any){
    return this.http.delete<Comentario>(`${this.basePath}/comentarios/${id}`);
  }
  editComentario(id:any,comentario:Comentario){
    return this.http.put<Comentario>(`${this.basePath}/comentarios/${id}`, comentario);
  }
}