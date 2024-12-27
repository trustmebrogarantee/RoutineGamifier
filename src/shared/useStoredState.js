import { useState } from "react"
import { safeLocalStorage } from "@shared/SafeLocalStorage"

export const useStoredState = (key, initialValue) => {
  const [value, _setValue] = useState(() => safeLocalStorage.get(key, initialValue))
  const setValue = (newValue) => {
    safeLocalStorage.set(key, newValue)
    _setValue(newValue)
  }
  return [value, setValue]
}