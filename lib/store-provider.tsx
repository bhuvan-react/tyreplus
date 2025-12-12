"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Provider } from "react-redux"
import { makeStore, type AppStore, setUser, logout } from "./store"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useEffect(() => {
    if (storeRef.current) {
      // Initialize auth from localStorage
      const stored = localStorage.getItem("tyreplus_user")
      if (stored) {
        try {
          const user = JSON.parse(stored)
          storeRef.current.dispatch(setUser(user))
        } catch {
          storeRef.current.dispatch(logout())
        }
      } else {
        storeRef.current.dispatch(logout())
      }
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
