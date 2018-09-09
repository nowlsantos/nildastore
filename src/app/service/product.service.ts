import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProductInterface } from '../model/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  productCollection: AngularFirestoreCollection<ProductInterface>;
  products: Observable<ProductInterface[]>;

  constructor(private afs: AngularFirestore) {
    this.productCollection = this.afs.collection<ProductInterface>('products');
  }

  getProducts() {
    return this.productCollection.valueChanges();
  }

  getProduct(id: number) {
    return this.afs.doc<ProductInterface>('products/' + id);
  }
}
