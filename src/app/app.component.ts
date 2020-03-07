import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './Post';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post<{ name: string }>('https://services-revision.firebaseio.com/posts.json', postData)
      .subscribe(responseData => {
        console.log(responseData);
      })
  }

  onFetchPosts() {
    // Send Http request
   this.http.get<{ [key: string]: Post }>('https://services-revision.firebaseio.com/posts.json')
      .pipe(map(resp => {
        return Object.keys(resp).map(id => ({ ...resp[id], id }))
      }))
      .subscribe(posts => {
        console.log(posts)
        this.loadedPosts = posts;
      })
  }

  onClearPosts() {
    // Send Http request
  }
}
