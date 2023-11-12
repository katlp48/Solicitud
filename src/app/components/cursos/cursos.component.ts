import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { User } from './../../models/user';
import {CursoService} from './../../services/curso.service';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute} from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  curso!: Curso[];
  user!:any;
  userId:any;
  cursoId:any;
  snackBar: any;
  // isReadMore: boolean=false;
  data!: string;
  public searchText!:string;
  Title='';
  searchKey:string="";
  
  constructor(public route:ActivatedRoute,
    private cursoService:CursoService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id4');
    this.getCurso();
/*     this.checkDataLength(this.data); */
  this.cursoService.search.subscribe((val:any)=>{
  this.searchKey=val;

})
  }

  getCurso(){
    this.cursoService.getCurso().subscribe((data:Curso[])=>{
      this.curso= data;
    })
  }
  deleteCurso(id: number) {
    this.cursoService.deleteCurso(id).subscribe(() => {
      this.curso = this.curso.filter((e: Curso) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('El curso fue eliminado con exito!', '', {
        duration: 6000,
      });
    });
  }

    processCursoResponse(resp: any) {
      const dateCurso: Curso[] = [];
  
      
      this.data
   
    }
    selectCurso(curso) {
      console.log(`The selected beca is::  ${curso.title}`);
    }
    search(event:any){
      this.searchText=(event.target as HTMLInputElement).value;
      console.log(this.searchText);
      this.cursoService.search.next(this.searchText);
  }
  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  exportExcel() {
    this.cursoService.exportCurso().subscribe(
      (data: any) => {
        let file = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        let fileUrl = URL.createObjectURL(file);
        var anchor = document.createElement('a');
        anchor.download = 'cursos.xlsx';
        anchor.href = fileUrl;
        anchor.click();

        this.openSnackBar('Archivo exportado correctamente', 'Exitosa');
      },
      (error: any) => {
        this.openSnackBar('No se pudo exportar el archivo', 'Error');
      }
    );
  }
  }

