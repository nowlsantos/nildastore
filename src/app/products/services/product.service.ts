import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productCollection: AngularFirestoreCollection<Product>;
    private productDoc: AngularFirestoreDocument<Product>;

    constructor(private db: AngularFirestore) {
        this.productCollection = this.db.collection<Product>('products');
    }

    getProducts() {
        return this.productCollection.valueChanges({ idField: 'id'});
    }

    getProduct(id: string) {
        this.productDoc = this.db.doc(`products/${id}`);
        const product = this.productDoc.valueChanges();
        return product;
    }

    addProduct(product: Product) {
        this.productCollection.add(product);
    }

    deleteProduct(product: Product) {
        this.productDoc = this.db.doc(`products/${product.id}`);
    }

    updateProduct(product: Product) {
        this.productDoc = this.db.doc(`products/${product.id}`);
        this.productDoc.delete();
    }

    filterBy(term: string) {
        this.productCollection = this.db.collection<Product>('products', ref => ref.where('category', '==', term));
        return this.productCollection.valueChanges({ idField: 'id' });
    }
}