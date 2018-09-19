import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mainCategories : Category[] = [];
  selectedCategories : Category []= [];
  searchKeyword : string;


  @ViewChild("inputBox") _el: ElementRef;

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    this.selectedCategories = this.categoryService.selectedCategories;
  }

  onSearchChange(searchKeyword){
    console.log(searchKeyword);
    this.mainCategories = this.categoryService.searchCategories(searchKeyword);
  }

  categorySelected(selectedCategory : Category){
    this.searchKeyword = "";
    this.categoryService.selectCategory(selectedCategory);
    this.mainCategories = this.categoryService.getAllCategories();
  }

  onKeyDown(event : KeyboardEvent){
    if(event.key == "ArrowDown"){
     this.mainCategories[0].selectionStatus = 1;
    }else if(event.key =="Enter" && this.mainCategories[0].selectionStatus == 1){
      this.categorySelected(this.mainCategories[0]);
    }

  }
      toggleOtherCategories(){
  
      }

}
