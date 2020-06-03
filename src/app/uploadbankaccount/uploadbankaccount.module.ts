import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadbankaccountPageRoutingModule } from './uploadbankaccount-routing.module';

import { UploadbankaccountPage } from './uploadbankaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadbankaccountPageRoutingModule
  ],
  declarations: [UploadbankaccountPage]
})
export class UploadbankaccountPageModule {}
