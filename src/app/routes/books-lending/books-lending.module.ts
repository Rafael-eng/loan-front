import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooksLendingComponent} from './components/books-lending.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: "", component: BooksLendingComponent}
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BooksLendingComponent,
    RouterModule.forChild(routes)
  ]
})
export class BooksLendingModule { }
