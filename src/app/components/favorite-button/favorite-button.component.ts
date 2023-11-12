import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent  {

  constructor(private postService: PostService,
    private router: Router,
    private userService: UserService) { }

  @Input()
  post!: Post;
  @Output() toggle = new EventEmitter<boolean>();
  like = false;

  toggleFavorite() {
    this.like = true;

    if (!this.post.favorite) {

      this.like= false;
      this.toggle.emit(true);

// Otherwise, unfavorite the article
    } else {

      this.like = true;
      this.toggle.emit(false);
   
}
  }

}
