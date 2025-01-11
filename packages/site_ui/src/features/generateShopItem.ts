import { pickRandom } from '@site:shared/pickRandom';
import { randomUid } from '@site:shared/randomUid';
import { RoutineGamifier } from '@site:shared/types/RoutineGamifier';

export const generateShopItem = (): RoutineGamifier.ShopItem => {
  const price = Math.round(Math.random() * 100 + 1) + 5
  const name = pickRandom<string>(['Поесть в ресторане', 'Поиграть 2 часа', 'Посмотреть аниме', 'Вкинуться'])
  return { name, price: price - (price % 5), image: 'https://fakeimg.pl/600x400', id: randomUid() }
}