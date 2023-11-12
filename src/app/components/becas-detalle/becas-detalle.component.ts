import { DetalleBeca } from './../../models/detalle-beca';
import { DetalleBecaService } from './../../services/detalle-beca.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Beca } from 'src/app/models/beca';
import { BecaService } from 'src/app/services/beca.service';
@Component({
  selector: 'app-becas-detalle',
  templateUrl: './becas-detalle.component.html',
  styleUrls: ['./becas-detalle.component.css']
})
export class BecasDetalleComponent implements OnInit {
  
  beca!:Beca;
  userId:any;
  idBeca:any;
  
  canModify!: boolean;

  lista: string[] | undefined;

  constructor(private becaService: BecaService, private router: Router,
    private route: ActivatedRoute) { 
    }

  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('user');
    this.idBeca= this.route.snapshot.paramMap.get('beca');

    console.log("detalle-beca Beca: "+ this.idBeca);

    this.becaService.getBecaId(this.idBeca).subscribe((data)=>{
      this.beca =data;
      this.beca.title = data.title;
      this.beca.imgUrl = data.imgUrl;
      this.beca.description = data.description;
      this.beca.requisitos = data.requisitos;
      this.beca.telefono = data.telefono;
      this.beca.urlPage = data.urlPage;
      this.beca.beneficios = data.beneficios;
      this.beca.tagList = '';
    });

  
  //   this.lista = this.post.tagList.split(",");
  

}}
