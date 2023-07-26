import { IInfoData } from '../interfaces';

export const createInfoData = (
  total: number,
  page: number,
  limit: number,
  endpoint: string
): IInfoData => {
  const pages = Math.ceil(total / limit);

  return {
    total,
    next: page >= pages ? null : `${endpoint}?page=${page + 1}&limit=${limit}`,
    prev: page <= 1 ? null : `${endpoint}?page=${page - 1}&limit=${limit}`,
    pages,
  };
};
