import { Title } from '@angular/platform-browser';
import { AvisoService } from './../../services/aviso.service';
import { Beca } from './../../models/beca';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BecaService } from './../../services/beca.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Aviso } from 'src/app/models/aviso';

@Component({
  selector: 'app-add-beca',
  templateUrl: './add-beca.component.html',
  styleUrls: ['./add-beca.component.css']
})
export class AddBecaComponent implements OnInit {
  myForm!: FormGroup;
  userId:any;

  constructor(
    private fb: FormBuilder,
    private BecaService: BecaService,
    private snackBar: MatSnackBar,
    private router: Router,
    public route:ActivatedRoute,
    private avisoService: AvisoService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id3');
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.maxLength(60)]],
      imgUrl: ['', [Validators.required]],
      description: ['',[Validators.required]],
      requirements:['',[Validators.required]],
      telephone:['', [Validators.required]] ,
      urlpage:['', [Validators.required]] ,
      benefits:['', [Validators.required]]
    });
  }

  saveBeca(): void {
    const userId = this.route.snapshot.paramMap.get('id3');
    const beca: Beca= {
      id: 0,
      title: this.myForm.get('title')!.value,
      imgUrl: this.myForm.get('imgUrl')!.value,
      description: this.myForm.get('description')!.value,
      requisitos: this.myForm.get('requirements')!.value,
      telefono: this.myForm.get('telephone')!.value,
      urlPage: this.myForm.get('urlpage')!.value,
      beneficios:this.myForm.get('benefits')!.value,
      tagList: "-",
    };
    this.BecaService.addBeca(beca).subscribe({
      next: (data) => {
        this.snackBar.open('La beca fue registrada con exito!', '', {
          duration: 3000,
        });
        this.router.navigate(['/homePage',userId,'becas',userId]);
      },
      error: (err) => {
        console.log(err);
      },
    });

    const aviso: Aviso = {
      id: 0,
      type: 'general',
      title: 'beca',
      description: 'Se creo una nueva beca: ' + this.myForm.get('title')!.value + '. ¡Mírala en becas!' ,
      created: new Date().toISOString(),
      user: this.userId
      
    };
    this.avisoService.addAviso(aviso).subscribe({
      next: (data) => {
        this.snackBar.open('La beca fue registrada con exito!', '', {
          duration: 3000,
        });
        this.router.navigate(['/homePage',userId,'becas',userId]);
      },
      error: (err) => {
        console.log(err);
      },
    });

  }
}
