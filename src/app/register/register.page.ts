import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
signup_form: FormGroup;
constructor(
public formBuilder: FormBuilder,
public loadingController: LoadingController,
public dataService: DataService,
private router: Router) { }

  ngOnInit() {
this.signup_form = this.formBuilder.group({
username: new FormControl('', Validators.compose([
Validators.required
])),
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
this.dataService.createUser(value.username, value.email, value.password)

}
}