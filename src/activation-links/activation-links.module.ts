import { Module } from '@nestjs/common';
import { ActivationLinksService } from './activation-links.service';
import { ActivationLinksRepository } from './activation-links.repository';

@Module({
  providers: [ActivationLinksService, ActivationLinksRepository],
  exports: [ActivationLinksService],
})
export class ActivationLinksModule {}
