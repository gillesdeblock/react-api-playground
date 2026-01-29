import type { KeyValue } from '@/types'

import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { addParam, initParams, patchParam, removeParam } from '@/reducers/request-editor.slice'

type Props = {
  query: string
  requestID?: string | null
}

export function useRequestSearchParams({ query, requestID }: Props) {
  const dispatch = useAppDispatch()
  const record = useAppSelector((state) => state.requestEditor.params)
  const search = useMemo(() => (record ? buildSearch(record) : ''), [record])

  const add = () => dispatch(addParam())
  const patch = (...args: Parameters<typeof patchParam>) => dispatch(patchParam(...args))
  const remove = (...args: Parameters<typeof removeParam>) => dispatch(removeParam(...args))

  useEffect(() => {
    dispatch(initParams(query))
  }, [requestID])

  return {
    record,
    search,
    add,
    patch,
    remove,
  }
}

function buildSearch<T extends Record<string, KeyValue>>(record: T) {
  const params = new URLSearchParams()

  for (const { key, value } of Object.values(record)) {
    if (key) {
      params.append(key.trim(), (value || '').trim())
    }
  }

  return params.toString()
}
