import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { Tema } from 'src/app/models/tema';
import { TemaService } from 'src/app/services/tema.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {
  @Input() curso!:Curso;
  
  temas:Tema[]=[];
  userId: any;
  
  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private temaService:TemaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('user');
    this.temaService.temasByCurso(this.curso.id).subscribe((data:Tema[]) =>{
      this.temas = data;
    });
  }
  deleteTema(id: number) {
    this.temaService.deleteTema(id).subscribe(() => {
      this.temas = this.temas.filter((e: Tema) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('El tema fue eliminado con exito!', '', {
        duration: 6000,
      });
    });
  }

}
