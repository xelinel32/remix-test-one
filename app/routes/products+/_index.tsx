import type {MetaFunction} from '@remix-run/node';

import {type ApiProduct} from '~/api-client/types';

import ProductList from './components/list-view';

export const handle = {i18n: ['common', 'products']};
export const meta: MetaFunction = () => [{title: 'Remix App - Products'}];

const dummyProducts: ApiProduct[] = Array.from({length: 12}).map((_, index) => ({
  productId: (index + 1).toString(),
  title: {
    en: `Product ${index + 1}`,
    ar: 'منتج 1',
  },
  description: {
    en: 'Description 1',
    ar: 'وصف 1',
  },
  image: 'https://via.placeholder.com/150',
  price: 100,
  priceSale: 10,
  createdAt: '2022-01-01T00:00:00.000Z',
  updatedAt: '2022-01-01T00:00:00.000Z',
  userId: '123',
}));

export default function Products() {
  return (
    <>
      <ProductList data={dummyProducts} />
    </>
  );
}
