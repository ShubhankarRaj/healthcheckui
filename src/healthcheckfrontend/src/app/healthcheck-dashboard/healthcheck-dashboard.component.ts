import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { UtilService } from '../app-services/util.service';
import { HealthcheckService } from '../app-services/healthcheck.service';
import { HealthCheck } from '../healthcheck';
import { NgModule }  from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from "rxjs/Subscription";
import { ProjectService } from "../app-services/project.service";
import { LoginService } from '../app-services/login.service'; 

@Component({
  selector: 'app-healthcheck-dashboard',
  templateUrl: './healthcheck-dashboard.component.html',
  styleUrls: ['./healthcheck-dashboard.component.css']
})

@NgModule({
  imports: [CommonModule],
})

export class HealthcheckDashboardComponent implements OnInit {

  healthChecks: HealthCheck[];
  envTypes: Array<string>;
  uniqueProjectNames: string[] = [];
  filterProjectNames: Object[] = [];
  healthCheckById: HealthCheck = new HealthCheck();
  public timer;
  subscription: ISubscription;
  selectedEnv: string;
  selectedProject:string;


  constructor(
  	private healthCheckService: HealthcheckService,
    private utilService: UtilService,
    private _service:LoginService,
    private projectService: ProjectService,
    private http: Http) { 
  }

  ngOnInit() {
    this._service.checkCredentials();
    this.envTypes = this.utilService.envTypes;
    this.projectService.getProjects()
    .then(projects => this.filterProjectNames = projects );

  }

  getHealthChecksByEnv(selectedEnv: string): void {
    this.healthChecks = [];
    this.uniqueProjectNames = [];
    this.selectedEnv = selectedEnv;
    this.getHealthChecksByFilter(this.selectedEnv, this.selectedProject);
  }

  getHealthCheckByProject(selectedProject: string):void {
    this.healthChecks = [];
    this.uniqueProjectNames = [];
    this.selectedProject = selectedProject;
    this.getHealthChecksByFilter(this.selectedEnv, this.selectedProject);
  }

  getHealthCheckByHealthCheckId(healthCheckId: string): void {
    this.healthCheckService.getHealthCheckById(healthCheckId)
    .then(healthCheckById => this.healthCheckById = healthCheckById);
  }

  getHealthChecksByFilter(selectedEnv:string, selectedProject:string) {
    if(this.subscription){
      this.subscription.unsubscribe();
    }

    this.timer = Observable.timer(500,3000);
    this.subscription = this.timer.subscribe(() => {
      if(selectedEnv == undefined) {
        selectedEnv = "blank";
      }
      if(selectedProject == undefined) {
        selectedProject = "blank";
      }
      this.healthCheckService.getHealthChecksByFilter(selectedEnv, selectedProject)
      .then(healthChecks => this.healthChecks = healthChecks ) 
      .then(() => {
        for(let healthCheck of this.healthChecks){
          this.uniqueProjectNames.push(healthCheck.projectName);
        }
        this.uniqueProjectNames = Array.from(new Set(this.uniqueProjectNames));
      });
   });
 }

}
