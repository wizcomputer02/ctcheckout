import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ForgotpasswordPageRoutingModule } from './forgotpassword-routing.module';

import { ForgotpasswordPage } from './forgotpassword.page';
const routes: Routes = [
{
path: '',
component: ForgotpasswordPage
}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    IonicModule,
    ForgotpasswordPageRoutingModule,
	RouterModule.forChild(routes)
  ],
  declarations: [ForgotpasswordPage]
})
export class ForgotpasswordPageModule {}
