import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomeModule )
    },
    {
        path: 'products',
        loadChildren: () => import('./products/product.module').then( m => m.ProductModule )
    },
    {
        path: 'login',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule )
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
