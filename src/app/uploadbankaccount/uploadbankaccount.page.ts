import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-uploadbankaccount',
  templateUrl: './uploadbankaccount.page.html',
  styleUrls: ['./uploadbankaccount.page.scss'],
})
export class UploadbankaccountPage implements OnInit {
  public user_email:any;
  public bankForm: FormGroup;
  constructor(public navCntl: NavController,
    public api: ApiServiceService,
    private formBuilder: FormBuilder,
    public storage: Storage,
    public loadingController:LoadingController) { }

  ngOnInit() {

    this.bankForm = this.formBuilder.group({
      user_id:['40'],
      account_number: ['', [Validators.required, Validators.minLength(12)]],
      account_confrim_num : ['', [Validators.required, Validators.minLength(12)]],
      routing_number:['', [Validators.required]],

      
  });
  this.getInfo()

  }

  async uploadbankaccount(){
  
    console.log("Bank form", this.bankForm.value);
    if(this.bankForm.value.account_number == ""){
      this.api.showToast("Account Number cant be empty",2000, "bottom");
    } if(this.bankForm.value.account_confrim_num == ""){
      this.api.showToast("Please confrim Account Number",2000, "bottom");
    }else if(this.bankForm.value.routing_number == ""){
      this.api.showToast("Please Enter Routing Number", 2000,"bottom");
    }else if(this.bankForm.value.account_number.length < 12){
      this.api.showToast("Account number is 12 digit", 2000,"bottom");
    }else if(this.bankForm.value.routing_number.length < 8){
      this.api.showToast("Routing number is 7 digit", 2000,"bottom");
    }else if(this.bankForm.value.account_confrim_num != this.bankForm.value.account_number){
      this.api.showToast("Account Number and confrim account number not match!", 2000,"bottom");
    }else{ 
     
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      loading.present();

      const bankForm = {
        email: this.user_email, 
        routing_number:this.bankForm.value.routing_number, 
        account_number:this.bankForm.value.account_number}
      this.api.addBank(bankForm).pipe(finalize(() => {
        loading.dismiss();
      })).subscribe((response: any) => {
          if(response.success){
            this.api.showToast(response.message,2000,"bottom")
            
            this.bankForm.patchValue({
              account_number:"",
              account_confrim_num:'',
              routing_number:''

            })
            
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