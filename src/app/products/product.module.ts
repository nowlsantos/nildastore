import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductNewComponent } from './product-new/product-new.component';

const ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: '', component: ProductListComponent },
            { path: ':id', component: ProductDetailComponent },
            { path: ':id/edit', component: ProductEditComponent }
        ]
    }
];

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductEditComponent,
        ProductNewComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ]
})
export class ProductModule { }
