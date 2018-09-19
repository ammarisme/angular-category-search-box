import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../category/category.model';

@Component({
  selector: 'app-other-category',
  templateUrl: './other-category.component.html',
  styleUrls: ['./other-category.component.css']
})
export class OtherCategoryComponent implements OnInit {

  @Input() category : Category;
  @Output() categorySelected : EventEmitter<Category> = new EventEmitter<Category>();
  
  constructor() { }

  ngOnInit() {
  }

  selectCategory(){
    this.categorySelected.emit(this.category);
  }
}

