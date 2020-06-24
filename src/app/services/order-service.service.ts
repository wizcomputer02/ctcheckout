import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  public orders: any = [];
  public orderlist: any = [];
  
  constructor(private http: HTTP) {
  }

 

 /*  async getOrders() {
    try {
      const data = await this.http.get('https://www.ctcheckoutstore.com/content/admin/plugins/openapi/index.php?username=tom&password=Tom2020*&token=m6U5mLDByH0H99H4VIC11xLADXDNla0uXe8NhHXUkbk1h1bGguclgBWC8EwI9TtB&apiType=json&call=GetOrders', this.getHeaders({
        'Content-Type':  'application/json'
      }))
        .toPromise();
      return data;
    }
    catch (e) {
      console.log('error while getting data from' + e)
      return e;
    }
  } */

  
  getOrders() {
    return this.http.get('https://www.ctcheckoutstore.com/content/admin/plugins/openapi/index.php?username=tom&password=Tom2020*&token=m6U5mLDByH0H99H4VIC11xLADXDNla0uXe8NhHXUkbk1h1bGguclgBWC8EwI9TtB&apiType=json&call=GetOrders', {}, {});
  }

  getHeaders(obj: any){
    return {
      headers: new HttpHeaders(obj)
    }
  }


}

