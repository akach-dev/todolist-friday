export type BaseResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: FieldErrorType[];
  data: D;
};

export type FieldErrorType = {
  error: string;
  field: string;
};
