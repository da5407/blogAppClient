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

  ConvertToCSV(objArray:any, headerList:any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    for (let index in headerList) {
     row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
     let line = '';
     for (let index in headerList) {
      let head = headerList[index];
      line +=  array[i][head]+',' ;
     }
     str += line.substr(0, line.length -1) + '\r\n';
    }
    return str;
   }
  
}
