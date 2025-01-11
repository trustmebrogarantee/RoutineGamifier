import type { RoutineGamifier } from '@site:shared/types/RoutineGamifier';
import { times } from '@site:shared/times';
import { useStoredState } from '@site:shared/useStoredState';
import { generateShopItem } from './generateShopItem';

export type Options = {
  storageKey: string;
}

export const useShop = ({ storageKey }: Options): RoutineGamifier.IShop => {
   const GENERATED_SHOP_ITEMS_NUMBER = 4
   const [items, setItems] = useStoredState(storageKey, times(GENERATED_SHOP_ITEMS_NUMBER, generateShopItem))
  return {
    items,
    remove(id) {
      setItems((items: RoutineGamifier.ShopItem[]) => items.filter(item => item.id!== id))
    }
  }
}