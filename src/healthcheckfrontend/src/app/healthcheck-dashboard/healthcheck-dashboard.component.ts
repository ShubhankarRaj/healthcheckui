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
  AllhealthChecks: HealthCheck[];
  envTypes: Array<string>;
  uniqueProjectNames: string[] = [];
  filterProjectNames: HealthCheck[] = [];
  healthCheckById: HealthCheck = new HealthCheck();
  public timer;
  subscription: ISubscription;
  selectedEnv: string;
  selectedProject:string;


  constructor(
  	private healthCheckService: HealthcheckService,
    private utilService: UtilService,
    private projectService: ProjectService,
    private http: Http) { 
  }

  ngOnInit() {
    this.envTypes = this.utilService.envTypes;
    this.healthCheckService.getProjects()
    .then(healthChecks => this.filterProjectNames = healthChecks );
     this.healthCheckService.getAllHealthCheck()
     .then(healthChecks => this.AllhealthChecks = healthChecks );
  }

  getHealthChecksByEnv(selectedEnv: string): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    
    this.timer = Observable.timer(500,3000);
    this.subscription = this.timer.subscribe(() => {
      this.selectedEnv = selectedEnv;
      this.healthCheckService.getHealthChecksForAnEnv(selectedEnv)
      .then(healthChecks => this.healthChecks = healthChecks ) 
      .then(() => {
        for(let healthCheck of this.healthChecks){
          this.uniqueProjectNames.push(healthCheck.projectName);
        }
        this.uniqueProjectNames = Array.from(new Set(this.uniqueProjectNames));
      });
    });
  }

  getHealthCheckByHealthCheckId(healthCheckId: string): void {
    this.healthCheckService.getHealthCheckById(healthCheckId)
    .then(healthCheckById => this.healthCheckById = healthCheckById);
  }

}
