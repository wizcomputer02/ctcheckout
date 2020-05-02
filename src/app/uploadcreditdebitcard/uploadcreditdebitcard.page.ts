import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-uploadcreditdebitcard',
  templateUrl: './uploadcreditdebitcard.page.html',
  styleUrls: ['./uploadcreditdebitcard.page.scss'],
})
export class UploadcreditdebitcardPage implements OnInit {

  public cardForm: FormGroup;
  public isFormValid:boolean = false;
  public user_email:any;
  constructor(public navCntl: NavController,
    public api: ApiServiceService,
    private formBuilder: FormBuilder,
    public storage: Storage,
    public loadingController:LoadingController) { }

  ngOnInit() {
    
    this.cardForm = this.formBuilder.group({
      cardno: ['', [Validators.required, Validators.minLength(12)]],
      expiry:['', [Validators.required]],
      exp_month: [''],
      exp_year: ['',],
      cvv: ['',[Validators.required, Validators.minLength(3)]]
  });

  this.getInfo()
}

  public async uploadbankaccount(){
    
    if(this.cardForm.value.cardno == ""){
      this.api.showToast("Card Number cant be empty",2000, "bottom");
    }else if(this.cardForm.value.expiry == ""){
      this.api.showToast("Please Select Expiry Month", 2000,"bottom");
    }else if(this.cardForm.value.cvv == ""){
      this.api.showToast("please enter cvv number", 2000,"bottom");
    }else if(this.cardForm.value.cvv.length < 3){
      this.api.showToast("CVV is 3 Digit number", 2000,"bottom");
    }else{
     
      this.cardForm.value.exp_month =  this.cardForm.value.expiry.split("-")[1];
      this.cardForm.value.exp_year =  this.cardForm.value.expiry.split("-")[0];

      const cardData = {
        email:this.user_email,
        cardno:this.cardForm.value.cardno,
        exp_year:this.cardForm.value.exp_year,
        exp_month:this.cardForm.value.exp_month,
        cvv:this.cardForm.value.cvv,
      }
      console.log("Card",cardData);
      
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      loading.present();
      this.api.addCard(cardData).pipe(finalize(() => {
        loading.dismiss();
      })).subscribe((response: any) => {
          if(response.success){
            this.api.showToast(response.message,2000,"bottom")
            this.navCntl.pop();
          }else{
            this.api.showToast(response.message,2000,"bottom")
            this.navCntl.pop();
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
    });
    }
    

}
