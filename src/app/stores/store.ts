import { create } from 'zustand'

interface AppState {
  stack: number[],
  registers: Record<string, number | number[]>
}

