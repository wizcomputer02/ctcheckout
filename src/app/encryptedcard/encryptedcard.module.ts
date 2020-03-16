import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncryptedcardPageRoutingModule } from './encryptedcard-routing.module';

import { EncryptedcardPage } from './encryptedcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncryptedcardPageRoutingModule
  ],
  declarations: [EncryptedcardPage]
})
export class EncryptedcardPageModule {}
