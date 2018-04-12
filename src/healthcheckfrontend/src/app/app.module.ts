import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver}  from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProjectService } from './app-services/project.service';
import { UtilService } from './app-services/util.service';
import { HealthcheckService } from './app-services/healthcheck.service';
import { LoginService } from './app-services/login.service';
import { RegisterService } from './app-services/register.service';
import { AlertsService } from './app-services/alerts.service';

import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent } from './app.component';
import { ProjectAdminComponent } from './project-admin/project-admin.component';
import { HealthcheckAdminComponent } from './healthcheck-admin/healthcheck-admin.component';
import { HealthcheckDashboardComponent } from './healthcheck-dashboard/healthcheck-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertsComponent } from './alerts/alerts.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectAdminComponent,
    HealthcheckAdminComponent,
    HealthcheckDashboardComponent,
    AlertsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, ProjectService, UtilService, HealthcheckService, LoginService, RegisterService, AlertsService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
