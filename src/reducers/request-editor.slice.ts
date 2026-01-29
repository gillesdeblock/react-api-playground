import { withID } from '@/lib/utils'
import type { KeyValue, KeyValueWithID } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface RequestEditorState {
  params: Record<string, KeyValueWithID> | null
  headers: Record<string, KeyValueWithID> | null
}

const initialState: RequestEditorState = {
  params: null,
  headers: null,
}

export const requestEditor = createSlice({
  name: 'request-editor',
  initialState,
  reducers: {
    initParams: (state, { payload: query }: PayloadAction<string>) => {
      if (!query) {
        state.params = null
        return
      }

      const params = new URLSearchParams(query)
      const record: RequestEditorState['params'] = {}

      for (const [key, value] of params.entries()) {
        const entry = withID({ key, value })
        record[entry.id] = entry
      }

      state.params = record
    },
    addParam: (state) => {
      state.params = addEntry(state.params, withID({ key: '', value: '' }))
    },
    patchParam: (state, { payload: { id, patch } }: PayloadAction<{ id: string; patch: Partial<KeyValue> }>) => {
      state.params = patchEntry(state.params, id, patch)
    },
    removeParam: (state, { payload: id }: PayloadAction<string>) => {
      state.params = removeEntry(state.params, id)
    },

    initHeaders: (state, { payload: headers }: PayloadAction<Record<string, string>>) => {
      if (!headers) {
        state.headers = null
        return
      }

      state.headers = Object.entries(headers)
        .map(([key, value]) => withID({ key, value }))
        .reduce((prev, entry) => ({ ...prev, [entry.id]: entry }), {})
    },
    addHeader: (state) => {
      state.headers = addEntry(state.headers, withID({ key: '', value: '' }))
    },
    patchHeader: (state, { payload: { id, patch } }: PayloadAction<{ id: string; patch: Partial<KeyValue> }>) => {
      state.headers = patchEntry(state.headers, id, patch)
    },
    removeHeader: (state, { payload: id }: PayloadAction<string>) => {
      state.headers = removeEntry(state.headers, id)
    },
  },
})

function addEntry<T extends Record<string, any> | null>(target: T, entry: KeyValueWithID) {
  return { ...(target || {}), [entry.id]: entry }
}

function patchEntry<T extends Record<string, any> | null>(target: T, id: string, patch: Partial<KeyValue>) {
  if (target?.[id]) {
    return {
      ...target,
      [id]: { ...target[id], ...patch },
    }
  }
  return target
}

function removeEntry<T extends Record<string, any> | null>(target: T, id: string) {
  if (target?.[id]) {
    const { [id]: _, ...unset } = target
    return unset
  }
  return target
}

export const { initParams, addParam, patchParam, removeParam, initHeaders, addHeader, patchHeader, removeHeader } = requestEditor.actions

export default requestEditor.reducer
