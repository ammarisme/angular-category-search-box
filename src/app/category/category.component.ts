import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from '../category.service';
import { createNgModuleRef } from '@angular/core/src/view/refs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category : Category;
  @Output() categorySelected : EventEmitter<Category> = new EventEmitter<Category>();
  constructor(private categoryService : CategoryService) { }

  ngOnInit() {
  }

  selectCategory(){
    this.categorySelected.emit(this.category);
  }

}
