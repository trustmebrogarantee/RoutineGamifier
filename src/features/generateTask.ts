import { pickRandom } from '@shared/pickRandom';
import { randomUid } from '@shared/randomUid';
import { RoutineGamifier } from '@shared/types/RoutineGamifier';

export const generateTask = (): RoutineGamifier.Task => {
  const count = Math.round(Math.random() * 100 + 1)
  const reward = Math.round(Math.random() * 100 + 1) + 5
  const defaultList = [
    'Почитай в течении {n/3} минут', 
    'Поприседай {n/2} раз', 
    'Поприседай {n/2} раз', 
    'Поотжимайся {n/2} раз', 
    'Поотжимайся {n/2} раз', 
    'Покрути педали {n/3} минут', 
    'Покрути педали {n/3} минут',
    'Съешь в течении дня одно белковое блюдо с овощами', 
    'Съешь в течении для одно блюдо со сложными углеводами, полезное для желудка',
    'Не ешь ничего в течение дня',
    'Выпей 3 литра простой воды в течение дня',
    'Съешь одну маленькую шоколадку',
    'Съешь 3 любых фрукта',
  ]
  
  let list: string[] = defaultList
  const customList = localStorage.getItem('__custom_list__')
  if (customList) list = JSON.parse(customList)
    
  const action = pickRandom<string>(list)
  const task = action
    .replace('{n}', count.toString())
    .replace('{n/2}', Math.round((count / 2)).toString())
    .replace('{n/3}', Math.round((count / 3)).toString())
    .replace('{n/20}', Math.round((count / 20)).toString())
  return { text: task, reward: reward - reward % 5, id: randomUid() }
}