import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', component: LoginComponent }
]

@NgModule({
    declarations: [ LoginComponent ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminModule { }
