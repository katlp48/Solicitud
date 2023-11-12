import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BecaService } from './../../services/beca.service';
import { Beca } from 'src/app/models/beca';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-beca',
  templateUrl: './edit-beca.component.html',
  styleUrls: ['./edit-beca.component.css']
})
export class EditBecaComponent implements OnInit {
  becas:Beca[]=[];
  myForm!: FormGroup;
  beca!: Beca;
  idBeca: any;
  idUser:any;

  constructor(
    private fb: FormBuilder,
    private becaService: BecaService,
    private snackBar: MatSnackBar,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const variable1 = this.route.snapshot.paramMap.get('id3');
    this.idUser = variable1;
    
    const variable = this.route.snapshot.paramMap.get('beca');
    this.idBeca = variable;

    this.becaService.getBecaId(this.idBeca).subscribe((data) => {
      this.beca = data;
      this.myForm = this.fb.group({
        title: [this.beca.title,[Validators.required, Validators.maxLength(60)]],
        imgUrl: [this.beca.imgUrl, [Validators.required]],
        description: [this.beca.description],
        requirements: this.beca.requisitos,
        telephone: this.beca.telefono,
        urlPage: this.beca.urlPage,
        benefits:this.beca.beneficios,
        tagList:''
      });
    })
  }

  
  updateBeca() {
    const variable = this.route.snapshot.paramMap.get('id3');
    const beca: Beca = {
      id: this.idBeca,
      title: this.myForm.get('title')!.value,
      imgUrl: this.myForm.get('imgUrl')!.value,
      description: this.myForm.get('description')!.value,
      requisitos: this.myForm.get('requirements')!.value,
      telefono: this.myForm.get('telephone')!.value,
      urlPage: this.myForm.get('urlPage')!.value,
      beneficios:this.myForm.get('benefits')!.value,
      tagList:"",
    };
    this.becaService
      .updateBeca(this.idBeca, beca)
      .subscribe({
        next: (data) => {
          this.snackBar.open('La beca fue actualizada con exito!', '', {
            duration: 6000,
          });
          this.router.navigate(['/homePage',variable,'becas',variable]);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
