import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadbankaccountPage } from './uploadbankaccount.page';

const routes: Routes = [
  {
    path: '',
    component: UploadbankaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadbankaccountPageRoutingModule {}
