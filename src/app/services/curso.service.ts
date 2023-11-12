import { Curso } from 'src/app/models/curso';
import { CursoUser } from './../models/curso-user';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import{BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CursoService {
  basePath2:string=environment.api_url;
   public search= new BehaviorSubject<string>("");
   constructor(private http: HttpClient) {
    }
   getCurso() {
    return this.http.get<Curso[]>(`${this.basePath2}/cursos`);
  }
  getCursoId(id:any){
    return this.http.get<Curso>(`${this.basePath2}/cursos/${id}`);
  }
  addCurso(beca: Curso) {
    return this.http.post<Curso>(
      `${this.basePath2}/cursos`,
      beca
    );  
  }
  updateCurso(id: any, curso: Curso) {
    return this.http.put<Curso>(`${this.basePath2}/cursos/${id}`, curso);
  }
  deleteCurso(id: any) {
    return this.http.delete<Curso>(`${this.basePath2}/cursos/${id}`);
  }
  getCursoByName(name: any) {
    const endpoint = `${this.basePath2}/cursos/filter/${name}`;
    return this.http.get<Curso>(endpoint);
  }
  addCursoAlumno(cursoUser:CursoUser) {
    return this.http.post<CursoUser>(`${this.basePath2}/cursos-users`, cursoUser);
  }
  getCursoAlumno(id1:any, id2:any) {
    return this.http.get<CursoUser>(`${this.basePath2}/cursos/${id1}/users/${id2}`);
  }
  exportCurso() {
    const endpoint = `${this.basePath2}/cursos/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob',
    });
  }
}