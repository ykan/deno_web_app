import { APIFactory } from '@/types.ts';

export const createAPI: APIFactory = async () => ({
  handler: async () => {
    return {
      type: 'fail',
      data: 'api no exists.'
    }
  }
});
