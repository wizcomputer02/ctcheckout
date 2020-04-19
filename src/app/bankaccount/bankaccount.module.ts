import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankaccountPageRoutingModule } from './bankaccount-routing.module';

import { BankaccountPage } from './bankaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankaccountPageRoutingModule
  ],
  declarations: [BankaccountPage]
})
export class BankaccountPageModule {}
