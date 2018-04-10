import { Injectable } from '@angular/core';
import { LoginInfo } from '../logininfo';
import { UserInfo } from '../userinfo';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
	private baseUrl = environment.BASEURL;
  

  constructor(
    private http: Http,
     private _router: Router
    ) { }

  loginUser(loginData: LoginInfo): Promise<UserInfo> {
  	return this.http.post(this.baseUrl + '/user/login', loginData)
	  .toPromise().then(response => response.json() as UserInfo)
	  .catch(this.handleLoginError);
  }

  private handleLoginError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

checkCredentials(){
    if(localStorage.getItem("loggedinUser") != '') {
      return true;
    } else {
       this._router.navigate(['dashboard']);
    }
  }
}
