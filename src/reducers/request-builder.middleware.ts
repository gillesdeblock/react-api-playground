import type { RootState } from '@/store'
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { clearResponsePreview } from '@/reducers/response-preview.slice'
import {
  newRequest,
  removeRequest,
  selectRequestById,
  setRequestBody,
  setRequestHeaders,
  setRequestMethod,
  setRequests,
  setRequestURL,
} from '@/reducers/request-builder.slice'

const listener = createListenerMiddleware<RootState>()

listener.startListening({
  matcher: isAnyOf(newRequest, setRequests, removeRequest, setRequestMethod, setRequestURL, setRequestHeaders, setRequestBody),
  effect: (_, api) => {
    const { requests } = api.getState().requestBuilder
    localStorage.setItem('requests', JSON.stringify(requests))
  },
})

listener.startListening({
  matcher: isAnyOf(newRequest, selectRequestById),
  effect: (_, api) => {
    api.dispatch(clearResponsePreview())
  },
})

export default listener.middleware
