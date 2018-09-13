import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent {
  @Input() product$: Observable<Product[]>;
}
