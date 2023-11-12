import { Curso } from './../../models/curso';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from 'src/app/services/curso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {

  myForm!: FormGroup;
  userId:any;

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private snackBar: MatSnackBar,
    private router: Router,
    public route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id4');
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(60)]],
      description: [''],
      finished:false,
      cost:['']
    });
  }

  saveCurso(): void {
    const userId = this.route.snapshot.paramMap.get('id4');
    const curso: Curso= {
      id: 0,
      title: this.myForm.get('name')!.value,
      description: this.myForm.get('description')!.value,
      finished: false,
      cost: this.myForm.get('cost')!.value,
    };
    this.cursoService.addCurso(curso).subscribe({
      next: (data) => {
        this.snackBar.open('El curso fue registrado con exito!', '', {
          duration: 3000,
        });
        this.router.navigate(['/homePage',userId,'cursos',userId]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
