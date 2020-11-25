import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
import { switchMap } from 'rxjs/operators';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  //@Input() 
  blogDetails: Blog | undefined;
  message = '';
  blog$: Observable<Blog> | undefined;
  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const pid = params.get('id');
        return this.blogService.blogGetOne(pid);
      })
    ).subscribe((x) => {
      this.blogDetails = x;
      console.log(x);
    });
  }
  goBack() {
    this.router.navigateByUrl('/blog')
  }

  getBlogs(id: string) {
    this.blogService.blogGetOne(id).then((data) => {
      this.blogDetails = data;
    })
  }
}
