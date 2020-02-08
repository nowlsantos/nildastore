import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ProductComponent } from '../products/product/product.component';

@NgModule({
    declarations: [ ProductComponent ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        ProductComponent
    ]
})
export class SharedModule { }
