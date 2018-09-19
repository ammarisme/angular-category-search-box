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
  searchKeyword : string = "";
  showOtherCategories : boolean = false;
  selectionIndex : number = -1; 
  keywordLength : number = 0;
  inputText = "";

  @ViewChild("inputBox") _el: ElementRef;

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
    this.selectedCategories = this.categoryService.selectedCategories;
    this.otherCategories = this.categoryService.otherCategories;
    this.mainCategories = this.categoryService.categories;
  }

  onSearchChange(event){
    console.log(event);
    if(event.inputType =="deleteContentBackward"){
      this.searchKeyword = "";//this.searchKeyword.substr(0, this.searchKeyword.length-2);
      event.target.value ="";
    }else if(event.inputType=="insertText"){
      this.searchKeyword = this.searchKeyword + event.data;//= event.value;
      
    event.target.value = this.mainCategories[0].categoryName;
    this.setInputSelection(event.target, this.searchKeyword.length, 100);
    }

    this.categoryService.searchCategories(this.searchKeyword);
    this.otherCategories = this.categoryService.otherCategories;
    this.mainCategories = this.categoryService.categories;

    
    // event.target.select(this.keywordLength , 100);

  }

   setInputSelection(input, startPos, endPos) {
    input.focus();
    if (typeof input.selectionStart != "undefined") {
        input.selectionStart = startPos;
        input.selectionEnd = endPos;
    } else if (document.selection && document.selection.createRange) {
        // IE branch
        input.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos);
        range.moveStart("character", startPos);
        range.select();
    }
}


  categorySelected(selectedCategory : Category){
    this.searchKeyword = "";
    this.categoryService.selectCategory(selectedCategory);
    this.mainCategories = this.categoryService.categories;
    this.otherCategories = [];
    this.inputText = "";

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

}
