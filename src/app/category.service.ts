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
  public predictedCategory : Category ;
  constructor() { 
    // this.resetAllCategories();
  }


  getAllCategories(){
    return categoriesS.default;
  }

  resetAllCategories(){
    var cats : Category[] = this.getAllCategories();
    this.categories = [];
    this.otherCategories = [];
    for(var key in cats ){
      if(cats[key].level == 1 || cats[key].level == 2){
        this.categories.push(cats[key]);
      }else{
        this.otherCategories.push(cats[key]);
      }
    }
  }
  getTopCategories(){
  }

  getSubCategories(){
    return this.otherCategories;
  }
  
  searchCategories(keyword:string){
   var cats : Category[] ;
   
   if(this.selectedCategories.length > 0){
     cats = this.selectedCategories[this.selectedCategories.length-1].subCategories!=null?this.selectedCategories[this.selectedCategories.length-1].subCategories:[];
   }else{
     cats = this.getAllCategories();
   }

   var results : Category [] = [];
   this.categories = [];
   this.otherCategories = [];
   this.predictedCategory = null;

    for(var key in cats ){
      if(cats[key].categoryName.toLowerCase().indexOf(keyword.toLowerCase())!=-1){
        if(cats[key].level==1 || cats[key].level==2)
        {
          cats[key].priority = cats[key].categoryName.toLowerCase().indexOf(keyword.toLowerCase());
          this.categories.push(cats[key]);
        }else{
          cats[key].priority = cats[key].categoryName.toLowerCase().indexOf(keyword.toLowerCase());
          this.otherCategories.push(cats[key]);
        }
      }
    }

    this.categories = this.categories.length > 0 ? this.categories.sort(this.compare) : this.categories;
    this.otherCategories = this.otherCategories.length > 0 ?  this.otherCategories.sort(this.compare) : this.otherCategories;

    if(this.categories.length > 0 && this.otherCategories.length > 0){
      this.predictedCategory  = this.categories[0].priority > this.otherCategories[0].priority ? 
      this.otherCategories[0] :
      this.categories[0];
    }else if(this.categories.length > 0 && this.otherCategories.length ==0){
      this.predictedCategory = this.categories[0];
    }else if(this.otherCategories.length > 0 && this.categories.length ==0){
      this.predictedCategory = this.otherCategories[0];
    }else{
      this.predictedCategory = null;
    }
  }

  compare(a,b) {
    if (a.priority < b.priority)
       return -1;
    if (a.priority > b.priority)
      return 1;
    return 0;
  }

  selectCategory(category : Category){
    this.selectedCategories.push(category);
    this.categories = category.subCategories!=null ? category.subCategories : [];  
    this.otherCategories = [];
  }
  deselectCategory(){
    this.selectedCategories.pop();
  
    if(this.selectedCategories.length > 0){
      this.categories = this.selectedCategories[this.selectedCategories.length-1].subCategories;
    }else{
      this.resetAllCategories();
    }  
  }
}