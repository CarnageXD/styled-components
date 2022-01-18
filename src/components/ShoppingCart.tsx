import React, { useEffect, useState } from 'react';
import { Paper, styled, Typography } from '@mui/material';

import { Product, ShoppingCartItem, ShoppingCartList } from '../models';

import AddItemForm from './AddItemForm';
import ItemsList from './ItemsList';
import Total from './Total';

const ShoppingCartWrapper = styled(Paper)(() => ({
  width: 600,
  margin: 'auto',
  padding: 50,
  minHeight: 500,
}));

const ShoppingCartHeader = styled(Typography)(() => ({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: 24,
}));

const ShoppingCart = () => {
  const [items, setItems] = useState<ShoppingCartList>([]);

  const [shopProducts, setShopProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('https://61e6b7f5ce3a2d001735939d.mockapi.io/products');
      const products = await response.json();
      setShopProducts(products);
    }
    fetchProducts();
  }, []);

  const deleteCartItem = (item: ShoppingCartItem) => {
    const filteredCartItems = items.filter((product) => product.productId !== item.productId);
    setItems(filteredCartItems);
  };

  const addProductToCart = (item: ShoppingCartItem) => {
    const addingItem = items.find((product) => product.productId === item.productId);
    if (addingItem) {
      const updatedItems = items.map((product) =>
        product.productId === item.productId ? { ...item, quantity: item.quantity } : item
      );
      setItems(updatedItems);
    } else {
      setItems([...items, item]);
    }
  };

  const decrementProductQuantity = (item: ShoppingCartItem) => {
    const neededItem = items.find((product) => product.productId === item.productId);
    const itemQuantity = neededItem?.quantity || 0;
    if (itemQuantity > 1) {
      const updatedItems = items.map((product) =>
        product.productId === item.productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setItems(updatedItems);
    } else {
      deleteCartItem(item);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <ShoppingCartWrapper>
      <ShoppingCartHeader>Shopping cart</ShoppingCartHeader>
      <AddItemForm products={shopProducts} onClick={addProductToCart} />
      <ItemsList
        incrementQuantity={addProductToCart}
        decrementQuantity={decrementProductQuantity}
        deleteCartItem={deleteCartItem}
        products={shopProducts}
        items={items}
      />
      <Total products={shopProducts} items={items} onClick={clearCart} />
    </ShoppingCartWrapper>
  );
};

export default ShoppingCart;
