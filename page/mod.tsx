import { page as pageHome } from './home/mod.tsx';
import { Page } from './types.ts';

export const pageMap: Record<string, Page> = {
  home: {
    ...pageHome,
    path: 'home',
  },
};

export { Layout } from './Layout.tsx';
