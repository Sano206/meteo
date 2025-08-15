export type BriefingRequest = {
  id?: string;
  method: 'query';
  params: BriefingRequestParam[];
};

export type BriefingRequestParam = {
  id?: string;
  reportTypes: string[];
  stations?: string[];
  countries?: string[];
};

export type BriefingError = {
  code: number;
  message: string;
};

export type BriefingSuccessResponse = {
  error: null;
  id: string;
  result: BriefingResponseItem[];
};

export type BriefingErrorResponse = {
  error: BriefingError;
  id: string;
  result: null;
};

export type BriefingResponse = BriefingSuccessResponse | BriefingErrorResponse;

export type BriefingResponseItem = {
  placeId: string;
  queryType: string;
  receptionTime: string;
  refs: string[];
  reportTime: string;
  reportType: string;
  revision: string;
  stationId: string;
  text: string;
  textHTML: string;
};
