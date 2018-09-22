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
  menuCollapsed = true;
  showMainCategories :boolean = false;

  @ViewChild("inputBox") _el: ElementRef;

  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
     this.selectedCategories = this.categoryService.selectedCategories;
    // this.otherCategories = this.categoryService.otherCategories;
    // this.mainCategories = this.categoryService.categories;
  }

  onInputFocus(){
    this.mainCategories = this.categoryService.categories;
    this.showMainCategories=true;

  }
  toggleOtherCategoriesMenu(){
    this.showOtherCategories=!this.showOtherCategories;
    this.menuCollapsed=!this.menuCollapsed;
    if(!this.menuCollapsed){
      this.otherCategories = this.categoryService.otherCategories;
    }else{
      this.otherCategories = [];
    }
  }

  onSearchChange(event){
    if(event.inputType =="deleteContentBackward"){
      this.searchKeyword = this.searchKeyword.substr(0, this.searchKeyword.length-2);//= event.value;
      this.inputText = this.searchKeyword;

      this.categoryService.searchCategories(this.searchKeyword);
      
      if(this.inputText !="" && this.categoryService.predictedCategory!=null){
        event.target.value = this.categoryService.predictedCategory.categoryName;
      }else{
        event.target.value = "";
      }

      this.setInputSelection(event.target, this.searchKeyword.length, 100);
    }else if(event.inputType=="insertText"){
      this.searchKeyword = this.searchKeyword + event.data;//= event.value;

      this.categoryService.searchCategories(this.searchKeyword);
      
      if(this.categoryService.predictedCategory!=null){
        event.target.value = this.categoryService.predictedCategory.categoryName;
      }
      this.setInputSelection(event.target, this.searchKeyword.length, 100);
    }
  }

   setInputSelection(input, startPos, endPos) {
    input.focus();
    if (typeof input.selectionStart != "undefined") {
        input.selectionStart = startPos;
        input.selectionEnd = endPos;
    } else if ((document as any).selection && (document as any).selection.createRange) {
        input.select();
        var range = (document as any).selection.createRange();
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
    this.otherCategories = this.categoryService.otherCategories;
    this.inputText = "";
  }

  onKeyDown(event : KeyboardEvent){
    
    if(event.key == "ArrowDown"){
     this.selectionIndex++;
     this.mainCategories[this.selectionIndex].selectionStatus = 1;
    }else if(event.key =="Enter"){

      this.selectionIndex = this.selectionIndex < 0 ?  0 : -1;

      if(this.categorySelected!=null){
        this.categorySelected(this.categoryService.predictedCategory);
        this.selectionIndex= -1;
      }
    }
    else if(event.key =="ArrowRight" && this.selectionIndex < this.mainCategories.length-1){
      this.mainCategories[this.selectionIndex].selectionStatus = 0;
      this.selectionIndex++;
      this.mainCategories[this.selectionIndex].selectionStatus = 1;
    }else if(event.key =="ArrowLeft" && this.selectionIndex > 0){
      this.mainCategories[this.selectionIndex].selectionStatus = 0;
      this.selectionIndex--;
      this.mainCategories[this.selectionIndex].selectionStatus = 1;
    }else if(event.key =="Enter" && this.searchKeyword.length > 0){

    }else if (event.key == "Backspace"){
      // if(this.inputText =""){

        if(this.inputText==""){
          this.categoryService.deselectCategory();
          this.categoryService.searchCategories(this.searchKeyword);
          this.onInputFocus();
          return;
        }
        
      // this.searchKeyword = "";
      
      // this.otherCategories = this.categoryService.otherCategories;
      // this.mainCategories = this.categoryService.categories;
      // }
    }
  }
}
