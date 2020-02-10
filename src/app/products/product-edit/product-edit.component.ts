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
    private id: string;

    constructor(private fb: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private productService: ProductService) { }

    ngOnInit() {
        this.productForm = this.fb.group({
            title: [''],
            description: [''],
            price: [''],
        });

        /* tslint:disable:no-string-literal */
        this.product = this.route.snapshot.data['product'];
        this.route.paramMap.subscribe(params => this.id = params.get('id'));

        this.productForm.get('title').valueChanges.subscribe(value => this.product.title = value );
        this.productForm.get('description').valueChanges.subscribe(value => this.product.description = value );
        this.productForm.get('price').valueChanges.subscribe(value => this.product.price = value );
    }

    gotoProducts(category: string) {
        this.router.navigate(['/products'], {
            queryParams: { category }
        });
    }

    deleteProduct() {}

    onSubmit() {
        this.product.id = this.id;
        this.productService.updateProduct(this.product);

        this.router.navigate(['/products'], {
            queryParams: { category: this.product.category }
        });
    }
}
