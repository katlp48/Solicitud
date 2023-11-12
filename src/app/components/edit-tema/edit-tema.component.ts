import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tema } from 'src/app/models/tema';
import { TemaService } from 'src/app/services/tema.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
@Component({
  selector: 'app-edit-tema',
  templateUrl: './edit-tema.component.html',
  styleUrls: ['./edit-tema.component.css']
})
export class EditTemaComponent implements OnInit {
  temas:Tema[]=[];
  myForm!: FormGroup;
  tema!: Tema;
  cursoC!: Curso;
  idTema: any;
  idUser:any;

  constructor(
    private fb: FormBuilder,
    private temaService: TemaService,
    private snackBar: MatSnackBar,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const variable1 = this.route.snapshot.paramMap.get('id5');
    this.idUser = variable1;
    
    const variable = this.route.snapshot.paramMap.get('tema');
    this.idTema = variable;

    this.temaService.getTemaId(this.idTema).subscribe((data) => {
      this.tema = data;
      this.myForm = this.fb.group({
        title: [this.tema.title,[Validators.required, Validators.maxLength(60)]],
        position: [this.tema.position],
        description: [this.tema.description,[Validators.required, Validators.maxLength(400)]],
        body: [this.tema.body,[Validators.required, Validators.maxLength(1200)]],
        video: [this.tema.video,[Validators.required, Validators.maxLength(1000)]]
      });
      this.tema.curso = data.curso;
    })
  }

  
  updateTema() {
    const variable = this.route.snapshot.paramMap.get('id5');
    const tema: Tema = {
      id: this.idTema,
      title: this.myForm.get('title')!.value,
      position: this.myForm.get('position')!.value,
      description: this.myForm.get('description')!.value,
      body: this.myForm.get('body')!.value,
      video: this.myForm.get('video')!.value,
      curso: this.tema.curso
      } 
 
    this.temaService.updateTema(this.idTema, tema)
      .subscribe({
        next: (data) => {
          this.snackBar.open('El tema fue actualizada con exito!', '', {
            duration: 6000,
          });
          this.router.navigate(['/homePage',this.idUser,'cursos',this.idUser,'detalle',this.tema.curso.id]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

