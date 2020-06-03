import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsPage } from './transactions.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionsPage,
    children: [
      {
        path: 'pending',
        loadChildren: () => import('../bankaccount/bankaccount.module').then( m => m.BankaccountPageModule)
      },
      {
        path: 'completed',
        loadChildren: () => import('../withdraw/withdraw.module').then( m => m.WithdrawPageModule)
      },
      {
        path: '',
        redirectTo: '/transactions/pending',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/transactions/pending',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsPageRoutingModule {}
