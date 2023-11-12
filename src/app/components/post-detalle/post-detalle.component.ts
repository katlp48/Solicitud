import { ComentarioService } from './../../services/comentario.service';
import { Profile } from './../../models/profile';
import { Post } from './../../models/post';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post.service';
import { Comentario } from 'src/app/models/comment';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-post-detalle',
  templateUrl: './post-detalle.component.html',
  styleUrls: ['./post-detalle.component.css']
})
export class PostDetalleComponent implements OnInit {

  post!:Post;
  postD!: Post[];
  userId:any;
  idPost:any;
  currentUser!: User;
 
  comments!: Comentario[];

  commentControl = new UntypedFormControl();
  isSubmitting = false;
  isDeleting = false;

  lista: string[] | undefined;

  commentForm: UntypedFormGroup;
  currentProfile!: Profile;

  comentD!: Comentario[];

  canModify: boolean = false;
  detalle:boolean = true
  contador:any;

  constructor(private postService: PostService, private router: Router,
    private route: ActivatedRoute, private comentarioService: ComentarioService,
    private userService:UserService,private fb: UntypedFormBuilder,
    private profileService: ProfileService,private snackBar: MatSnackBar) { 

    this.commentForm = this.fb.group({
      body: ['', [Validators.required]],
    });

  }


  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('user');
    this.idPost= this.route.snapshot.paramMap.get('post');

    console.log("detalle-post USER: " + this.userId);
    console.log("detalle-post POST: " + this.idPost);

    this.postService.getPostId(this.idPost).subscribe((data)=>{
      this.post = data;
      this.post.title = data.title;
      this.post.body = data.body;
      this.post.author = data.author;
      this.contador = data.favoritesCount;
      this.lista = this.post.tagList.split(",");
    });
    this.profileService.getProfileId(this.userId).subscribe(
      (data) => {
        this.canModify = (this.post.author.id === data.id);
      }
    );
    this.userService.getUserId(this.userId).subscribe((data)=>
    {this.currentUser = data;}
    )

    this.profileService.getProfileId(this.userId).subscribe((data)=>
    { this.currentProfile = data; });

    this.postService.getPosts().subscribe((data)=>
    {this.postD = data;}
    );
    this.comentarioService.getAll().subscribe((data) => { this.comentD = data;});
    this.comentarioService.commentsbyPost(this.idPost).subscribe((data) =>{
      this.comments = data;
    })
  }


  onToggleFavorite(favorited: boolean) {
    this.post['favorite'] = favorited;

    if (favorited) {

      this.postService.favoriteUpdate(this.post.id, this.contador + 1).subscribe({
        next: (data) => {},
        error: (err) => {
         console.log(err);
        },
      });
      this.contador++;
    } 
    else {
      this.postService.favoriteUpdate(this.post.id, this.contador - 1).subscribe({
        next: (data) => {},
        error: (err) => {
         console.log(err);
        },
      });
      this.contador--;
    }

  }
  addComment() {
    const variable = this.route.snapshot.paramMap.get('id2');
    const comment:Comentario = {
      id: 0,
      body: this.commentForm.get('body')!.value,
      createdAt: new Date().toISOString(),
      autor: this.currentProfile,
      post: this.post,
    }
    console.log(this.userId);

    this.comentarioService.add(comment).subscribe({
      next: (data) => {
        this.snackBar.open('El comentario fue registrado con exito!', '', {
          duration: 3000,
        });
        this.commentForm.reset();
        this.ngOnInit();       
      },
      error: (err) => {
        this.snackBar.open('No se logro añadir!', '', {
          duration: 3000,
        });
        console.log(err);
      }
    });;
    window.location.reload();
  }

  deletePost(id: number) {

    for(let comment of this.comments){
      this.comentarioService.delete(comment.id).subscribe(() => {
        this.comentD = this.comentD.filter((e:Comentario) => {
          return e.id !== comment.id ? e : false;
        });
      });

    }

    this.snackBar.open('Se elimino los comentarios del post', '', {
      duration: 6000,
    });

    this.postService.deletePost(id).subscribe(() => {
      this.postD = this.postD.filter((e: Post) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('El post fue eliminado con exito!', '', {
        duration: 6000,
      });
 
    });
    this.router.navigate(['/homePage',this.userId, 'foro',this.userId]);
  }

}
