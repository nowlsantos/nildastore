import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    constructor(private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {}

    gotoProducts() {
        this.router.navigate(['/products']);
    }
}
