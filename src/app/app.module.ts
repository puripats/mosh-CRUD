import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
