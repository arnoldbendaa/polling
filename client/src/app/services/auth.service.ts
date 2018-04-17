import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { serverUrl } from 'app/config/globals';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService {
	authToken: any;
	user: any;
	constructor(private http:HttpClient) {
	  this.loggedIn();
  }

	registerUser(user){
		let headers = new Headers();
		headers.append('Content-Type','application/json');

		return this.http.post(serverUrl + 'api/clients', user)
		.map(res => res);
	}

	authenticateUser(user){
		console.log("authenticate");
		let headers = new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post(serverUrl + 'api/Clients/login',user)
		.map(res => res);
	}

	getProfile(){
		let headers = new Headers();

		this.loadToken();
		headers.append('Authorization', this.authToken);

		headers.append('Content-Type','application/json');
		return this.http.get(serverUrl + 'users/profile')
		.map(res => res);
	}

	storeUserData(token, user){
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		if(token)
			localStorage.setItem('isLoggedin','1');
		this.authToken = token;
		this.user = user;
	}

	loadToken(){
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	checkLoggedIn(){
    this.loadToken();
    return this.http.get(serverUrl + 'api/loginTests?access_token='+this.authToken)
      .map(res=>res);

  }
  loggedIn(){
      this.checkLoggedIn().subscribe(data=>{
        localStorage.setItem("is_login",'1');
      },error=>{
        localStorage.setItem("is_login",'0');
      });
      return localStorage.getItem("is_login")=='1';
  }

	logout(){
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}
  request_password_reset(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(serverUrl + 'request-password-reset',user)
    .map(res=>res);
  }
  reset_password(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(serverUrl + 'api/Clients/reset-password?access_token='+user.access_token,user)
      .map(res=>res);
  }
}
