import React from 'react';
import { Product, ShoppingCartList } from '../models';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Typography } from '@mui/material';
import useGetObjectFromArrayItemsName from '../hooks/getProductsObject';

type TotalProps = {
  items: ShoppingCartList;
  onClick: () => void;
  products: Product[];
};

const TotalWrapper = styled(Box)(() => ({
  paddingTop: 40,
}));

const Total: React.FC<TotalProps> = ({ items, onClick, products }) => {
  const PRODUCTS_MAP = useGetObjectFromArrayItemsName(products);
  const totalValue = items.reduce((acc, item) => {
    const price = PRODUCTS_MAP[item.productId]?.price || 0;
    acc += item.quantity * price;
    return acc;
  }, 0);
  return (
    <TotalWrapper>
      <Grid container>
        <Grid item xs={6}>
          <Typography>{`Total: $${totalValue}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={onClick} variant="outlined">
            Clear
          </Button>
        </Grid>
      </Grid>
    </TotalWrapper>
  );
};

export default Total;
