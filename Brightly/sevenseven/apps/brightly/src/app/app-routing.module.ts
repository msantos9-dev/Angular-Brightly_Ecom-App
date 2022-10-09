import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [

{path : '', redirectTo: 'homepage', pathMatch : 'full'},
{path : 'homepage', component: HomePageComponent},
{path : 'products', component: ProductListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,]
})
export class AppRoutingModule { }