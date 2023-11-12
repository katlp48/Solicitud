import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cursos-detalle',
  templateUrl: './cursos-detalle.component.html',
  styleUrls: ['./cursos-detalle.component.css']
})
export class CursosDetalleComponent implements OnInit {

  
  curso!:Curso;
  userId:any;
  idCurso:any;
  
  canModify!: boolean;

  lista: string[] | undefined;

  constructor(private cursoService: CursoService, private router: Router,
    private route: ActivatedRoute) { 
    }

  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('user');
    this.idCurso= this.route.snapshot.paramMap.get('curso');

    console.log("detalle-curso Curso: "+ this.idCurso);

    this.cursoService.getCursoId(this.idCurso).subscribe((data)=>{
      this.curso =data;
      this.curso.title = data.title;
      this.curso.description = data.description;
      this.curso.cost = data.cost;
     
    });

  
  //   this.lista = this.post.tagList.split(",");
  

}
}
