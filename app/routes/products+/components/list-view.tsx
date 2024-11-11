import React from 'react';

import {Grid2} from '@mui/material';

import {ApiProduct} from '~/api-client/types';

import ProductCard from './card';

interface ListViewProps {
  data: ApiProduct[];
}

const ListView: React.FC<ListViewProps> = ({data}) => {
  return (
    <Grid2 container spacing={3}>
      {data.map(product => (
        <Grid2 key={product.productId} size={{xs: 12, sm: 6, md: 4}}>
          <ProductCard
            title={product.title.en}
            description={product.description.en}
            imageUrl={product.image}
            price={product.price}
            discount={product.priceSale}
            createdAt={product.createdAt}
            updatedAt={product.updatedAt}
            status="success"
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ListView;
