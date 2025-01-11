import { motion } from 'framer-motion';
import { RoutineGamifier } from '@site:shared/types/RoutineGamifier';
import React from 'react';

interface Props {
  coins: RoutineGamifier.Coins,
  shopItems: RoutineGamifier.ShopItem[],
  purchaseItem: (item: RoutineGamifier.ShopItem) => void,
}

const Shop: React.FC<Props> = ({ coins, shopItems, purchaseItem }) => (
  <section>
    <h2 className="text-2xl font-semibold mb-4">Лавка</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {shopItems.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg shadow-lg flex flex-col items-center ${coins < item.price ? 'bg-gray-600' : 'bg-gray-800'}`}
        >
          <img src={item.image} alt={item.name} className="w-20 h-20 mb-4" />
          <h3 className="text-lg font-medium mb-2">{item.name}</h3>
          <p className="text-yellow-300 mb-4">{item.price} coins</p>
          <button
            onClick={() => purchaseItem(item)}
            className={`px-4 py-2 rounded text-white ${coins < item.price ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={coins < item.price}
          >
            Купить
          </button>
        </motion.div>
      ))}
    </div>
  </section>
);
export default Shop;