import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent{

  constructor(private http: HttpClient){}
  file:any;

  upload(event:any)
  {
    this.file = event.target.files[0]

  }

  sendFile()
  {
    const formData = new FormData()
    formData.append('file',this.file)

    this.http.post('http://localhost:3000/file', formData).subscribe
    (res => console.log(res))

    this.file = null
  }
}
