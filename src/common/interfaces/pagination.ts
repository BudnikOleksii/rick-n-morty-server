export interface IInfoData {
  total: number;
  next: string;
  prev: string;
  pages: number;
}

export interface IPaginatedResult<T> {
  info: IInfoData;
  result: T[];
}
