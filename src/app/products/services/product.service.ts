import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productCollection: AngularFirestoreCollection<Product>;
    private productDoc: AngularFirestoreDocument<Product>;
    private product: Observable<Product>;

    constructor(private db: AngularFirestore) {
        this.productCollection = this.db.collection<Product>('products');
    }

    getProducts() {
        return this.productCollection.valueChanges({ idField: 'id'});
    }

    getProduct(id: string) {
        this.productDoc = this.db.doc(`products/${id}`);
        this.product = this.productDoc.valueChanges();
        return this.product;
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
}

/* 

    viewSpeeches() {
        this.speechCollection = this.db.collection<Speech>('speeches');
        return this.speechCollection.valueChanges({ idField: 'id' });
    }

    search(query: string[]) {
        const term = query[0];
        let result = query[1];

        switch ( result ) {
            case 'Author': result = 'name'; break;
            case 'Title': result = 'title_lowcase'; break;
            case 'Month': result = 'month'; break;
            case 'Year': result = 'year'; break;
        }

        this.speechCollection = this.db.collection<Speech>('speeches', ref => ref
            .where(result, '>=', term)
            .where(result, '<=', term + '\uf8ff'));

        return this.speechCollection.valueChanges({ idField: 'id' });
    }

    searchByAuthor(searchTerm: string) {
        this.speechCollection = this.db.collection<Speech>('speeches', ref => ref
                                    .where('name', '>=', searchTerm)
                                    .where('name', '<=', searchTerm + '\uf8ff'));

        return this.getSpeeches();
    }

    searchByTitle(searchTerm: string) {
        this.speechCollection = this.db.collection<Speech>('speeches', ref => ref
                                    .where('title_lowcase', '>=', searchTerm)
                                    .where('title_lowcase', '<=', searchTerm + '\uf8ff'));
        return this.getSpeeches();
    }

    searchByMonth(searchTerm: string) {
        this.speechCollection = this.db.collection<Speech>('speeches', ref => ref
                                    .where('month', '>=', searchTerm)
                                    .where('month', '<=', searchTerm + '\uf8ff'));
        return this.getSpeeches();
    }

    searchByYear(searchTerm: string) {
        this.speechCollection = this.db.collection<Speech>('speeches', ref => ref
                                    .where('year', '>=', searchTerm)
                                    .where('year', '<=', searchTerm + '\uf8ff'));
        return this.getSpeeches();
    }
}
 */