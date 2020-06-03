import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  { 
    path: 'post/:id', 
    loadChildren: './post/post.module#PostPageModule' 
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./withdraw/withdraw.module').then( m => m.WithdrawPageModule)
  },
  {
    path: 'encryptedcard',
    loadChildren: () => import('./encryptedcard/encryptedcard.module').then( m => m.EncryptedcardPageModule)
  },
  {
    path: 'bankaccount',
    loadChildren: () => import('./bankaccount/bankaccount.module').then( m => m.BankaccountPageModule)
  },
  {
    path: 'uploadbankaccount',
    loadChildren: () => import('./uploadbankaccount/uploadbankaccount.module').then( m => m.UploadbankaccountPageModule)
  },
  {
    path: 'uploadcreditdebitcard',
    loadChildren: () => import('./uploadcreditdebitcard/uploadcreditdebitcard.module').then( m => m.UploadcreditdebitcardPageModule)
  },
  
  {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  {path: ':slug', loadChildren: './post/post.module#PostPageModule'},
  
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
