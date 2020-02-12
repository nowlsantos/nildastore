import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-product-bottomsheet',
    templateUrl: './product-bottomsheet.component.html',
    styleUrls: ['./product-bottomsheet.component.css']
})
export class ProductBottomsheetComponent implements OnInit {

    static productID: string;
    product: Product;

    constructor(private bottomSheetRef: MatBottomSheetRef<ProductBottomsheetComponent>,
                private productService: ProductService) { }

    ngOnInit() {
        const id = ProductBottomsheetComponent.productID;
        this.productService.getProduct(id).subscribe(product => this.product = product);
    }

    closeBottomSheet(event: MouseEvent) {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }
}
