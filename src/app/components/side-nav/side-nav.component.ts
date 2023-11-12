import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { UserService } from './../../services/user.service';
import { environment } from './../../../environments/environment';
import { User } from './../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReadVarExpr, visitAll } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})

export class SideNavComponent implements OnInit {
  myForm!: FormGroup;
  user!: User;
  profile!:Profile;
  idUser: any;
  imgfile: any;

  
  nombreCompleto!: string;
  nombreUsu!: string;

  constructor(
    public route:ActivatedRoute, 
    private userService: UserService,
    private profileService: ProfileService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const variable = this.route.snapshot.paramMap.get('id');
    console.log("sidenav "+ variable)
    this.idUser = variable;
    this.profileService.getProfileId(this.idUser)
    .subscribe((data) => {
      this.profile = data;
      this.user = this.profile.user;
      this.nombreCompleto = this.profile.name + ' ' + this.profile.lastName;
      this.nombreUsu = this.user.username;
      this.imgfile = 'data:image/jpeg;base64,' + this.profile.picture;
    })   
  }
}
