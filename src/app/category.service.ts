import { Injectable } from '@angular/core';
import { Category } from './category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories : Category[] = [
    new Category("Men",1, 1, '/assets/category_images/men.bmp' , [
      new Category("Fredd",1, 1, '/assets/category_images/men/fredd.bmp', null ),
      new Category("Inflation",1, 1, '/assets/category_images/men/inflation.bmp', null ),
      new Category("Nersy",1, 1, '/assets/category_images/men/nersy.bmp', null ),
    ]),
    new Category("Women",1, 1,'/assets/category_images/women.bmp' , null),
    new Category("Cellphones",1, 1,'/assets/category_images/cellphones.bmp' , null),
    new Category("Computer",1, 1,'/assets/category_images/computer.bmp' , null)
  ];

  public selectedCategories : Category[] = [];
  constructor() { }

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
