import type { ResponsePreview } from '@/types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ResponsePreviewState {
  response: ResponsePreview | null
}

const initialState: ResponsePreviewState = {
  response: null,
}

export const responsePreview = createSlice({
  initialState,
  name: 'response-preview',
  reducers: {
    setResponsePreview: (state, action: PayloadAction<ResponsePreview | null>) => {
      state.response = action.payload
    },
    clearResponsePreview: (state) => {
      state.response = null
    },
  },
})

export const { setResponsePreview, clearResponsePreview } = responsePreview.actions
export default responsePreview.reducer
