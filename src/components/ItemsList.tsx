import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { Product, ShoppingCartItem, ShoppingCartList } from '../models';
import useGetObjectFromArrayItemsName from '../hooks/getProductsObject';

const ItemsListWrapper = styled(Box)(() => ({
  paddingTop: 20,
}));

type ItemsListProps = {
  items: ShoppingCartList;
  products: Product[];
  incrementQuantity: (item: ShoppingCartItem) => void;
  decrementQuantity: (item: ShoppingCartItem) => void;
  deleteCartItem: (item: ShoppingCartItem) => void;
};

const ItemsList: React.FC<ItemsListProps> = (props) => {
  const { items, products, decrementQuantity, incrementQuantity, deleteCartItem } = props;
  const PRODUCTS_MAP = useGetObjectFromArrayItemsName(products);

  return (
    <ItemsListWrapper>
      {items.map((item) => {
        const product = PRODUCTS_MAP[item.productId];
        const price = product?.price || 0;
        return (
          <Grid container key={item.productId}>
            <Grid item xs={12}>
              <Typography>{product.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`${item.quantity} x $${price} = $${item.quantity * price}`}</Typography>
            </Grid>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                onClick={() =>
                  incrementQuantity({ productId: item.productId, quantity: item.quantity + 1 })
                }
              >
                +
              </Button>
              <Button onClick={() => decrementQuantity(item)}>-</Button>
              <Button onClick={() => deleteCartItem(item)}>x</Button>
            </ButtonGroup>
          </Grid>
        );
      })}
    </ItemsListWrapper>
  );
};

export default ItemsList;
