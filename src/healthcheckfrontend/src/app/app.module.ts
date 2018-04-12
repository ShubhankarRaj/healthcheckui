import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ViewChild, ViewContainerRef, ComponentFactoryResolver}  from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProjectService } from './app-services/project.service';
import { UtilService } from './app-services/util.service';
import { HealthcheckService } from './app-services/healthcheck.service';
import { LoginService } from './app-services/login.service';
import { RegisterService } from './app-services/register.service';

import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent } from './app.component';
import { ProjectAdminComponent } from './project-admin/project-admin.component';
import { HealthcheckAdminComponent } from './healthcheck-admin/healthcheck-admin.component';
import { HealthcheckDashboardComponent } from './healthcheck-dashboard/healthcheck-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    ProjectAdminComponent,
    HealthcheckAdminComponent,
    HealthcheckDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PdfViewerModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, ProjectService, UtilService, HealthcheckService, LoginService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
