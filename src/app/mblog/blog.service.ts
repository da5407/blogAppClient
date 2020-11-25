import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Blog } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.log(error.status);
    return Promise.reject(error.message || error);
  }


   blogPost(blog:Blog): Promise<any> {
    const url: string = `${this.apiBaseUrl}/posts`;
    return this.http
      .post(url, blog)
      .toPromise()
      .catch(this.handleError);
  }

  blogPut(blog:Blog): Promise<any> {
    const url: string = `${this.apiBaseUrl}/posts/${blog.id}`;
    return this.http
      .put(url, blog)
      .toPromise()
      .catch(this.handleError);
  }


  blogDelete(blog:Blog): Promise<any> {
    const url: string = `${this.apiBaseUrl}/posts/${blog.id}`;
    return this.http
      .delete(url)
      .toPromise()
      .catch(this.handleError);
  }

  blogGetOne(id:string | null): Promise<any> {
    const url: string = `${this.apiBaseUrl}/posts/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .catch(this.handleError);
  }

  blogGet(): Promise<any> {
    const url: string = `${this.apiBaseUrl}/posts`;
    return this.http
      .get(url)
      .toPromise()
      .catch(this.handleError);
  }

}
