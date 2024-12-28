import { pickRandom } from '@shared/pickRandom';
import { randomUid } from '@shared/randomUid';
import { RoutineGamifier } from '@shared/types/RoutineGamifier';

export const generateShopItem = (): RoutineGamifier.ShopItem => {
  const price = Math.round(Math.random() * 100 + 1) + 5
  const name = pickRandom<string>(['Поесть в ресторане', 'Поиграть 2 часа', 'Посмотреть аниме', 'Вкинуться'])
  return { name, price: price - (price % 5), image: 'https://random.imagecdn.app/500/150', id: randomUid() }
}