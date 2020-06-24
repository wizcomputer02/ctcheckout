import { Injectable } from '@angular/core';
import  * as firebase from "firebase";
import { AuthenticationService } from './authentication.service';
import { OrderServiceService } from './order-service.service';
import { Router } from '@angular/router';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1LSDh6J9oHnKdw9rwXH_zziXrkmjrtOA",
  authDomain: "mrhubby-581b3.firebaseapp.com",
  databaseURL: "https://mrhubby-581b3.firebaseio.com",
  projectId: "mrhubby-581b3",
  storageBucket: "mrhubby-581b3.appspot.com",
  messagingSenderId: "755938913834",
  appId: "1:755938913834:web:de9fcd32cc4ebce44c5d53"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( 
    public authenticationService: AuthenticationService,
    public orderService: OrderServiceService,
    public router: Router ) { 
  }

  init() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    this.authState();
  }

  authState() {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log('on state change', user);
        // User is signed in
        this.getUserData( user.email );
      } else {
        // No user is signed in.
      }
    });
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  signOut(){
    return firebase.auth().signOut();
  }

  getUserData ( email: string ) {
    this.orderService.orders = [];
    console.log('orderlist length', this.orderService.orderlist.length);
    
    if ( this.orderService.orderlist.length > 0 ) {
      for ( let order of this.orderService.orderlist ) {

        if ( order['Order']['Billing']['Email'].toLocaleLowerCase() === email.toLocaleLowerCase() ) {

          this.orderService.orders.push(order);
          if ( this.authenticationService.user === null 
            || 'undefined' == typeof this.authenticationService.user  ) {

            let response = {
              'user_display_name' : order['Order']['Billing']['FullName'],
              'user_email' : order['Order']['Billing']['Email']
            };

            this.authenticationService.setUser(response);

            this.router.navigateByUrl('/home');
          }
        }
      }
    }


  }

  hasOrders( email: string ) {

    if ( this.orderService.orderlist.length > 0 ) {
      for ( let order of this.orderService.orderlist ) {

        if ( order['Order']['Billing']['Email'].toLocaleLowerCase() === email.toLocaleLowerCase() ) {
          return true;
        }
      }
    }

    return false;

  }
  
}
