import { DetalleBeca } from './../models/detalle-beca';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleBecaService {

  detalles: DetalleBeca[] = [
    {
      name:'Beca 18',
      benefits: 'Estudios gratis',
      description: 'Be happy',
      requirements:'Aprobar el examen',
      telephone: '99999999',
      urlpage:'pronabec.com',
    },
    {
      name:'Beca 19',
      benefits: 'Estudios gratis',
      description: 'Be happy',
      requirements:'Aprobar el examen',
      telephone: '99999999',
      urlpage:'pronabec.com',
    },
    {
      name:'Beca 20',
      benefits: 'Estudios gratis',
      description: 'Be happy',
      requirements:'Aprobar el examen',
      telephone: '99999999',
      urlpage:'pronabec.com',
    }
  ]
  
  constructor() { }
  public getDetalleBeca(){
    return this.detalles.slice();
  }
  public addDetallaBeca(detalleBeca:DetalleBeca){
    this.detalles.unshift(detalleBeca);
  }
}
