import { APIFactory } from '@/types.ts';

export const createAPI: APIFactory = ({ response }) => ({
  handler: ({ url: { searchParams } }) => {
    const a = Number(searchParams.get('a'));
    const b = Number(searchParams.get('b'));
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return response.fail('params_type_error');
    }
    return response.success({
      sum: Number(a) + Number(b),
    })
  }
});
