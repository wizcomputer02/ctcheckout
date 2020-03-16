import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

import {HttpHeaders} from '@angular/common/http';
const ENDPOINT_URL = environment.endpointURL;
@Injectable({
providedIn: 'root'
})
export class DataService {
items: any[] = [];
page = 1;
totalPages = 1;
constructor(private http: HttpClient, public authenticationService: AuthenticationService) {
}
forgotPassword(email) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
     const  url = 'https://thecyberworld.org/ctcheckout';
   const consumerKey = 'ck_6a24d5603769326efce9742dcf70534e82e9a7d4';
  const consumerSecret = 'cs_f50e53e0d986b03eb078dbe87834830aa04408b5';
    const data = `email=${email}`;
    return new Promise(resolve => {
      this.http
        .post(
          `${url}//wp-json/wp/v2/users/lostpassword?user_login=test?consumer_key=${
            consumerKey
          }&consumer_secret=${consumerSecret}`,
          data,
          { headers: header }
        )
        .subscribe(customerData => {
          resolve(customerData);
        });
    });
  }
createUser(email, username, password) {
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
     const  url = 'https://thecyberworld.org/ctcheckout';
   const consumerKey = 'ck_6a24d5603769326efce9742dcf70534e82e9a7d4';
  const consumerSecret = 'cs_f50e53e0d986b03eb078dbe87834830aa04408b5';
    const data = `username=${username}&email=${email}&password=${password}`;
    return new Promise(resolve => {
      this.http
        .post(
          `${url}/wp-json/wc/v3/customers?consumer_key=${
            consumerKey
          }&consumer_secret=${consumerSecret}`,
          data,
          { headers: header }
        )
        .subscribe(customerData => {
          resolve(customerData);
        });
    });
  }
/**
* Gets a page of posts or all posts formerly fetched
*/
getPosts(): any {
if (this.items.length > 0) {
return of(this.items);
} else {
const user = this.authenticationService.getUser();
if (user) {
return this.http.get(ENDPOINT_URL + 'wp/v2/posts?_embed&categories=18&status=any&token=' + user.token,
    {observe: 'response', headers: {'Authorization': 'Bearer ' + user.token}})
    .map(this.processPostData, this);
} else {
return this.http.get(ENDPOINT_URL + 'wp/v2/posts?_embed&categories=18', {observe: 'response'})
    .map(this.processPostData, this);
}
}
}
/**
* Gets the next page of posts
*/
getMorePosts(): any {
this.page++;
return this.http.get(ENDPOINT_URL + 'wp/v2/posts?_embed&page=' + this.page, {observe: 'response'})
.map(this.processPostData, this);
}
// A place for post-processing, before making the fetched data available to view.
processPostData(resp: HttpResponse<any[]>) {
this.totalPages = +resp.headers.get('X-WP-TotalPages'); // unary (+) operator casts the string to a number
resp.body.forEach((item: any) => {
this.items.push(item);
});
return this.items;
}
getPostBySlug(slug): any {
return this.items.find(item => item.slug === slug);
}
hasMorePosts() {
return this.page < this.totalPages;
}
}