import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { addHeader, initHeaders, patchHeader, removeHeader } from '@/reducers/request-editor.slice'

type Props = {
  headers: Record<string, string>
  requestID?: string | null
  onUpdate: (value: Props['headers']) => void
}

export function useRequestHeaders({ headers, requestID, onUpdate }: Props) {
  const dispatch = useAppDispatch()
  const record = useAppSelector((state) => state.requestEditor.headers)
  const updatedHeaders = useMemo(() => Object.fromEntries(Object.values(record || {}).map(({ key, value }) => [key, value])), [record])

  const add = () => dispatch(addHeader())
  const patch = (...args: Parameters<typeof patchHeader>) => dispatch(patchHeader(...args))
  const remove = (...args: Parameters<typeof removeHeader>) => dispatch(removeHeader(...args))

  useEffect(() => {
    dispatch(initHeaders(headers))
  }, [requestID])

  useEffect(() => {
    onUpdate(updatedHeaders)
  }, [updatedHeaders])

  return {
    record,
    add,
    patch,
    remove,
  }
}
