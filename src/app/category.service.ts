import { Injectable } from '@angular/core';
import { Category } from './category/category.model';
import * as categoriesS from '../assets/categories.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories : Category[] = categoriesS.default;

  public selectedCategories : Category[] = [];
  constructor() { 
  }
    getAllCategories(){
    return this.categories;
  }

  getMainCategories(){}

  getSubCategories(){}
  
  searchCategories(keyword:string){
   var cats : Category[] = this.getAllCategories();
   var results : Category [] = [];

    for(var key in cats ){
      if(cats[key].categoryName.toLowerCase().indexOf(keyword.toLowerCase())!=-1){
        results.push(cats[key]);
      }
    }

    console.log(results);
    return results;
  }

  selectCategory(category : Category){
    this.selectedCategories.push(category);
    this.categories = category.subCategories;
  }
}