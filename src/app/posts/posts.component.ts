import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';

import { PostService } from '../services/post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit  {
  posts:any[];


  constructor(private service:PostService) {

  }

  ngOnInit(){
    this.service.getAll()
    .subscribe(
    (response:any[])=>{
      this.posts = response;
    })
  }



  createPost(input:HTMLInputElement){
    let post:any={title:input.value}
    this.posts.splice(0, 0, post);

    input.value=''
    this.service.create(post)
    .subscribe(
      (response:Post) => {
      post.id=response.id
    },
    (error:AppError) => {
      this.posts.splice(0, 1);

      if (error instanceof BadInput){
     //   this.form.setErrors(error.originalError);
      }
  //
      else throw error;

    })

  }

  updatePost(post){
    this.service.update(post)
    .subscribe(
      response => {
      console.log(response);
    })
  }

  deletePost(post){
    let index = this.posts.indexOf(post);
    this.posts.splice(index,1)

    this.service.delete(post.id)
    .subscribe(
      null,
    (error:AppError) => {
      this.posts.splice(index,0,post)


      if (error instanceof NotFoundError) {
        alert('This post been deleted.')
      }

      else throw error;

    })
  }




}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
