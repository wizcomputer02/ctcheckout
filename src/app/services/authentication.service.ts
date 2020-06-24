import {Injectable, NgZone} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage';

const ENDPOINT_URL = environment.endpointURL;
@Injectable({
providedIn: 'root'
})
export class AuthenticationService {

public user: any;

constructor(private http: HttpClient,
    public storage: Storage) {
}
    /**
    * Login to WordPress via JWT. Returns object with the following shape:
    * {
    *      token: "eyJ0eXAiOiJKV1QiLCJhbGci...",
    *      user_email: "someuser@somewhere.com",
    *      user_nicename: "wordpress",
    *      user_display_name: "wordpress"
    * }
    */
  /*   doLogin(username, password) {
        return this.http.post(ENDPOINT_URL + 'jwt-auth/v1/token', {
            username: username,
            password: password
        });
    }
    validateAuthToken(token) {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Basic ' + token);
        return this.http.post(ENDPOINT_URL + 'jwt-auth/v1/token/validate?token=' + token,
        {}, {headers: headers});
    } */
    getUser() {
        return this.user;
    }

    setUser(user) {
        console.log('user authenticationservice :>> ', user);
        this.user = user;
        this.storage.set('user', user);
    }

    removeUser() {
        this.user = null;
        this.storage.remove('user');
    }
}