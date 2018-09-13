import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product, ProductId } from '../model/product.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection: AngularFirestoreCollection<Product>;
  private productDoc: AngularFirestoreDocument<Product>;

  constructor(private afs: AngularFirestore) {
    this.productCollection = this.afs.collection<Product>('products');
  }

  getProducts() {
    return this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(item => {
        const data = item.payload.doc.data() as Product;
        const id = item.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getProduct(product: Product) {
    this.productDoc = this.afs.doc<ProductId>(`products/${product}`);
    this.productDoc.valueChanges();
  }

  update(product: Product) {
    return this.afs.doc<Product>(`products/${product}`).update(product);
  }

  add() {}

  delete() {}
}
