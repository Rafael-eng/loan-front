import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import {RouterModule} from '@angular/router';
import {RoutesModule} from './routes/routes.module';
import {ModalModule} from '@developer-partners/ngx-modal-dialog';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    LayoutModule,
    RouterModule,
    AppComponent,
    RoutesModule,
    ModalModule
  ],
  providers: [],
})
export class AppModule { }
