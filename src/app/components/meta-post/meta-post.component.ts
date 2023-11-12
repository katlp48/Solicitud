import { ProfileService } from './../../services/profile.service';

import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-meta-post',
  templateUrl: './meta-post.component.html',
  styleUrls: ['./meta-post.component.css']
})
export class MetaPostComponent implements OnInit {

  nombreCompleto !: string;
  profile!: Profile;
  @Input()
  post!: Post;

  @Input()
  detalle:boolean = false;
  
  imgfile: any;


  constructor(private profileService: ProfileService,){
  }

  ngOnInit(): void{
  this.profileService.getProfileId(this.post.author.id)
  .subscribe((data) => {
      this.profile = data;
      this.nombreCompleto = this.profile.name + ' ' + this.profile.lastName;
      this.imgfile = 'data:image/jpeg;base64,' + this.profile.picture;
    });
  }
}
