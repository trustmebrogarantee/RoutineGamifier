import type { RoutineGamifier } from '@shared/types/RoutineGamifier';
import { useStoredState } from '@shared/useStoredState';

export type Options = {
  storageKey: string
}

export const useBalance = ({ storageKey }: Options): RoutineGamifier.IBalance => {
  const [balance, setBalance] = useStoredState(storageKey, 0)

  const hasFunds = (amount: RoutineGamifier.Coins) => {
    return balance >= amount
  }

  const topUp = (amount: RoutineGamifier.Coins) => {
    setBalance(balance + amount)
  }

  const spend = (amount: RoutineGamifier.Coins) => {
    if (hasFunds(amount)) setBalance(balance - amount)
  }

  return {
    balance,
    spend,
    topUp,
    hasFunds
  }
}