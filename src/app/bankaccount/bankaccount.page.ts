import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-bankaccount',
  templateUrl: './bankaccount.page.html',
  styleUrls: ['./bankaccount.page.scss'],
})
export class BankaccountPage implements OnInit {

  public cards: any;
  public banks: any;
  public isCardShown: boolean = false;
  public isBankShown: boolean = false;
  public user_email: any;

  constructor(public navCntl:NavController,
    public loadingController:LoadingController,
    public storage: Storage,
    public api:ApiServiceService) { }

  ngOnInit() {
   
  }
  ionViewWillEnter() {
    this.getInfo();
   
  }
 
  public uploadbankaccount() {
    this.navCntl.navigateForward('/uploadbankaccount')
  }

  public uploadcreditdebitcard(){
    this.navCntl.navigateForward('/uploadcreditdebitcard')
  }

  public async getCardListing(userEmail){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    this.api.getCardListing(userEmail).pipe(finalize(() => {
     loading.dismiss();
    })).subscribe((response: any) => {
    
      if (response.length) {
        this.cards = response;
        this.isCardShown = true;
        console.log("Get Card Listing",   this.cards );
      }else if(response.length == 0){
        this.isCardShown = false;
      }
    }, err => {
      this.api.hideLoader();
      console.log("Error", err)
      if (err.status == "401") {
        this.api.showToast("Please re login to the app", 2000, "bottom");
      } else {
        this.api.showToast("Try again", 2000, "bottom");
      }

    })
  }


  public async getBankAccount(userEmail){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    this.api.getBankListing(userEmail).pipe(finalize(() => {
      loading.dismiss();
    })).subscribe((response: any) => {
      if (response.length) {
        this.banks = response;
        this.isBankShown = true;
        console.log("Bank Account Response:",  response );
      }else if(response.length == 0){
        this.isBankShown = false;
      }
    }, err => {
      this.api.hideLoader();
      console.log("Error", err)
      if (err.status == "401") {
        this.api.showToast("Please re login to the app", 2000, "bottom");
      } else {
        this.api.showToast("Try again", 2000, "bottom");
      }

    })
  }

  getInfo(){
    this.storage.get('user').then((val) => {
      this.user_email = val.user_email
      this.getBankAccount(this.user_email);
      this.getCardListing(this.user_email);
  });
  }

}
