import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, FormControl, MenuItem, TextField } from '@mui/material';
import { Product, ShoppingCartItem } from '../models';

const AddItemBox = styled(Box)(() => ({
  display: 'flex',
  marginTop: '25px',
}));

const ItemSelectWrapper = styled(FormControl)(() => ({
  width: '200px',
  marginRight: '20px',
}));

const QuantityInputWrapper = styled(FormControl)(() => ({
  width: '80px',
  marginRight: '20px',
}));

type AddItemFormProps = {
  onClick: (item: ShoppingCartItem) => void;
  products: Product[];
};

const AddItemForm: React.FC<AddItemFormProps> = ({ onClick, products }) => {
  const [productId, setProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+e.target.value);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  return (
    <AddItemBox>
      <ItemSelectWrapper>
        <TextField select value={productId} onChange={handleProductChange} label="Item">
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.label}
            </MenuItem>
          ))}
        </TextField>
      </ItemSelectWrapper>
      <QuantityInputWrapper>
        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </QuantityInputWrapper>
      <Button
        onClick={() => onClick({ productId, quantity })}
        disabled={!quantity || !productId}
        variant="contained"
      >
        Add
      </Button>
    </AddItemBox>
  );
};

export default AddItemForm;
