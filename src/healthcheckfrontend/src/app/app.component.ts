import { Component } from '@angular/core';
import { LoginInfo } from './logininfo';
import { UserInfo } from './userinfo';

import { LoginService } from './app-services/login.service';
import { RegisterService } from './app-services/register.service';
import { Router } from '@angular/router';
import { UtilService } from './app-services/util.service';
import { AlertsService } from './app-services/alerts.service';

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
  projectDeliveryEMailLists: Array<string>;
  promiseLogin: Promise<UserInfo>;
  loginErrorMessage: any;
  regErrorMessage: any;

  constructor(
  	private loginService: LoginService,
  	private regsiterService: RegisterService,
    private utilService: UtilService,
    private _router: Router
  	){  }

  ngOnInit(): void {
    this.projectDeliveryEMailLists = this.utilService.projectDeliveryEMailLists;
  }

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
    },
    error => {
      this.loginErrorMessage = "Either UserName or Password is incorrect";
    }
    )
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
      },
    error => {
      this.regErrorMessage = "Either UserName or Password is incorrect";
    }
    )
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
