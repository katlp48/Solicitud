import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Role } from '../models/role';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  basePath:string=environment.api_url;
  constructor(private http: HttpClient) { }
  getRolId(id:any){
    return this.http.get<Role>(`${this.basePath}/roles/${id}`);
  }
  addRol(role: Role) {
    return this.http.post<Role>(
      `${this.basePath}/roles`,
      role
    );  
  }
}
