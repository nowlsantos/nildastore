import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navbar/navigation.component';
import { environment } from '../environments/environment';
import { MenuComponent } from './navigation/menu/menu.component';

@NgModule({
  declarations: [
        AppComponent,
        NavigationComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, 'nildashoppe'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        // AngularFireStorageModule,
        SharedModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
