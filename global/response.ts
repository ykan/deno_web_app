import { APIResult } from '@/types.ts';

const failTypeMap = {
  none: 'api not exists',
  params_type_error: '参数类型不对'
};

export const response = {
  success<T = any>(data: T, message?: string) {
    const res: APIResult<T> = {
      type: 'success',
      data,
      message,
    }
    return res;
  },
  fail(failType: keyof typeof failTypeMap) {
    const res: APIResult = {
      type: 'fail',
      message: failTypeMap[failType],
    }
    return res;
  }
}


export type GlobalResponse = typeof response;
