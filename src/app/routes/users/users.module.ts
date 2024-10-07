import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerComponent} from 'ngx-spinner';
import {UsersComponent} from './components/users.component';

const routes: Routes = [
  {path: "", component: UsersComponent}
];
@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    NgxSpinnerComponent,
  ],
  exports: [RouterModule]
})
export class UsersModule { }
