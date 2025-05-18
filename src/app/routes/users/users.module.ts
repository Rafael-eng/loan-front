import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerComponent} from 'ngx-spinner';
import {UsersComponent} from './components/users.component';
import {BaseTableComponent} from '../../base/base-table/base-table.component';

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
    BaseTableComponent,
  ],
  exports: [RouterModule]
})
export class UsersModule { }
