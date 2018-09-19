import { Injectable } from '@angular/core';
import { Category } from './category/category.model';
import * as categoriesS from '../assets/categories.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories : Category[] = [];
  otherCategories : Category[] = [];
  
  public selectedCategories : Category[] = [];
  constructor() { 
    var cats : Category[] = this.getAllCategories();

    for(var key in cats ){
      if(cats[key].level == 1 || cats[key].level == 2){
        this.categories.push(cats[key]);
      }else{
        this.otherCategories.push(cats[key]);
      }
    }
  }


    getAllCategories(){
    return categoriesS.default;
  }

  getTopCategories(){
    return this.categories;
  }

  getSubCategories(){
    return this.otherCategories;
  }
  
  searchCategories(keyword:string){
   var cats : Category[] ;
   
   if(this.selectedCategories.length > 0){
     cats = this.selectedCategories[this.selectedCategories.length-1].subCategories;
   }else{
     cats = this.getAllCategories();
   }
   var results : Category [] = [];
    this.categories = [];
    this.otherCategories = [];
    for(var key in cats ){
      if(cats[key].categoryName.toLowerCase().indexOf(keyword.toLowerCase())!=-1){
        if(cats[key].level==1 || cats[key].level==2)
        {
          this.categories.push(cats[key]);
        }else{
          this.otherCategories.push(cats[key]);
        }
      }
    }
    return results;
  }

  selectCategory(category : Category){
    this.selectedCategories.push(category);
    this.categories = category.subCategories;
  }
}