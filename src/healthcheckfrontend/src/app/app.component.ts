import { Component } from '@angular/core';
import { LoginInfo } from './logininfo';
import { UserInfo } from './userinfo';

import { LoginService } from './app-services/login.service';
import { RegisterService } from './app-services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QA-STAGING ENV HEALTHCHECK';
  isClassVisible: boolean = false;
  isLoggedIn: boolean = false;
  userTryingToLogin: LoginInfo = new LoginInfo();
  logginSuccessful: boolean = true;
  userInfo: UserInfo = new UserInfo();
  userId: string;
  userEmailId: string;
  userGroupEmailId: string;
  registeringUser: boolean = false;

  constructor(
  	private loginService: LoginService,
  	private regsiterService: RegisterService,
    private _router: Router
  	){  }

  loginUser(loginData: LoginInfo): void {

    this.loginService.loginUser(loginData)
    .then((loginResponse) => {
      this.userId = loginResponse.mmtId;
      this.userEmailId = loginResponse.mmtEMailId;
      this.userGroupEmailId = loginResponse.mmtGroupEMailId;
      this.isLoggedIn = true;
      this.isClassVisible = false;
      localStorage.setItem("loggedinUser", this.userId);
      localStorage.setItem("userEmail",this.userEmailId);
      localStorage.setItem("groupEmail",this.userGroupEmailId );
    })
    }

    loadLoginForm(): void {
      this.isLoggedIn = false;
      this.registeringUser = false;
    }

    loadRegisterForm(): void {
      this.registeringUser = true;
    }

    registerUser(userData: UserInfo): void {
      console.log(userData);
      this.regsiterService.registerNewUser(userData)
      .then((registrationResponse) => {
        this.userId = registrationResponse.mmtId;
      this.userEmailId = registrationResponse.mmtEMailId;
      this.userGroupEmailId = registrationResponse.mmtGroupEMailId;
      this.isLoggedIn = true;
      this.isClassVisible = false;
      })
    }

    logoutUser(): void {
      this.userId = null;
      this.userEmailId = null;
      this.userGroupEmailId = null;
      this.isLoggedIn = false;
      this.isClassVisible = false;
      localStorage.clear();
      this._router.navigate(['dashboard']);
    }
  }
