import { APIFactory } from '@/types.ts';

export const createAPI: APIFactory = () => ({
  handler: () => {
    return {
      type: 'fail',
      data: 'api no exists.'
    }
  }
});
