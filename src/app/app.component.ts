import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Store',
      url: '/post/370',
      icon: 'cart'
    },
    {
      title: '1st transaction',
      url: '/post/337',
      icon: 'help-buoy'
    },
    {
      title: 'Card Issuance',
      url: '/post/363',
      icon: 'card'
    },
    {
      title: 'CT Checkout overview',
      url: '/post/329',
      icon: 'clipboard'
    },
    {
      title: 'Contact',
      url: '/post/314',
      icon: 'create'
    },
    {
      title: 'Account',
      url: '/login',
      icon: 'contact'
    },
    {
      title: 'Encrypted Card',
      url: '/encryptedcard',
      icon: 'md-card'
    },
    {
      title: 'Transactions',
      url: '/transactions',
      icon: 'md-copy'
    },
    {
      title: 'Withdraw Funds',
      url: '/withdraw',
      icon: 'md-cash'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
