import { ProfileService } from './../../services/profile.service';
import { Profile } from './../../models/profile';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/user';
import { __values } from 'tslib';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {
  idUser: any;
  userId:any;
  post: Post = {} as Post;
  postForm: UntypedFormGroup;
  tagField = new UntypedFormControl();
  user!: User;
  usr!:User;
  tagList!: string[];
  lista: string = "";
  profile!: Profile;

  constructor( private postService: PostService,private userService:UserService,
    private profileService:ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar) { 

  this.postForm = this.fb.group({
    id:[''],
    title: ['',[Validators.required, Validators.maxLength(100)]],
    description: ['',[Validators.required]],
    body: ['',[Validators.required, Validators.maxLength(1200)]],
    tagList: [''],
  });
  this.tagList = []
}
  ngOnInit(): void {
    const variable = this.route.snapshot.paramMap.get('id2');
    this.idUser = variable;
    console.log("new-post "+ variable);
    this.userId = this.route.snapshot.paramMap.get('user');
     
    this.profileService.getProfileId(this.idUser).subscribe((data)=>
    {this.profile = data;});
  }

  addTag(){
    // retrieve tag control
    const tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.tagList.indexOf(tag) < 0) {
    this.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }
  removeTag(tagName: string){
    this.tagList = this.tagList.filter(tag => tag !== tagName);
  }
  submitForm(){
    const variable = this.route.snapshot.paramMap.get('id2');
    this.stringArrayTOString(this.tagList);
    const post:Post = {
      id: 0,
      slug: this.postForm.get('title')!.value + "-" + Math.floor(Math.random() * 1000) + 1,
      title: this.postForm.get('title')!.value,
      description: this.postForm.get('description')!.value,
      body: this.postForm.get('body')!.value,
      tagList: this.lista,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorite: false,
      favoritesCount: 0,
      author: this.profile,
      published: true,
    }
    
    this.postService.addPost(post).subscribe({
      next: (data) => {
        this.snackBar.open('El post fue registrado con exito!', '', {
          duration: 3000,
        });
        this.postForm.reset();
        this.tagField.reset();

      },
      error: (err) => {
        this.snackBar.open('No se logro añadir!', '', {
          duration: 3000,
        });
        console.log(err);
      },
    });;
    
  
  }

  stringArrayTOString(listaTags:string[]) : void{
    this.lista = this.tagList.toString();
  }

}
