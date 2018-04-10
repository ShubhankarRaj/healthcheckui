export class HealthCheck {
  healthCheckId: string;
  projectName: string;
  envName: string;
  componentName: string;
  ipAddress: string;
  applicationPort: string;
  healthCheckPort: string;
  healthCheckUrl: string;
  serverStatus: string;
  dailyNotificationStatus: boolean;
  countOfDaysForBlockingNotification: string;
  emailIdOfCreatedBy: string;
  groupEmailId: string;
}
