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
  otherCategories : Category[] = [];
  selectedCategories : Category []= [];
  searchKeyword : string;
  showOtherCategories : boolean = false;
  selectionIndex : number = -1; 

  @ViewChild("inputBox") _el: ElementRef;

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    this.selectedCategories = this.categoryService.selectedCategories;
    this.otherCategories = this.categoryService.otherCategories;
    this.mainCategories = this.categoryService.categories;
  }

  onSearchChange(searchKeyword){
    console.log(searchKeyword);
    this.categoryService.searchCategories(searchKeyword);
    this.otherCategories = this.categoryService.otherCategories;
    this.mainCategories = this.categoryService.categories
  }

  categorySelected(selectedCategory : Category){
    this.searchKeyword = "";
    this.categoryService.selectCategory(selectedCategory);
    this.mainCategories = this.categoryService.categories;
    this.otherCategories = [];

  }

  onKeyDown(event : KeyboardEvent){
    if(event.key == "ArrowDown"){
     this.selectionIndex++;
     this.mainCategories[this.selectionIndex].selectionStatus = 1;
    }else if(event.key =="Enter" && this.mainCategories[this.selectionIndex].selectionStatus == 1){
      this.categorySelected(this.mainCategories[this.selectionIndex]);
      this.selectionIndex = -1;
    }else if(event.key =="ArrowRight" && this.selectionIndex < this.mainCategories.length-1){
      this.mainCategories[this.selectionIndex].selectionStatus = 0;
      this.selectionIndex++;
      this.mainCategories[this.selectionIndex].selectionStatus = 1;
    }else if(event.key =="ArrowLeft" && this.selectionIndex > 0){
      this.mainCategories[this.selectionIndex].selectionStatus = 0;
      this.selectionIndex--;
      this.mainCategories[this.selectionIndex].selectionStatus = 1;
    }

  }
      toggleOtherCategories(){
  
      }

}
