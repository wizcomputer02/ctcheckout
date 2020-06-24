import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {DataService} from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

signup_form: FormGroup;
error_message: string;

constructor(
public formBuilder: FormBuilder,
public loadingController: LoadingController,
public dataService: DataService,
public firebaseService: FirebaseService,
private router: Router) { }

  ngOnInit() {
    this.signup_form = this.formBuilder.group({
      /*  username: new FormControl('', Validators.compose([
      Validators.required
      ])), */
        email: new FormControl('', Validators.compose([
      Validators.required
      ])),
        password: new FormControl('', Validators.required)
    });
  }

  async signup(value) {
    const loading = await this.loadingController.create({
    duration: 5000,
    message: 'Please wait...'
    });
    loading.present();

    //this.dataService.createUser(value.username, value.email, value.password)
    if ( this.firebaseService.hasOrders(value.email.trim()) ) {

      this.firebaseService.signUp(value.email, value.password)
      .then((user)=>{
        
        /* store user in storage and variable will be on firebase service onauthstatechange() */
        loading.dismiss();
        console.log('sign-up user', user);
      }).catch((error)=>{

        this.error_message = error['message'] ? error['message'] : 'Invalid login!';
        loading.dismiss();
        console.log('error while signup from firebase :>> ', error);
      }) 

    } else {
      loading.dismiss();
      this.error_message = 'User not found at ctcheckoutstore.com!';
    }
     
  }
}