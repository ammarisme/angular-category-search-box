import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category/category.model';

@Component({
  selector: 'app-selected-category',
  templateUrl: './selected-category.component.html',
  styleUrls: ['./selected-category.component.css']
})
export class SelectedCategoryComponent implements OnInit {

  @Input() category : Category;
  constructor() { }

  ngOnInit() {
  }

}
