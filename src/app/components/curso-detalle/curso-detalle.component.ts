import { AvisoService } from './../../services/aviso.service';
import { ProfileService } from 'src/app/services/profile.service';
import { DialogOverviewComponent } from './../dialog-overview/dialog-overview.component';
import { UserService } from 'src/app/services/user.service';
import { CursoService } from 'src/app/services/curso.service';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursoUser } from 'src/app/models/curso-user';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tema } from 'src/app/models/tema';
import { TemaService } from 'src/app/services/tema.service';
import { Aviso } from 'src/app/models/aviso';

export interface DialogData {
  id: number;
  name: string;
}
@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css']
})
export class CursoDetalleComponent implements OnInit {
  curso!: Curso;
  objeto!: CursoUser;

  userId: any;
  idCurso: any;

  isPremium!: boolean;
  isSubscrito!: boolean;
  premiNosubs!:boolean;
  name!: string;
  user!: User;

  constructor(private cursoService: CursoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private temaService: TemaService,
    private route: ActivatedRoute, private userService: UserService,
    public dialog: MatDialog, private profileService: ProfileService,
    private avisoService: AvisoService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('user');
    this.idCurso = this.route.snapshot.paramMap.get('curso');
    console.log("Curso: " + this.idCurso);

    this.cursoService.getCursoId(this.idCurso).subscribe((data) => {
      this.curso = data;
      this.curso.title = data.title;
      this.curso.description = data.description;
      this.curso.finished = data.finished;
      this.curso.cost = data.cost;
    });
    this.profileService.getProfileId(this.userId).subscribe((data) => {
      this.name = data.name;
    })
    this.cursoService.getCursoAlumno(this.idCurso, this.userId).subscribe(
      (data) => {
        this.objeto = data;
      }
    );
    this.validarPremium();
  }

  validarPremium() {
    this.userService.getUserId(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.isPremium = (data.role.roleUser === 'Premium');
      }
    );

    console.log("es premium: " + this.isPremium)
    console.log("Subcrito " + this.isSubscrito)
  }


  incripcion() {

    if (this.isSubscrito === false) {
      const cursoUser: CursoUser = {
        id: 0,
        curso: this.curso,
        user: this.user,
        progreso: 0,
        subscrito: true
      }
      this.cursoService.addCursoAlumno(cursoUser).subscribe({
        next: (data) => {
          this.snackBar.open('El alumno fue registrado en el curso con exito!', '', {
            duration: 3000,
          });

        },
        error: (err) => {
          this.snackBar.open('No se logro añadir!', '', {
            duration: 3000,
          });
          console.log(err);
        },
      });

      //AVISO

      const aviso: Aviso = {
        id: 0,
        type: 'personal',
        title: 'inscripcion',
        description: 'Se inscribio al curso ' + this.curso.title + '. Desarrolle los temas propuestos y mejore su aprendizaje!',
        created: new Date().toISOString(),
        user: this.userId
      };
      this.avisoService.addAviso(aviso).subscribe({
        next: (data) => {
          this.snackBar.open('Nuevo aviso!', '', {
            duration: 3000,
          });
          this.router.navigate(['/homePage', this.userId, 'cursos', this.userId]);
        },
        error: (err) => {
          console.log(err);
        },
      });

      this.isSubscrito = true;
    }
    else {
      this.snackBar.open('Ya se subscribio a este curso!', '', {
        duration: 3000,
      });
    }
     

  }


  openDialog(): void {
    this.validarPremium();
    if (!this.isPremium) {
      const dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: { name: this.name, id: this.userId }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    else{
      this.incripcion();
    }

  }

}

