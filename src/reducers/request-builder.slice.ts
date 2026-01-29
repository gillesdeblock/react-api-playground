import type { RootState } from '@/store'
import type { RequestInstance, RequestMethod } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { createSlice } from '@reduxjs/toolkit'

interface RequestBuilderState {
  selectedRequestId: string | null
  requests: RequestInstance[]
  pending: boolean
}

const buildDefaultRequest = (): RequestInstance => ({
  id: uuid(),
  method: 'GET',
  url: 'https://geocoding-api.open-meteo.com/v1/search?name=Ghent',
  headers: {},
})

const hydrateRequests = () => {
  try {
    const value = localStorage.getItem('requests')
    if (!value) return []
    return JSON.parse(value) as RequestBuilderState['requests']
  } catch (error) {
    return []
  }
}

const initialState: RequestBuilderState = {
  requests: hydrateRequests(),
  selectedRequestId: null,
  pending: false,
}

const updateSelectedRequest = (state: RequestBuilderState, patch: Partial<RequestInstance>) => {
  const index = state.requests.findIndex(({ id }) => id === state.selectedRequestId)
  if (index > -1) {
    const request = { ...state.requests[index], ...patch }
    state.requests.splice(index, 1, request)
  }
}

export const requestBuilder = createSlice({
  initialState,
  name: 'request-builder',
  selectors: {
    selectedRequest: (state) => state.requests.find(({ id }) => id === state.selectedRequestId),
  },
  reducers: {
    setRequests: (state, action: PayloadAction<RequestInstance[]>) => {
      state.requests = action.payload.slice()
    },
    newRequest: (state) => {
      const request = buildDefaultRequest()
      state.requests.push(request)
      state.selectedRequestId = request.id
    },
    removeRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter(({ id }) => id !== action.payload)
    },
    selectRequestById: (state, action: PayloadAction<string | null>) => {
      state.selectedRequestId = action.payload
    },
    setRequestMethod: (state, action: PayloadAction<RequestMethod>) => {
      updateSelectedRequest(state, { method: action.payload })
    },
    setRequestURL: (state, action: PayloadAction<string>) => {
      updateSelectedRequest(state, { url: action.payload })
    },
    setRequestHeaders: (state, action: PayloadAction<RequestInstance['headers']>) => {
      updateSelectedRequest(state, { headers: action.payload })
    },
    setRequestBody: (state, action: PayloadAction<RequestInstance['body']>) => {
      updateSelectedRequest(state, { body: action.payload })
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      state.pending = action.payload
    },
  },
})

export const {
  setRequests,
  newRequest,
  removeRequest,
  selectRequestById,
  setRequestBody,
  setRequestHeaders,
  setRequestMethod,
  setRequestURL,
  setPending,
} = requestBuilder.actions

export const useSelectedRequest = requestBuilder.getSelectors((state: RootState) => state.requestBuilder).selectedRequest

export default requestBuilder.reducer
