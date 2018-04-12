import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  envTypes: Array<string> = ["QA", "STAGING", "INTEGRATION"];
  numberOfDays: Array<number> = [1,2,3,4,5,6,7];
  constructor() { }

}
