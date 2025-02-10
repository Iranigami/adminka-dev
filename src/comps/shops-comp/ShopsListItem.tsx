import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const ShopListItem = ({ shop }) => {
  const classes = 'bg-white rounded shadow-md p-4 flex items-center justify-between'; // Стиль для плашки

  return (
    <div className={classes}>
      <h2>{shop.name}</h2>
      <p>{shop.description}</p>
      <a href={shop.url} target="_blank" rel="noreferrer">Visit Store</a>
    </div>
  );
};

export default ShopListItem;