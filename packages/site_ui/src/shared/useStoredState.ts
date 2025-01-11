import { useState } from "react"
import { safeLocalStorage } from "@site:shared/safeLocalStorage"

export const useStoredState = (key: string, initialValue: unknown) => {
  const [value, _setValue] = useState(() => safeLocalStorage.get(key, initialValue))
  
  safeLocalStorage.set(key, value)

  const setValue = (newValue: unknown) => {
    newValue = typeof newValue === 'function' ? newValue(value) : newValue
    safeLocalStorage.set(key, newValue)
    _setValue(newValue)
  }
  return [value, setValue]
}