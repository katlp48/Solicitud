import { PostListConfig } from './../../models/post-list-config';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  constructor(private postService: PostService) {
  }

  results!: Post[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];
  count !: number;


  ngOnInit(): void {
    this.count = this.postService.countPosts();
    this.runQuery();
  }
  @Input()
  limit!: number;

  @Input()
  set config(config: PostListConfig) {
    if (config.type === 'tag') {
      this.listarTag(config);
    }
 
    if (config.type === 'all') {
      this.postService.getPostsReverse()
        .subscribe(data => {
          this.loading = false;
          this.results = data;
          // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
          this.totalPages = Array.from(new Array(Math.ceil(data.length/ this.limit)), (val, index) => index + 1);
        });
    }
  }


  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }
  runQuery() {
    this.loading = true;
    this.results = [];
    if (this.limit) {
      // this.query.filters.limit = this.limit;
      // this.query.filters.offset = (this.limit * (this.currentPage - 1));
    }
    this.postService.getPostsReverse()
      .subscribe(data => {
        this.loading = false;
        this.results = data;
        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        this.totalPages = Array.from(new Array(Math.ceil(this.count / this.limit)), (val, index) => index + 1);
      });
  }

  listarTag(config: PostListConfig) {

    if (config.tag === 'Todos') {
      this.postService.getPostsReverse()
        .subscribe(data => {
          this.loading = false;
          this.results = data;
          // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
          this.totalPages = Array.from(new Array(Math.ceil(this.count / this.limit)), (val, index) => index + 1);
        });

    }
    else {
      this.postService.getPostsByTag(config.tag).subscribe((data) => {
        this.loading = false;
        this.results = data;
      });
    }
  }
}
