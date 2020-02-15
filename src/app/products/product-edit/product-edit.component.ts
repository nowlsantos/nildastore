import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    productForm: FormGroup;
    product: Product;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private productService: ProductService) { }

    ngOnInit() {
        /* tslint:disable:no-string-literal */
        // ---Data coming from the Product resolver---
        // this.product = this.route.snapshot.data['product'];
        this.route.data.subscribe( data => this.product = data.products);

        this.route.paramMap.subscribe(params => {
            this.product.id = params.get('id');
        });

        this.productForm = this.fb.group({
            title: [this.product.title],
            description: [this.product.description],
            price: [this.product.price],
        });

        this.productForm.get('title').valueChanges.subscribe(value => this.product.title = value );
        this.productForm.get('description').valueChanges.subscribe(value => this.product.description = value );
        this.productForm.get('price').valueChanges.subscribe(value => this.product.price = value );
    }

    gotoProducts(category: string) {
        this.router.navigate(['/products'], {
            queryParams: { category }
        });
    }

    onSubmit() {
        this.productService.updateProduct(this.product)
            .subscribe( () => {
                this.router.navigate(['/products'], {
                    queryParams: { category: this.product.category }
                });
            });
    }
}
