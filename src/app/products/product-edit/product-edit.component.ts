import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    gotoProducts() {
        this.router.navigate(['/products']);
    }
}
