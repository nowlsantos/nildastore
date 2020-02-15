import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductResolver } from './services/product-resolver.service';
import { ProductBottomsheetComponent } from './product-bottomsheet/product-bottomsheet.component';
import { CategoryResolver } from './services/category-resolver.service';

const ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '', component: ProductListComponent,
                resolve: { products: CategoryResolver }
            },
            {
                path: ':id', component: ProductBottomsheetComponent,
                resolve: { product: ProductResolver }
            },
            {
                path: ':id/edit',
                component: ProductEditComponent,
                resolve: { product: ProductResolver },
                data: { state: ':id/edit' }
            }
        ]
    }
];

@NgModule({
    declarations: [
        ProductListComponent,
        ProductEditComponent,
        ProductNewComponent,
        ProductBottomsheetComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    entryComponents: [ ProductBottomsheetComponent ],
    providers: [ ProductResolver, CategoryResolver ]
})
export class ProductModule { }
