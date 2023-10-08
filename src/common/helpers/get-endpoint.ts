import type { Request } from 'express';

export const getEndpoint = (req: Request) => {
  return `${req.protocol}://${req.get('Host')}${req.originalUrl.split('?')[0]}`;
};
