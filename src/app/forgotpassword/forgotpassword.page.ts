import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
forgot_form: FormGroup;
  constructor(
  public formBuilder: FormBuilder,
public loadingController: LoadingController,
public dataService: DataService,
private router: Router) { }

  ngOnInit() {
	  this.forgot_form = this.formBuilder.group({
email: new FormControl('', Validators.compose([
Validators.required
]))

});
  }
async forgot(value) {
const loading = await this.loadingController.create({
duration: 5000,
message: 'Please wait...'
});
loading.present();
this.dataService.forgotPassword(value.email)
}
}
