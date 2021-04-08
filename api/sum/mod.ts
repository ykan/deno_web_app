import { APIFactory } from '@/types.ts';

export const createAPI: APIFactory = async () => ({
  handler: async (req) => {
    const params = new URLSearchParams(req.url.split('?')[1] || '');
    const a = params.get('a') || 0;
    const b = params.get('b') || 0;
    return {
      type: 'success',
      data: {
        sum: Number(a) + Number(b),
      }
    }
  }
});
