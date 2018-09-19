import { Injectable } from '@angular/core';
import { Category } from './category/category.model';
import {Http} from  '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories : Category[] = [
      { categoryName :"Men’s Clothing",level :1, categoryId : 1, imageUrl : '/assets/category_images/men.bmp' , subCategories : [
        { categoryName :"Fredd Marshal" ,level :2, categoryId :1 , imageUrl : '/assets/category_images/men/fredd.bmp' , subCategories : null} ,
        { categoryName :"Inflation" ,level :2, categoryId :1 , imageUrl : '/assets/category_images/men/inflation.bmp' , subCategories : null} ,
        { categoryName :"Nersy" ,level :2, categoryId :1 , imageUrl : '/assets/category_images/men/nersy.bmp' , subCategories : null} ]},
      { categoryName :"Women’s Clothing",level :1, categoryId : 1, imageUrl : '/assets/category_images/women.bmp' , subCategories : [
        { categoryName :"Love & Lemonade",level :2, categoryId : 1, imageUrl : '/assets/category_images/women/love.bmp' , subCategories : null},
        { categoryName :"Valdim",level :2, categoryId : 1, imageUrl : '/assets/category_images/women/valdim.bmp' , subCategories : null},
        { categoryName :"Simplee",level :2, categoryId : 1, imageUrl : '/assets/category_images/women/simplee.bmp' , subCategories : null}
      ]},
      { categoryName :"Cellphones & Accessories",level :1, categoryId : 1, imageUrl : '/assets/category_images/cellphones.bmp' , subCategories : null},
      { categoryName :"Computer, Office, Security",level :1, categoryId : 1, imageUrl : '/assets/category_images/computer.bmp' , subCategories : null},
      { categoryName :"Jewelry & Watches",level :1, categoryId : 1, imageUrl : '/assets/category_images/jewellery.bmp' , subCategories : null},
      { categoryName :"Bags & Shoes",level :1, categoryId : 1, imageUrl : '/assets/category_images/bags.bmp' , subCategories : null},
      { categoryName :"Toys, Kids & Baby",level :1, categoryId : 1, imageUrl : '/assets/category_images/toys.bmp' , subCategories : null},
      { categoryName :"Sport & Outdoors",level :1, categoryId : 1, imageUrl : '/assets/category_images/sports.bmp' , subCategories : null}
    ];

  public selectedCategories : Category[] = [];
  constructor(private http : Http) { 
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
      if(cats[key].categoryName.indexOf(keyword)!=-1){
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