import { Component, OnInit } from '@angular/core';
import { HealthCheck } from '../healthcheck';
import { NgForm } from '@angular/forms';
import { HealthcheckService } from '../app-services/healthcheck.service';
import { UtilService } from '../app-services/util.service';
import { ProjectService } from '../app-services/project.service';

@Component({
  selector: 'app-healthcheck-admin',
  templateUrl: './healthcheck-admin.component.html',
  styleUrls: ['./healthcheck-admin.component.css']
})

export class HealthcheckAdminComponent implements OnInit {
  healthChecks: HealthCheck[];
  filteredHealthCheck: Array<HealthCheck> = [];
  projects: Object[];
  newHealthCheck: HealthCheck = new HealthCheck();
  editing: boolean = false;
  editingHealthCheck: HealthCheck = new HealthCheck();
  envTypes: Array<string>;
  selectedEnv: string;
  selectedProject:string;

  constructor(
    private healthCheckService: HealthcheckService,
    private utilService: UtilService,
    private projectService: ProjectService,
    ) {  }

  ngOnInit(): void {
    this.envTypes = this.utilService.envTypes;
    this.getProjects();
  }

  getHealthCheckByEnv(selectedEnv: string): void {
    this.healthChecks = [];
    this.selectedEnv = selectedEnv;
    this.getHealthChecksByFilter(this.selectedEnv, this.selectedProject);
  }

  getHealthCheckByProject(selectedProject: string):void {
    this.healthChecks = [];
    this.selectedProject = selectedProject;
    this.getHealthChecksByFilter(this.selectedEnv, this.selectedProject);
  }

  addHealthcheck(newhcdetail: NgForm): void {
    this.healthCheckService.addHealthcheck(newhcdetail.value)
    .then(addHealthcheck => {
      newhcdetail.reset();
      this.newHealthCheck = new HealthCheck();
      this.healthChecks.unshift(addHealthcheck);
      this.getHealthChecksByFilter(this.selectedEnv, this.selectedProject);
    });

  }

  deleteHealthcheckData(healthCheckId: string): void {
    if(confirm("Are you sure you want to delete the HealthCheck?")){
      this.healthCheckService.deleteHealthcheckData(healthCheckId)
      .then(() => {
        this.getHealthChecksByFilter(this.selectedEnv, this.selectedProject);
      });
    }
  }

  updateHealthCheck(healthCheckData: HealthCheck): void {
    this.healthCheckService.updateHealthCheck(healthCheckData)
    .then(() => {
      this.clearEditing();
      this.getHealthChecksByFilter(this.selectedEnv, this.selectedProject);
    });
  }

  editHealthCheck(healthCheckData: HealthCheck, el): void {
    el.focus();
    this.editing = true;
    Object.assign(this.editingHealthCheck, healthCheckData);
  }


  clearEditing(): void {
    this.editingHealthCheck = new HealthCheck();
    this.editing = false;
  }

  getProjects(): void {
    this.projectService.getProjects()
    .then(projects => this.projects = projects );
  }

  getHealthChecksByFilter(selectedEnv:string, selectedProject:string) {
    if(selectedEnv == undefined) {
      selectedEnv = "blank";
    }
    if(selectedProject == undefined) {
      selectedProject = "blank";
    }
    this.healthCheckService.getHealthChecksByFilter(selectedEnv, selectedProject)
    .then(healthChecks => this.filteredHealthCheck = healthChecks );
  }
}

