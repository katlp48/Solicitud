import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import{BehaviorSubject} from 'rxjs';
import { Solicitud } from '../models/solicitud';
@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  basePath:string=environment.api_url;
  constructor(private http: HttpClient) { }

  addSolicitud(solicitud: Solicitud) {
    return this.http.post<Solicitud>(
      `${this.basePath}/solicitudes`,
      solicitud
    );  
  }
  getSolictud() {
    return this.http.get<Solicitud[]>(`${this.basePath}/solicitudes`);
  }
  getSolicitudId(id:any){
    return this.http.get<Solicitud>(`${this.basePath}/solicitudes/${id}`);
  }
}
