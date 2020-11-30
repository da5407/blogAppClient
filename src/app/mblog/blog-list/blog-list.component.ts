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

downloadFile(data: Blog[], filename='data') {
  let csvData = this.blogService.ConvertToCSV(data,Object.keys(this.blog));
  console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
}  
}
