import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  envTypes: Array<string> = ["QA", "STAGING", "INTEGRATION"];
  numberOfDays: Array<number> = [1,2,3,4,5,6,7];
  projectDeliveryEMailLists: Array<string> = ["Team-HCS-QA@makemytrip.com", "Payments-QA@makemytrip.com", "Hotels-QA@makemytrip.com", "Team-Tech-Flights@makemytrip.com", "bt-tech@makemytrip.com", "Team-Grounds-QA@makemytrip.com"];
  constructor() { }

}
