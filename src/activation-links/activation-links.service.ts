import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

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
}
