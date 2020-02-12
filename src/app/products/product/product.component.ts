import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { ViewPort } from 'src/app/services/viewport.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductBottomsheetComponent } from '../product-bottomsheet/product-bottomsheet.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent {

    @Input() product: Product;
    @Input() viewport: ViewPort;
    @Input() isLoggedIn: boolean;

    constructor(private router: Router,
                private bottomSheet: MatBottomSheet ) { }

    viewProduct() {
        this.viewport.device === 'mobile' ? this.openBottomSheet()
                                          : this.router.navigate(['/product', this.product.id]);
    }

    openBottomSheet() {
        ProductBottomsheetComponent.productID = this.product.id;
        this.bottomSheet.open(ProductBottomsheetComponent);
    }

    editProduct() {
        this.router.navigate(['/products', this.product.id, 'edit']);
    }
}
