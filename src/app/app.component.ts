import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '../../node_modules/@angular/fire/firestore';
import { Observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NildaStore';
  products: Observable<any[]>;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.products = this.db.collection('products').valueChanges();
  }
}
