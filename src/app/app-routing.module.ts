import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { ManagerComponent } from './manager/manager.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  
  { path: '', component: MainComponent},
  { path: 'user', component: BookListComponent },
  { path: 'manager', component: ManagerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
