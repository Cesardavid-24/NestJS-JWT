import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

// se encarga de manejar las solicitudes http
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
