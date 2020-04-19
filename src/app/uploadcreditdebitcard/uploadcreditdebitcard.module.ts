import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadcreditdebitcardPageRoutingModule } from './uploadcreditdebitcard-routing.module';

import { UploadcreditdebitcardPage } from './uploadcreditdebitcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadcreditdebitcardPageRoutingModule
  ],
  declarations: [UploadcreditdebitcardPage]
})
export class UploadcreditdebitcardPageModule {}
