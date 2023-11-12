import { UserService } from './../../services/user.service';
import { ComentarioService } from '../../services/comentario.service';
import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/comment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  @Input() comentario!:Comentario;
  @Input() userId:any;
  idPost:any;
  canModify: boolean = false;
  nombre: any;
  comentD!: Comentario[];
  campo: boolean = false;
  myForm !: FormGroup;
  imgfile: any;
  constructor(private comentarioService: ComentarioService,
    private profileService: ProfileService,  private fb:FormBuilder,
    private snackBar: MatSnackBar) {
      
     }

  ngOnInit(): void {
    this.profileService.getProfileId(this.userId).subscribe(
      (data) => {
        this.canModify = (this.comentario.autor.id === data.id);
      }
    );
    
    this.myForm = this.fb.group({
      body: [this.comentario.body,[Validators.required]]
    });

    this.comentarioService.getAll().subscribe((data) => { this.comentD = data;});
   
    this.profileService.getProfileId(this.comentario.autor.id).subscribe(
      (data) => {
        this.nombre = data.name + " " + data.lastName;
        this.imgfile = 'data:image/jpeg;base64,' + data.picture;
      }
    );
   
  }
  evaluarCampo()
  {
    if (this.campo == true)
    {
      //Ocultamos el campo
      this.campo = false;
    }
    else
    {
      //Dado que es verdadero, quiere decir que debemos mostrar el campo de texto
      this.campo = true;
    }
  }

  
  deleteComentario(id:number) {

    this.comentarioService.delete(id).subscribe(() => {
      this.comentD = this.comentD.filter((e:Comentario) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('Se elimino el comentario!', '', {
        duration: 6000,
      });
    });
    this.ngOnInit();
    window.location.reload();

  }

  editarComentario(){
    console.log("Comentario id: " + this.comentario.id);
    console.log("Comentario id: " + this.myForm.get('body')!.value);
    const comentario: Comentario= {
      id: this.comentario.id,
      body: this.myForm.get('body')!.value,
      post:this.comentario.post,
      createdAt: new Date().toISOString(),
      autor:this.comentario.autor
    }
    this.comentarioService.editComentario(this.comentario.id, comentario).subscribe({
      next: (data) => {
        this.evaluarCampo();
        this.snackBar.open('Actualización de comentario exitosa!', '', {
          duration: 3000,
        });

      },
      error: (err) => {
        this.snackBar.open('Error!', '', {
          duration: 3000,
        });
        console.log(err);
      },
    });
    
    this.ngOnInit();
    window.location.reload();
  }
}
