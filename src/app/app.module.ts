import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NSMaterialModule } from './material/ns-material.module';

/* AngularFirestore */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
/* import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage'; */

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainApplicationComponent } from './main-application/main-application.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    MainApplicationComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    NSMaterialModule

    // AngularFireAuthModule // imports firebase/auth, only needed for auth features,
    // AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
