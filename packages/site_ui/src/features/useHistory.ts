import type { RoutineGamifier } from '@site:shared/types/RoutineGamifier';
import { useStoredState } from '@site:shared/useStoredState';
import { randomUid } from '@site:shared/randomUid';

export type Options = {
  storageKey: string
}

export const useHistory = <T>({ storageKey }: Options): RoutineGamifier.History<T> => {
  const [history, setHistory] = useStoredState(storageKey, [])
  return {
    items: history,
    add(operation: string, name: string, entity: T) {
      const newItem: RoutineGamifier.HistoryItem<T> = { 
        date: (new Date()).toLocaleString(), 
        operation, 
        id: randomUid(), 
        name, 
        entity 
      }
      setHistory([newItem, ...history])
    }
  }
}