import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './services/authentication.service';
import { OrderServiceService } from './services/order-service.service';
import { Router } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
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
    }
  ];

  constructor(
    private platform: Platform,
    public router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public storage: Storage,
    public authenticationService: AuthenticationService,
    public orderServices: OrderServiceService,
    public firebaseService: FirebaseService
  ) {
    
    this.initializeApp();
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getInfo();
      this.getOrderList();

      this.firebaseService.init();
    });
  }

  getInfo(){

    this.storage.get('user').then((val) => {
      if(val != null){
        this.authenticationService.user = val;
        
      } 
      
    });

  }

  getOrderList() {
    this.orderServices.getOrders()
    .then(res=>{
      console.log('orders-me', res);
      if ( res['data'].length > 0 ) {
        this.orderServices.orderlist = JSON.parse(res['data']);

        if ( this.authenticationService.user ) {
          /* Filter orderlist for current user */
          this.firebaseService.getUserData( this.authenticationService.user.user_email );
        }
      }
    }).catch(error=>{
      console.log('order error', error);
    })
  }

  logout() {
    this.firebaseService.signOut().then((res)=>{

      this.authenticationService.removeUser();
      this.router.navigateByUrl('/login');

    }).catch((error)=>{
      console.log('error while logout firebase :>> ', error);
    })
    

  }
 

}
