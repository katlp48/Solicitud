import { UserService } from './../../services/user.service';
import { AvisoService } from './../../services/aviso.service';
import { Component, Input, OnInit } from '@angular/core';
import { Aviso } from 'src/app/models/aviso';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-aviso',
  templateUrl: './preview-aviso.component.html',
  styleUrls: ['./preview-aviso.component.css']
})
export class PreviewAvisoComponent implements OnInit {
  @Input() aviso!:Aviso;
  @Input() idUser!:number;
  variable:any;
  constructor(private router: Router,
    public route: ActivatedRoute, private avisoService: AvisoService,
    private userService:UserService) { }

  ngOnInit(): void {
    console.log("avisos: "+ this.aviso.user);

  
  }
  linkear(){
    if(this.aviso.type==='personal'){
      if(this.aviso.title === 'post'){
        this.router.navigate(['/homePage',this.idUser,'foro',this.idUser]);
      }
      else if(this.aviso.title === 'inscripcion'){
        this.router.navigate(['/homePage',this.idUser,'cursos',this.idUser]);
      }
    }
    else if(this.aviso.type==='general'){
      if(this.aviso.title === 'beca'){
        this.router.navigate(['/homePage',this.idUser,'becas',this.idUser]);
      }
      else if(this.aviso.title === 'curso'){
        this.router.navigate(['/homePage',this.idUser,'cursos',this.idUser]);
      }
    }
  }
}
