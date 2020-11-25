import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MblogRoutingModule } from './mblog-routing.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BlogListComponent, BlogDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MblogRoutingModule
  ]
})
export class MblogModule { }
