import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { Tema } from 'src/app/models/tema';
import { CursoService } from 'src/app/services/curso.service';
import { TemaService } from 'src/app/services/tema.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-curso-temas',
  templateUrl: './curso-temas.component.html',
  styleUrls: ['./curso-temas.component.css']
})
export class CursoTemasComponent implements OnInit {
  temas!:Tema[];
  curso!:Curso;
  userId:any;
  tema!:Tema;
  idCurso:any;
  snackBar: any;


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

introduccion!:Tema;
tema1!:Tema;
tema2!:Tema;


  constructor(private cursoService:CursoService,
    private router:Router,
    private route:ActivatedRoute,
    private temaService:TemaService,
    private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {

      this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

     }

    ngOnInit(): void {
      this.userId=this.route.snapshot.paramMap.get('user');
      this.idCurso=this.route.snapshot.paramMap.get('curso');
      console.log("Curso: "+ this.idCurso);
  
      this.cursoService.getCursoId(this.idCurso).subscribe((data)=>{
        this.curso =data;
        this.curso.title=data.title;
        this.curso.description=data.description;
        this.curso.finished=data.finished;
        this.curso.cost=data.cost;
      });

      this.temaService.temasByCurso(this.idCurso).subscribe((data) =>{
        this.temas = data;
      });
      this.temaService.getTemaId(1).subscribe((data) =>{
        this.introduccion  = data;
      });
      this.temaService.getTemaId(2).subscribe((data) =>{
        this.tema1  = data;
      });
      this.temaService.getTemaId(3).subscribe((data) =>{
        this.tema2 = data;
      });
    }
    deleteTema(id: number) {
      this.temaService.deleteTema(id).subscribe(() => {
        this.temas = this.temas.filter((e: Tema) => {
          return e.id !== id ? e : false;
        });
        this.snackBar.open('La beca fue eliminada con exito!', '', {
          duration: 6000,
        });
      });
    }
}
