import { environment } from './../../../environments/environment';
import { User } from './../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ReadVarExpr } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  myForm!: FormGroup;
  user!: User;
  profile !: Profile;
  idUser: any;

  selectedFile: any;
  nameImg: string = '';
  public imgfiles: any = [];
  public previewImg!: string;
  imgfile: any ;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const variable = this.route.snapshot.paramMap.get('id');
    this.idUser = variable;

    this.profileService.getProfileId(this.idUser)
    .subscribe((data) => {
      this.profile = data;
      this.user = this.profile.user;
      this.myForm = this.fb.group({
        name: [this.profile.name,[Validators.required,Validators.maxLength(20)]],
        lastName: [this.profile.lastName,[Validators.required,Validators.maxLength(20) ]],
        phone:[this.profile.phone,[Validators.required, Validators.maxLength(9)]],
        grade: [this.profile.grade,[Validators.required,Validators.maxLength(30)]],
        email:[this.user.email,[Validators.required,Validators.email]],
        password:[this.user.password,[Validators.required]],
        username:[this.user.username,[Validators.required]],
        img:[this.profile.picture,[Validators.required]],
      });
      this.imgfile = 'data:image/jpeg;base64,' + this.profile.picture;
  
    })
        
  }

  updateUser() {
    const variable = this.route.snapshot.paramMap.get('id');
    const usuario: User = {
      id: this.idUser,
      email: this.myForm.get('email')!.value,
      username: this.myForm.get('username')!.value,
      password: this.myForm.get('password')!.value,
      role: this.user.role
    }
    const perfil: Profile = {
      id: this.idUser,
      user: this.user,
      name: this.myForm.get('name')!.value,
      lastName: this.myForm.get('lastName')!.value,
      phone: this.myForm.get('phone')!.value,
      grade: this.myForm.get('grade')!.value,
      picture:this.selectedFile,
    };
    const uploadImageData = new FormData();
        uploadImageData.append('picture', perfil.picture, perfil.picture.name);
        uploadImageData.append('userId', perfil.id.toString());
        uploadImageData.append('name', perfil.name);
        uploadImageData.append('lastname', perfil.lastName);
        uploadImageData.append('phone', perfil.phone);
        uploadImageData.append('grade', perfil.grade);

    this.userService.updateUser(this.idUser, usuario).subscribe({
      next: (data) => {
        this.snackBar.open('Actualización de usuario exitosa!', '', {
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
    
    this.profileService.updateProfile(this.idUser, uploadImageData).subscribe({
      next: (data) => {
        this.snackBar.open('Actualización del perfil exitoso!', '', {
          duration: 3000,
        });
        this.router.navigate(['/homePage',variable]);
      },
      error: (err) => {
        this.snackBar.open('Error!', '', {
          duration: 3000,
        });
        console.log(err);
      },
    });
  }
  cancelUser() {
    const variable = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/homePage',variable]);
  }
  captureFile(event): any{
    const catchedFile = event.target.files[0];
    this.getBase64(catchedFile).then((imagen: any)=>{
      this.previewImg=imagen.base; 
      console.log(imagen);
    })
  }
  getBase64 = async($event: any)=> new Promise((resolve)=>{
    try{
      const unsafeImg= window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error=>{
        resolve({
          base:null
        });
      };  
    }catch(e){
      return null;
    }
  })
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.nameImg = event.target.files[0].name;
  }
}