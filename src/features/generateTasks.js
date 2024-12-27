import { pickRandom } from '@shared/pickRandom';
let id = 0
export const generateTask = () => {
  const count = Math.round(Math.random() * 100 + 1);
  const reward = Math.round(Math.random() * 100 + 1) + 5;
  const action = pickRandom(['Отожмись {n} раз', 'Почитай в течении {n} минут', 'Поприседай {n} раз']);
  const task = action.replace('{n}', count);
  return { text: task, reward: reward - reward % 5, id: ++id };
}