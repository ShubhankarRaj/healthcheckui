import { Component } from '@angular/core';
import { LoginInfo } from './logininfo';
import { UserInfo } from './userinfo';

import { LoginService } from './app-services/login.service';
import { RegisterService } from './app-services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QA-STAGING ENV HEALTHCHECK';
  isClassVisible: boolean = false;
  isLoggedIn: boolean = false;
  logingUser: LoginInfo = new LoginInfo();
  logginSuccessful: boolean = true;
  userInfo: UserInfo = new UserInfo();
  userId: string;
  userEmailId: string;
  userGroupEmailId: string;

  constructor(
  	private loginService: LoginService,
  	private regsiterService: RegisterService,
  	){  }

  loginUser(loginData: LoginInfo): void {
    this.loginService.loginUser(loginData)
    .then((response) => {
      
      console.log(response);
      this.userId = response.mmtId;
      this.userEmailId = response.mmtEMailId;
      this.userGroupEmailId = response.mmtGroupEMailId;
      this.isLoggedIn = true;
      this.isClassVisible = false;
    })
    }
  }
