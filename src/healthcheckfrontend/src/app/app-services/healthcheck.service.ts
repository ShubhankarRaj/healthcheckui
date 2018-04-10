import { Injectable } from '@angular/core';
import { HealthCheck } from '../healthcheck';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class HealthcheckService {

  private baseUrl = environment.BASEURL;
  hcdata: HealthCheck[];
  newhcData: HealthCheck = new HealthCheck();
  

  constructor(
    private http: Http) { }

  getHealthCheckById(hcheckId: string): Promise<HealthCheck> {
    return this.http.get(this.baseUrl + '/hcheck/id/' + hcheckId)
      .toPromise()
      .then(response => response.json() as HealthCheck)
      .catch(this.handleError);
  }

 addHealthcheck(healthcheckData: HealthCheck): Promise<HealthCheck> {
    healthcheckData.emailIdOfCreatedBy = localStorage.getItem("userEmail");
    healthcheckData.groupEmailId = localStorage.getItem("groupEmail");
    return this.http.post(this.baseUrl + '/hcheck/add', healthcheckData)
      .toPromise().then(response => response.json() as HealthCheck)
      .catch(this.handleError);
  }

 deleteHealthcheckData(healthcheckId: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/hcheck/delete/' + healthcheckId)
      .toPromise()
      .catch(this.handleError);
  }

  updateHealthCheck(healthcheckData: HealthCheck): Promise<HealthCheck> {
    return this.http.put(this.baseUrl + '/hcheck/' + healthcheckData.healthCheckId, healthcheckData)
      .toPromise()
      .then(response => response.json() as HealthCheck)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }  

  getHealthChecksByFilter(selectedEnv:string, selectedProject:string): Promise<any> {
    return this.http.get(this.baseUrl + '/hcheck/filterhc/' + selectedEnv + '/' + selectedProject)
      .toPromise()
      .then(response => response.json() as HealthCheck[])
      .catch(this.handleError);
  }

}
