import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UserInfo } from '../userinfo';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {
	private baseUrl = environment.BASEURL;

  constructor(private http: Http) { }

  registerNewUser(userDate: UserInfo): Promise<UserInfo> {
  	return this.http.post(this.baseUrl + '/user/register', userDate)
	  .toPromise().then(response => response.json() as UserInfo)
	  .catch(this.handleRegistrationError);
  }

  private handleRegistrationError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }

}
