import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-preview-post',
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.css']
})
export class PreviewPostComponent implements OnInit {
  @Input() post!:Post;
  userId:any;
  idPost:any;
  contador:any;
  lista: string[] | undefined;
  detalle:boolean = false;
  
   constructor(private postService: PostService,private router: Router,
    public route: ActivatedRoute, private snackbar:MatSnackBar) { }

   ngOnInit(): void {
      this.userId = this.route.snapshot.paramMap.get('id2');
      console.log("preview-post: "+ this.userId);
      this.lista = this.post.tagList.split(",");
      this.contador = this.post.favoritesCount;
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

}
