import { Etiqueta } from './../models/etiqueta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  basePath:string=environment.api_url;
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Etiqueta[]>(`${this.basePath}/etiquetas`);
  }
  addTag(tag: Etiqueta) {
    return this.http.post<Etiqueta>(
      `${this.basePath}/etiquetas`,
      tag
    );  
  }

}
