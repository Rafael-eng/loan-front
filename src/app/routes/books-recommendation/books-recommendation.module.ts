import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BooksComponent} from '../books/components/books.component';
import {BooksRecommendationComponent} from './components/books-recommendation.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerComponent} from 'ngx-spinner';

const routes: Routes = [
  {path: "", component: BooksRecommendationComponent}
];

@NgModule({
  declarations: [
    BooksRecommendationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    NgxSpinnerComponent,
  ],
  exports: [RouterModule]
})
export class BooksRecommendationModule { }
