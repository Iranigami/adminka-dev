import React from 'react';
import ShopListItem from './ShopsListItem';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const ShopsList = () => {
  const shops = useSelector((state: RootState) => state.shops); // Получаем список магазинов из Redux

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shops.map((shop) => (
        <ShopListItem key={shop.id} shop={shop} />
      ))}
    </div>
  );
};

export default ShopsList;