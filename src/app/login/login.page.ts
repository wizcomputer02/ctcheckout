import { Component, OnInit, NgZone } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';
import {DataService} from '../services/data.service';
import { Storage } from '@ionic/storage';
import { OrderServiceService } from '../services/order-service.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
login_form: FormGroup;
error_message: string;

constructor(
public formBuilder: FormBuilder,
public loadingController: LoadingController,
public authenticationService: AuthenticationService,
public orderService: OrderServiceService,
public dataService: DataService,
public storage: Storage,
private router: Router,
public firebaseService: FirebaseService) {
}
ngOnInit() {
  this.login_form = this.formBuilder.group({
    email: new FormControl('', Validators.compose([
      Validators.required
    ])),
    password: new FormControl('', Validators.required)
  });
}

  async login(value) {

    const loading = await this.loadingController.create({
      duration: 5000,
      message: 'Please wait...'
    });
    loading.present();
    

    this.firebaseService.signin(value.email.trim(), value.password.trim())
    .then((user)=>{
      
      loading.dismiss();
      console.log('firebase login', user);

    }).catch((error)=>{
      
      loading.dismiss();

      this.error_message = error['message'] ? error['message'] : 'Invalid login!';
      console.log('error while login with firebase', error);
    })

  }

 

}
