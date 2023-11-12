import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from './../../services/curso.service';
import { Curso } from 'src/app/models/curso';
@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.css']
})
export class EditCursoComponent implements OnInit {

  cursos:Curso[]=[];
  myForm!: FormGroup;
  curso!: Curso;
  idCurso: any;
  idUser:any;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private snackBar: MatSnackBar,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const variable2 = this.route.snapshot.paramMap.get('id4');
    this.idUser = variable2;
    
    const variable = this.route.snapshot.paramMap.get('curso');
    this.idCurso= variable;

    this.cursoService.getCursoId(this.idCurso).subscribe((data) => {
      this.curso = data;
      this.myForm = this.fb.group({
        name: [this.curso.title,[Validators.required, Validators.maxLength(60)]],
        description: [this.curso.description],
        finished:false,
        cost:this.curso.cost
      });
    })
  }

  
  updateCurso() {
    const variable = this.route.snapshot.paramMap.get('id4');
    const curso: Curso = {
      id: this.idCurso,
      title: this.myForm.get('name')!.value,
      description: this.myForm.get('description')!.value,
      finished:false,
      cost:this.myForm.get('cost')!.value
    };
    this.cursoService
      .updateCurso(this.idCurso, curso)
      .subscribe({
        next: (data) => {
          this.snackBar.open('El curso fue actualizado con exito!', '', {
            duration: 6000,
          });
          this.router.navigate(['/homePage',variable,'cursos',variable]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
