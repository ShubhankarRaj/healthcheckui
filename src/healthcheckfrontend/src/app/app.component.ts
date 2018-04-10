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
  loggingUser: LoginInfo = new LoginInfo();

  constructor(
  	private loginService: LoginService,
  	private regsiterService: RegisterService,
  	){  }

  loginUser(loginData: LoginInfo): void {

  }
}
