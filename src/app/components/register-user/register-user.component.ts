import { Role } from './../../models/role';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{
  myForm !: FormGroup;
  user!:User;
  userId!: number;
  email: any;
  password: any;
  username: any;
  usu !: User;
  registro:boolean = false;

  constructor( private fb:FormBuilder,
    private userService:UserService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private router:Router) {this.reactiveForm(); }

  ngOnInit(): void {

  }
  reactiveForm(){
    this.myForm = this.fb.group({
      id:[''],
      email:['',[Validators.required,Validators.email]],
      username:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
  saveUser():void{
    const rol:Role = { idRole: 1, roleUser:"Usuario"}

    const usuario: User = {
      id: 0,
      email: this.myForm.get('email')!.value,
      username: this.myForm.get('username')!.value,
      password: this.myForm.get('password')!.value,
      role: rol
    }
    
    this.userService.addUser(usuario).subscribe({
      next: (data) => {
        this.registro = true;
        this.snackBar.open('El usuario fue registrado con exito!', '', {
          duration: 2000,
                  });
        this.router.navigate(['/register-profile']); 
      },
      error: (err) => {
        console.log(err);
      },
    });
  
}

}