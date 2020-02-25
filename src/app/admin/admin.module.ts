import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        children: [
            // { path: '', component: RegisterComponent },
            { path: '', component: LoginComponent },
        ]
    }
];

@NgModule({
    declarations: [
        // RegisterComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ]
})
export class AdminModule { }
