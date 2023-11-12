import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { Solicitud } from 'src/app/models/solicitud';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UserService } from 'src/app/services/user.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-solicitud-crear',
  templateUrl: './solicitud-crear.component.html',
  styleUrls: ['./solicitud-crear.component.css']
})
export class SolicitudCrearComponent implements OnInit {
  myForm!: FormGroup;
  userId:any;
  idUser: any;
  profile!: Profile;
  tasaefectiva: number = 0;
  constructor(private sS:SolicitudService, private uS:UserService,private pS:ProfileService, private route: ActivatedRoute,
    private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    const variable = this.route.snapshot.paramMap.get('id5');
    this.idUser = variable;
    this.userId = this.route.snapshot.paramMap.get('user');
     
    this.pS.getProfileId(this.idUser).subscribe((data)=>
    {this.profile = data;});
    this.reactiveForm();
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      tipomoneda: ['', [Validators.required]],
      v: ['', [Validators.required]],
      ci: ['',[Validators.required]],
      cf:['',[Validators.required]],
      frecuencia:['', [Validators.required]] ,
      fechaci:['', [Validators.required]] ,
      tipotasa:['', [Validators.required]],
      periodotasa:['', [Validators.required]],
      valortasa:['', [Validators.required]],
      capitalizacion:['', [Validators.required]],
      plazo:['', [Validators.required]],
      periodogracia:['', [Validators.required]],
      cantperiodo:['', [Validators.required]]
    });
  }
  calcularTE():number{
    const frecuencia = this.myForm.get('frecuencia')!.value;
    const tasa=this.myForm.get('valortasa')!.value;
    const tipotasa=this.myForm.get('tipotasa')!.value;
    const periodotasa=this.myForm.get('periodotasa')!.value;
    const capitalizacion = this.myForm.get('capitalizacion')!.value;
    let n1: number =0;
    let n2: number = 0;
    let c: number=0;
    let tasaefectiva: number=0;
    const equivalencias: { [key: string]: number } = {
      Anual: 360,
      Semestral: 180,
      Trimestral: 90,
      Mensual: 30,
      Quincenal: 15,
      Diaria: 1
    };
    n2 = equivalencias[frecuencia] || 0;
    n1 = equivalencias[periodotasa] || 0;
    c = equivalencias[capitalizacion] || 0;
    let prueba:number=0
    if(tipotasa=="Efectiva"){
      tasaefectiva=(((1+tasa/100)**(n2/n1)) - 1)*100
    }
    if(tipotasa=="Nominal"){
      n1=n1/c
      n2=n2/c
      tasaefectiva=(((1+(tasa/(n1*100)))**n2)-1)*100
    }
    return tasaefectiva;
  }
  saveSolicitud(): void {
    const userId = this.route.snapshot.paramMap.get('id5');
    this.tasaefectiva=this.calcularTE();
    const solicitud: Solicitud= {
      id: 0,
      user: this.profile,
      tipomoneda: this.myForm.get('tipomoneda')!.value,
      v: this.myForm.get('v')!.value,
      ci: this.myForm.get('ci')!.value,
      cf: this.myForm.get('cf')!.value,
      frecuencia: this.myForm.get('frecuencia')!.value,
      fechaci: this.myForm.get('fechaci')!.value,
      tipotasa: this.myForm.get('tipotasa')!.value,
      periodotasa: this.myForm.get('periodotasa')!.value,
      valortasa: this.myForm.get('valortasa')!.value,
      capitalizacion: this.myForm.get('capitalizacion')!.value,
      plazo: this.myForm.get('plazo')!.value,
      periodogracia: this.myForm.get('periodogracia')!.value,
      cantperiodo: this.myForm.get('cantperiodo')!.value,
      tasaefectiva:this.tasaefectiva
    };
    this.sS.addSolicitud(solicitud).subscribe({
      next: (data) => {
        this.router.navigate(['/homePage',userId,'becas',userId]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
