import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  // @Cron('* * * * * *')
  // @Interval(2000)
  // handleCron() {
  //   console.log(new Date());
  //   Logger.log('hi');
  //   this.logger.debug('Called when the current second is 45');
  // }
}
