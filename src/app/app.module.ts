import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header/header.component';
import { SelectedCategoryComponent } from './selected-category/selected-category.component';
import { CategoryService } from './category.service';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HeaderComponent,
    SelectedCategoryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }