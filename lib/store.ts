"use client"

import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Types
interface User {
  id: string
  name: string
  mobile: string
  pincode?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
}

interface SearchState {
  vehicleType: "2W" | "3W" | "4W" | null
  make: string | null
  model: string | null
  variant: string | null
  pincode: string | null
}

// Initial states
const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
}

const initialSearchState: SearchState = {
  vehicleType: null,
  make: null,
  model: null,
  variant: null,
  pincode: null,
}

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.isLoading = false
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.isLoading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("tyreplus_user")
        if (stored) {
          try {
            const user = JSON.parse(stored)
            state.isAuthenticated = true
            state.user = user
          } catch {
            state.isAuthenticated = false
            state.user = null
          }
        }
      }
      state.isLoading = false
    },
  },
})

// Search Slice
const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setVehicleType: (state, action: PayloadAction<"2W" | "3W" | "4W" | null>) => {
      state.vehicleType = action.payload
      state.make = null
      state.model = null
      state.variant = null
    },
    setMake: (state, action: PayloadAction<string | null>) => {
      state.make = action.payload
      state.model = null
      state.variant = null
    },
    setModel: (state, action: PayloadAction<string | null>) => {
      state.model = action.payload
      state.variant = null
    },
    setVariant: (state, action: PayloadAction<string | null>) => {
      state.variant = action.payload
    },
    setPincode: (state, action: PayloadAction<string | null>) => {
      state.pincode = action.payload
    },
    resetSearch: (state) => {
      state.vehicleType = null
      state.make = null
      state.model = null
      state.variant = null
      state.pincode = null
    },
  },
})

export const { setUser, logout, setLoading, initializeAuth } = authSlice.actions
export const { setVehicleType, setMake, setModel, setVariant, setPincode, resetSearch } = searchSlice.actions

// Store
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      search: searchSlice.reducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
