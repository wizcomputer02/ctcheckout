import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncryptedcardPage } from './encryptedcard.page';

const routes: Routes = [
  {
    path: '',
    component: EncryptedcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncryptedcardPageRoutingModule {}
