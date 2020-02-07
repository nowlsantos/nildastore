import { Injectable } from '@angular/core';
import { ProductModule } from '../product.module';

@Injectable({
    providedIn: ProductModule
})
export class ProductService {
    constructor() { }
}

/* 
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Speech } from '../models/speech';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpeechService {
    private speechCollection: AngularFirestoreCollection<Speech>;
    private speechDoc: AngularFirestoreDocument<Speech>;
    private speech: Observable<Speech>;

    constructor(private db: AngularFirestore) {
        this.speechCollection = this.db.collection<Speech>('speeches');
    }

    getSpeeches() {
        return this.speechCollection.valueChanges({ idField: 'id' });
    }

    getSpeech(id: string) {
        this.speechDoc = this.db.doc(`speeches/${id}`);
        this.speech = this.speechDoc.valueChanges();
        return this.speech;
    }

    addSpeech(speech: Speech) {
        this.speechCollection.add(speech);
    }

    deleteSpeech(speech: Speech) {
        this.speechDoc = this.db.doc(`speeches/${speech.id}`);
        this.speechDoc.delete();
    }

    updateSpeech(speech: Speech) {
        this.speechDoc = this.db.doc(`speeches/${speech.id}`);
        this.speechDoc.update(speech);
    }

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