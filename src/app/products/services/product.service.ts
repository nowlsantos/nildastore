import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { map, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productCollection: AngularFirestoreCollection<Product>;
    private productDoc: AngularFirestoreDocument<Product>;

    constructor(private db: AngularFirestore) {
        this.productCollection = this.db.collection<Product>('cakes-pastries', ref => ref.orderBy('date', 'desc'));
    }

    getProducts(): Observable<Product[]> {
        return this.productCollection.snapshotChanges()
            .pipe(
                map( actions => actions.map(action => {
                    const data = action.payload.doc.data() as Product;
                    const id = action.payload.doc.id;
                    Object.keys(data).filter(key => data[key] instanceof Timestamp)
                        .forEach(key => data[key] = data[key].toDate());
 
                    return { id, ...data };
                }),
                first()
            )
        );
    }

    getProduct(id: string): Observable<Product> {
        this.productDoc = this.db.doc(`cakes-pastries/${id}`);
        return this.productDoc.valueChanges().pipe(first());
    }

    addProduct(product: Product) {
        this.productCollection.add(product);
    }

    deleteProduct(product: Product) {
        this.productDoc = this.db.doc(`cakes-pastries/${product.id}`);
        this.productDoc.delete();
    }

    updateProduct(product: Partial<Product>): Observable<any> {
        this.productDoc = this.db.doc(`cakes-pastries/${product.id}`);
        return of(this.productDoc.update(product));
    }

    filterBy(category: string): Observable<Product[]> {
        this.productCollection = this.db.collection<Product>('cakes-pastries', ref => ref.where('category', '==', category));
        return this.productCollection.valueChanges({ idField: 'id' });
    }
}
