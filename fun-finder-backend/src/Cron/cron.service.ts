// cron.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor() {
    this.scheduleCronJob();
  }

  private scheduleCronJob() {
    // Uruchamianie funkcji codziennie o 1:55
    cron.schedule('55 1 * * *', () => {
      this.logger.log('Uruchomiono funkcję.');
      // Dodaj logi przed i po wywołaniu funkcji, którą chcesz uruchamiać
      this.logger.log('Przed wykonaniem funkcji...');
      this.runYourFunction();
      this.logger.log('Po wykonaniu funkcji...');
    });
  }

  private runYourFunction() {
    // Tutaj umieść kod funkcji, którą chcesz uruchamiać
    this.logger.log('Wykonywanie funkcji...');
  }
}
