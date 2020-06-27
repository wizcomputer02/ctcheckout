import { Injectable } from '@angular/core';
import  * as firebase from "firebase";
import { AuthenticationService } from './authentication.service';
import { OrderServiceService } from './order-service.service';
import { Router } from '@angular/router';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx8_oEV8wzs8zLHD78EM-qbOtaeOZdQIQ",
  authDomain: "ctcheckout-26737.firebaseapp.com",
  databaseURL: "https://ctcheckout-26737.firebaseio.com",
  projectId: "ctcheckout-26737",
  storageBucket: "ctcheckout-26737.appspot.com",
  messagingSenderId: "175728067665",
  appId: "1:175728067665:android:60d43259e11a908ab52470"
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
