import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadingStrategyService } from './services/preloading-strategy.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent,
        /* loadChildren: () => import('./home/home.module').then( m => m.HomeModule ), */
        data: {
            preload: true,
            state: 'home'
        }
    },
    {
        path: 'products',
        loadChildren: () => import('./products/product.module').then(m => m.ProductModule),
        data: {
            preload: true,
            state: 'products'
        }
    },
    /*  {
         path: 'register',
         loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
         data: {
             state: 'register'
         }
     }, */
    {
        path: 'login',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: {
            state: 'login'
        }
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadingStrategyService })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
