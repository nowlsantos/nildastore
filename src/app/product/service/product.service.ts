import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product, ProductId } from '../model/product.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  product$: Observable<ProductId[]>;

  constructor(private readonly afs: AngularFirestore) {}

  getProducts() {
    this.productCollection = this.afs.collection<Product>('products');
    return this.product$ = this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getProduct(product) {
    this.productDoc = this.afs.doc<ProductId>('products/' + product);
    this.productDoc.valueChanges();
    console.log('id:', product.id);
  }

  update(product: Product) {
    return this.afs.doc<Product>('products/' + product).update(product);
  }

  add() {}

  delete() {}
}
