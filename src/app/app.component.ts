import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public email;
  public username;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
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
    public storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getInfo();
    });
  }
  getInfo(){
    this.storage.get('user').then((val) => {
      if(val != null){
        this.email = val.user_email;
        this.username = val.user_display_name;  
      }
    });
  }
 

}
