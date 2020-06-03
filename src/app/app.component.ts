import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {DataService} from './services/data.service';
import {environment} from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {
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
      title: 'Transactions',
      url: '/transactions',
      icon: 'md-copy'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
	public dataService: DataService
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
