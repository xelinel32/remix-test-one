import React from 'react';
import {format} from 'date-fns';

import {Card, CardContent, CardMedia, Typography, CardActionArea, Box, Badge} from '@mui/material';

type Status = 'loading' | 'success' | 'error';

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl?: string | null;
  status: Status;
  price: number;
  discount?: number | null;
  createdAt: string;
  updatedAt?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imageUrl,
  price,
  discount,
  createdAt,
  updatedAt,
  status,
}) => {
  const hasDiscount = discount && discount > 0;

  const imagePoster = imageUrl ? imageUrl : 'https://via.placeholder.com/350';

  return (
    <Card sx={{maxWidth: 345, margin: 'auto'}}>
      <CardActionArea>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <CardMedia component="img" height="140" image={imagePoster} alt={title} />
          <Badge
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '2px 4px',
              borderRadius: '4px',
            }}
          >
            {status}
          </Badge>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${price}
          </Typography>
          {hasDiscount && (
            <Typography variant="body2" color="text.secondary">
              Discount: {discount}%
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Created At: {format(new Date(createdAt), 'MM/dd/yyyy')}
          </Typography>
          {updatedAt && (
            <Typography variant="body2" color="text.secondary">
              Updated At: {format(new Date(updatedAt), 'MM/dd/yyyy')}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
