import { pickRandom } from '@shared/pickRandom';
import { randomUid } from '@shared/randomUid';
import { RoutineGamifier } from '@shared/types/RoutineGamifier';

export const generateTask = (): RoutineGamifier.Task => {
  const count = Math.round(Math.random() * 100 + 1)
  const reward = Math.round(Math.random() * 100 + 1) + 5
  const action = pickRandom<string>(['Отожмись {n} раз', 'Почитай в течении {n} минут', 'Поприседай {n} раз'])
  const task = action.replace('{n}', count.toString())
  return { text: task, reward: reward - reward % 5, id: randomUid() }
}