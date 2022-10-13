import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@sevenseven/users';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const routes: Routes = [

    { path: 'sidebar', component: SidebarComponent },
    { path: '', component: ShellComponent, 
    canActivate: [AuthGuard],
    children: [
        { path: '', 
        component: DashboardComponent },
        //categories
        { path: 'categories', 
        component: CategoriesListComponent },
        { path: 'categories/form', 
        component: CategoriesFormComponent },
        { path: 'categories/form/:id', 
        component: CategoriesFormComponent },

        //products
        { path: 'products',  
        component: ProductsListComponent },
        { path: 'products/form', 
        component: ProductsFormComponent },
        { path: 'products/form/:id', 
        component: ProductsFormComponent },

        //users
        { path: 'users',  
        component: UsersListComponent },
        { path: 'users/form', 
        component: UsersFormComponent },
        { path: 'users/form/:id', 
        component: UsersFormComponent },

        //orders
        { path: 'orders',  
        component: OrdersListComponent },
        { path: 'orders/form', 
        component: OrdersDetailComponent },
        { path: 'orders/:id', 
        component: OrdersDetailComponent }
    ] },
   // {path : 'log',  loadChildren:() => import('../../../../libs/users/src/lib/users.module').then(m=>m.UsersModule)}, // eslint-disable-line @nrwl/nx/enforce-module-boundaries
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
