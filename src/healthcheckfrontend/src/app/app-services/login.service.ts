import { Injectable } from '@angular/core';
import { LoginInfo } from '../logininfo';
import { UserInfo } from '../userinfo';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';

@Injectable()
export class LoginService {
	private baseUrl = environment.BASEURL;
  

  constructor(
    private http: Http,
     private _router: Router,
     private alertsService: AlertsService
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

  checkCredentials(): boolean {
      if(localStorage.getItem("loggedinUser") && (localStorage.getItem("loggedinUser") != '')){
        return true;
      } else {
        this._router.navigate(['dashboard']);
        return false;
      }
    }
}
