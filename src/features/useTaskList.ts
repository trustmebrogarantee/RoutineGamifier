import type { RoutineGamifier } from '@shared/types/RoutineGamifier';
import { times } from '@shared/times';
import { useStoredState } from '@shared/useStoredState';
import { generateTask } from '@features/generateTask';

export type Options = {
  storageKey: string
}

export const useTaskList = ({ storageKey }: Options): RoutineGamifier.ITaskList => {
  const GENERATED_TASKS_NUMBER = 6
  const [items, setItems] = useStoredState(storageKey, times(GENERATED_TASKS_NUMBER, generateTask))
  
  return {
    items,
    remove (taskId) {
      setItems((items: RoutineGamifier.Task[]) => items.filter(item => item.id!== taskId))
    }
  }
}