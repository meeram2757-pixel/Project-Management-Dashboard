import { useEffect, useMemo, useState } from 'react'

export function useLocalStorageState(key, initialValue) {
  const initial = useMemo(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw == null) return initialValue
      return JSON.parse(raw)
    } catch {
      return initialValue
    }
  }, [initialValue, key])

  const [value, setValue] = useState(initial)

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore write errors (private mode / quota)
    }
  }, [key, value])

  return [value, setValue]
}

