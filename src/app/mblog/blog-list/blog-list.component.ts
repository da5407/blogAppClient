import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';



@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blog: Blog = {
    id: '',
    title: '',
    content: ''
  }
  blogList: Blog[] = [];
  message = '';
  constructor(private blogService:BlogService,private router: Router) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  insert() { 
    this.blogService.blogPost(this.blog).then((data)=>{
      this.reQuery();
    })
  }

  update() { 
    this.blogService.blogPut(this.blog).then((data)=>{
      this.reQuery();
    })
  }

  delete() { 
    this.blogService.blogDelete(this.blog).then((data)=>{
      this.reQuery();
    })
  }

  cancel() {
    this.blog={
      id: '',
      title: '',
      content: ''
    }
   }

  getBlogs() {
    this.blogService.blogGet().then((data)=>{
      this.blogList=data;
    })
   }

  rowClick(item: Blog) {
    this.blog.id = item.id;
    this.blog.title = item.title;
    this.blog.content = item.content;
  }

  reQuery(){
    setTimeout(() => {
      this.cancel();
      this.getBlogs();
    }, 20);
  }

  toDetail(id:string | undefined){
    this.router.navigateByUrl(`/blog/bdetail/${id}`);
  }

}
