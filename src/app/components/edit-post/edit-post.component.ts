import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  userId: any;
  idPost: any;
  idUser: any; 
  // agregando
  post: Post = {} as Post;
  postForm!: UntypedFormGroup;
  tagField = new UntypedFormControl();
  tagList!: string[];
  lista: string = "";

  constructor(private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    const variable1 = this.route.snapshot.paramMap.get('user');
    this.userId = variable1;
    console.log("edit-post user: " + variable1);
    const variable = this.route.snapshot.paramMap.get('id5');
    this.idPost = variable;
    console.log("edit-post post: " + variable);


    this.postService.getPostId(this.idPost).subscribe((data) => {
      this.post = data;
      this.tagList = this.post.tagList.split(',');
      this.postForm = this.fb.group({
        title: [this.post.title, [Validators.required, Validators.maxLength(100)]],
        description: [this.post.description, [Validators.required]],
        body: [this.post.body, [Validators.required, , Validators.maxLength(1200)]],
      });
    });

  }

  submitForm() {

    this.stringArrayTOString(this.tagList);
    const post: Post = {
      id: this.idPost,
      slug: this.post.slug,
      title: this.postForm.get('title')!.value,
      description: this.postForm.get('description')!.value,
      body: this.postForm.get('body')!.value,
      tagList: this.lista,
      createdAt: this.post.createdAt,
      updatedAt: new Date().toISOString(),
      favorite: this.post.favorite,
      favoritesCount: this.post.favoritesCount,
      author: this.post.author,
      published: this.post.published
    }
    this.postService.updatePost(this.idPost, post).subscribe({
      next: (data) => {
        this.snackBar.open('El post fue actualizado con exito!', '', {
          duration: 3000,
        });
        this.postForm.reset();
        this.tagField.reset();

        this.router.navigate(['/homePage',this.userId, 'foro',this.userId]);
      },
      error: (err) => {
        console.log(err);
      }
    });


  }


  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.tagList.indexOf(tag) < 0) {
      this.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }
  removeTag(tagName: string) {
    this.tagList = this.tagList.filter(tag => tag !== tagName);
  }

  stringArrayTOString(listaTags: string[]): void {
    this.lista = this.tagList.toString();
  }
}
