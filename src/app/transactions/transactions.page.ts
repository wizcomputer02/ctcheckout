import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { finalize, retry } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { from } from 'rxjs';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  selectedSegment: any;
  fromDate: any = "";
  toDate: any = "";
  paymentstatus: any = "SUCCESS";
  history: any;
  historyData: any;
  falureData: any;
  cardToken: any = "";
  cards:any;
  user_email: any;

  constructor(public api: ApiServiceService,
    public storage:Storage,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.paymentstatus = "SUCCESS"
    this.selectedSegment = "pending";
  }

  ionViewDidEnter() {
    console.log("ion view enter");
    this.getInfo();
  }

  ngOnDestroy() {
    this.api.hideLoader();
  }


  
  segmentChanged(event) {
  
    if (event.detail.value == 'pending') {
     this.historyData = this.history.filter(res => res.paymentStatus == "FAILED")
  }
  if (event.detail.value == 'completed') {
    this.historyData = this.history.filter(res => res.paymentStatus == "completed");
  }
  }


  public async getCardListing(email){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    this.api.getCardListing(email).pipe(finalize(() => {
     loading.dismiss();
    })).subscribe((response: any) => {
    
      if (response.length) {
        this.cards = response;
      
      }else if(response.length == 0){
      
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

  selectedCard(event){
    console.log("event", event.detail.value)
    this.cardToken = event.detail.value.token
  }

  async getTrancation() {
    if (this.fromDate == "") {
      this.api.showToast("From Date cannot be empty", 3000, "bottom")
    } else if (this.toDate == "") {
      this.api.showToast("To Date cannot be empty", 3000, "bottom")
    } else if (this.toDate < this.fromDate) {
      this.api.showToast("Invalid Dates!!", 3000, "bottom");
    }else if(this.cardToken == ""){
      this.api.showToast("Please select card!!", 3000, "bottom");
    }
    
    else {
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      loading.present();
      this.api.getTrancations(this.fromDate, this.toDate,this.cardToken, this.paymentstatus, 0,
      ).pipe(finalize(() => {
        this.api.hideLoader();
      })).subscribe((response: any) => {
        if (response.numberOfElements) {
          this.history = response.orders;
          this.falureData = response.orders;
          this.historyData = response.orders.filter(res => res.paymentStatus == "FAILED");
          console.log("History Data", this.historyData)
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

  }

  getInfo(){
    this.storage.get('user').then((val) => {
      this.user_email = val.user_email
      this.getCardListing(this.user_email);
  });
  }


}
