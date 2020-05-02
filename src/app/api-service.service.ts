import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  BASE_URL = "https://team11.devhostserver.com/ctcheckout/checkout_api.php";
  TRANSACTION_API = "https://api.worldpay.com/v1/orders?environment=TEST&fromDate=2020-04-02&toDate=2020-04-02"
  isLoading = false;
  constructor(private http: HttpClient,
    protected loading: LoadingController, public toast: ToastController) {

  }

  async showLoader() {
    this.isLoading = true;
    return await this.loading.create({
      message: 'Please wait ...',
      spinner: 'circles'
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
      });
    });
  }

  hideLoader() {
    this.isLoading = false;
    return this.loading.dismiss();
  }

  private cardHeader = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':  'T_S_06385612-df57-4d79-845e-2a730dc27fff'}
  };

 
  private header = {
    headers: {
       'Content-Type': 'application/json',
      'Authorization':  'T_S_06385612-df57-4d79-845e-2a730dc27fff'}
  };
  


  /**
    * Get Transaction List
    */
  public getTrancations(from, to,token, trans, pagenumber) {

    const API = "https://team11.devhostserver.com/ctcheckout/checkout_api.php?api_name=get_all_transation&fromDate="+from+"&toDate="+ to +"&paymentstatus="+trans+
    "&pagenumber="+pagenumber+"&token="+token 
   console.log("API", API);
   return this.http.get(API, this.cardHeader); 

  }

  /**
    * Get Card Account List
    */
  public getCardListing(email){
    return this.http.get(this.BASE_URL+'?api_name=get_user_card_list&email='+email, this.header);
  }

  /**
    * Get Bank Account List
    */
   public getBankListing(userId){
    return this.http.get(this.BASE_URL+'?api_name=get_user_bank_details&email='+userId, this.header);
  }

  public addCard(cardData){
    return this.http.post(this.BASE_URL+'?api_name=create_customer_token',cardData, this.header);
  }

  public addBank(bankData){
      return this.http.post(this.BASE_URL+'?api_name=add_user_bank_details',bankData, this.header);
    }



  async showToast(message, duration, position) {
    const toast = await this.toast.create({
      message: message,
      duration: duration,
      position: position,
      color: 'dark'
    });
    toast.present();
  }
}
