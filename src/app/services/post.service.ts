import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Post } from '../models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  basePath:string=environment.api_url;
  constructor(private http: HttpClient) { }
  
  getPosts() {
    return this.http.get<Post[]>(`${this.basePath}/posts`);
  }
  getPostsReverse() {
    return this.http.get<Post[]>(`${this.basePath}/posts/reverse`);
  }
  getPostsByTag(tag: string) {
    return this.http.get<Post[]>(`${this.basePath}/posts/tag/${tag}`);
  }
  countPosts() {
    var count = 0;
    this.getPosts().forEach(post => {count ++;});
    return count;
  }
  getPostId(id:any){
    return this.http.get<Post>(`${this.basePath}/posts/${id}`);
  }
  addPost(post: Post) {
    return this.http.post<Post>(
      `${this.basePath}/posts`,
      post
    );  
  }
  updatePost(id: any, post: Post) {
    return this.http.put<Post>(`${this.basePath}/posts/${id}`, post);
  }
  deletePost(id: any) {
    return this.http.delete<Post>(`${this.basePath}/posts/${id}`);
  }

  favoriteUpdate(id: any, favorite: any) {
    return this.http.put<Post>(`${this.basePath}/posts/${id}/favorite`, favorite);
  }
    
}
