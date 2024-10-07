import { NgModule } from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {ContentComponent} from '../layout/content/content.component';

export const routes: Routes = [
  {
    path: "",
    component: ContentComponent,
    children: [
      {path: "", redirectTo: "home", pathMatch: "full"},
      {path: 'home', loadChildren: () => import('../routes/home/home.module').then(m => m.HomeModule)},
      {path: 'books', loadChildren: () => import('../routes/books/books.module').then(m => m.BooksModule)},
      {path: 'users', loadChildren: () => import('../routes/users/users.module').then(m => m.UsersModule)},
      {path: 'lending',loadChildren: () => import('../routes/books-lending/books-lending.module').then(m => m.BooksLendingModule)},
      {path: 'recommendation', loadChildren: () => import('./books-recommendation/books-recommendation.module').then(m => m.BooksRecommendationModule)},
      { path: '**', redirectTo: '/home' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })],
  exports: [RouterModule]
})
export class RoutesModule { }
