import { Module } from '@nestjs/common';

import { ActivationLinksRepository } from './activation-links.repository';
import { ActivationLinksService } from './activation-links.service';

@Module({
  providers: [ActivationLinksService, ActivationLinksRepository],
  exports: [ActivationLinksService],
})
export class ActivationLinksModule {}
