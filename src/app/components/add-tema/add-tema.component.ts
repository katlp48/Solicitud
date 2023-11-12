import { CursoService } from './../../services/curso.service';
import { AbstractType, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { Tema } from 'src/app/models/tema';
import { TemaService } from 'src/app/services/tema.service';

@Component({
  selector: 'app-add-tema',
  templateUrl: './add-tema.component.html',
  styleUrls: ['./add-tema.component.css']
})
export class AddTemaComponent implements OnInit {
  tema!:Tema;
  cursoC!: Curso;
  curso!:Curso;
  temaId!:any;
  myForm!: FormGroup;
  cursoId!: any;
  userId!:any;
  constructor( private fb: FormBuilder,
    private temaService: TemaService,
    private snackBar: MatSnackBar,
    private router: Router,
    public route:ActivatedRoute,
    private cursoService: CursoService,
) { }

  ngOnInit(): void {
    this.cursoId = this.route.snapshot.paramMap.get('curso');
    this.temaId = this.route.snapshot.paramMap.get('tema');
    this.reactiveForm();

    this.cursoService.getCursoId(this.cursoId).subscribe((data)=>
    {this.cursoC = data;});
  }
  
  reactiveForm(){
    this.myForm = this.fb.group({
      id:[''],
      position:[''],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description:['', [Validators.required, Validators.maxLength(400)]],
      body: ['', [Validators.required, Validators.maxLength(1200)]],
      video: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }
  saveTema(): void {
    const userId = this.route.snapshot.paramMap.get('user');

 
    const tema: Tema= {
      id: 0,
      title: this.myForm.get('title')!.value,
      position: this.myForm.get('position')!.value,
      description: this.myForm.get('description')!.value,
      body: this.myForm.get('body')!.value,
      video: this.myForm.get('video')!.value,
      curso: this.cursoC,
    };
    this.temaService.addTema(tema).subscribe({
      next: (data) => {
        this.snackBar.open('El tema fue registrado con exito!', '', {
          duration: 3000,
        });
        this.router.navigate(['/homePage',userId,'cursos',userId,'detalle',this.cursoId]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
