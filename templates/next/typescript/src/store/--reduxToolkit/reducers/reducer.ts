import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface state {
  value: number
}

const initialState: state = {
  value: 0
}

export const reducerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  }
})

export const { increment, decrement, incrementByAmount } = reducerSlice.actions
export default reducerSlice.reducer