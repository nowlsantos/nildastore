import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryItemService } from 'src/app/services/category-item.service';
import { CategoryItem } from 'src/app/services/category.model';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    categories: CategoryItem[];

    constructor(private router: Router,
                private categoryItemService: CategoryItemService) { }

    ngOnInit() {
        this.categoryItemService.getCategories().subscribe(categories => {
            this.categories = categories;
        });
    }

    viewProductsBy(category: string) {
        this.router.navigate(['/products'], {
            queryParams: { category }
        });
    }
}
