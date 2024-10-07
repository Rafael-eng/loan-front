import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksComponent } from './components/books.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerComponent} from 'ngx-spinner';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: "", component: BooksComponent}
];

@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    NgxSpinnerComponent,
    FormsModule,
  ],
  exports: [RouterModule]
})
export class BooksModule { }
