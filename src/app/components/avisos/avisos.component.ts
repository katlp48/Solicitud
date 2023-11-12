import { UserService } from './../../services/user.service';
import { CursoUser } from './../../models/curso-user';
import { CursoService } from 'src/app/services/curso.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Aviso } from 'src/app/models/aviso';
import { User } from 'src/app/models/user';
import { AvisoService } from 'src/app/services/aviso.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {
  cursoUser!: CursoUser;
  userId: any;
  results!: Aviso[];
  loading = false;
  user!: User;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private avisoService: AvisoService, private userService: UserService) { }

  ngOnInit(): void {
    const variable = this.route.snapshot.paramMap.get('user1');
    this.userId = variable;
    console.log("avisos:  " + variable);

    this.userService.getUserId(this.userId).subscribe((data) => {
      this.user = data
    });
    this.runQuery();

  }
  runQuery() {
    this.loading = true;
    this.results = []
    this.avisoService.getAvisosdeUserId(this.userId).subscribe(data => {
      this.loading = false;
      this.results = data;
    });
  }
}
