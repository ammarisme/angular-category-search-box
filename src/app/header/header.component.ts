import { Component, OnInit } from '@angular/core';
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
    this.mainCategories = this.categoryService.getAllCategories();
  }

}
