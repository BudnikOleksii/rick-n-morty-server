import { BadRequestException, Injectable } from '@nestjs/common';
import { ActivationLink, User } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ActivationLinksRepository } from './activation-links.repository';

@Injectable()
export class ActivationLinksService {
  constructor(private activationLinksRepository: ActivationLinksRepository) {}

  createActivationLink(userId: User['id']) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    return this.activationLinksRepository.createActivationLink({
      user: { connect: { id: userId } },
      expiresAt,
    });
  }

  async getActivationLink(id: ActivationLink['id']) {
    const activationLink = await this.activationLinksRepository.getActivationLink(id);

    if (!activationLink) {
      throw new BadRequestException('Invalid activation link');
    }

    return activationLink;
  }

  deleteActivationLink(id: ActivationLink['id']) {
    return this.activationLinksRepository.deleteActivationLink(id);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async removeExpiredLinks() {
    const { count } = await this.activationLinksRepository.removeExpiredLinks();
    console.log(`${count} activation links were deleted`);
  }
}
