export interface IResult {
  storeId: string;
  fullUrl: string;
}

export interface IResultSummary extends IResult {
  fileName: string;
}
