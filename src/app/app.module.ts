import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import { ManagerComponent } from './manager/manager.component';
import { MainComponent } from './main/main.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

provideAnimationsAsync(),
  providePrimeNG({
    theme: {
      preset: Aura
    }
  })

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookComponent,
    ManagerComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    TableModule,
    Dialog
  ],

  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {    
          cssLayer: {
            name: 'primeng',
            order: 'app-styles, primeng'
        }}
      }
    }),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
