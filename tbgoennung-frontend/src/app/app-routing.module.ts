import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TbgoennungComponent } from './tbgoennung/tbgoennung.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tbgoennung', component: TbgoennungComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
