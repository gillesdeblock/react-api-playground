import type { RequestInstance, ResponsePreview } from '@/types'
import { useAppDispatch, useAppSelector } from '@/store'
import { setPending, useSelectedRequest } from '@/reducers/request-builder.slice'
import { setResponsePreview } from '@/reducers/response-preview.slice'

export function useRequest() {
  const dispatch = useAppDispatch()
  const { abort, signal } = new AbortController()

  const request = useAppSelector(useSelectedRequest)
  const pending = useAppSelector((state) => state.requestBuilder.pending)
  const invalid = !request?.method || !request?.url

  const startRequest = async () => {
    try {
      if (invalid) {
        return
      }

      dispatch(setPending(true))
      const options = buildFetchOptions(request, signal)
      const response = await fetch(request.url, options)

      const preview: ResponsePreview = {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      }

      if (response.ok) {
        preview.data = await response.json()
      }

      dispatch(setResponsePreview(preview))
    } catch (error) {
      console.error('unexpected error', error)
      setResponsePreview(null)
    } finally {
      dispatch(setPending(false))
    }
  }

  const cancelRequest = () => {
    if (!pending) {
      console.warn('no pending request found to cancel')
      return
    }
    abort()
    dispatch(setPending(false))
  }

  return {
    request,
    pending,
    invalid,
    startRequest,
    cancelRequest,
  }
}

function buildFetchOptions(request: RequestInstance, signal?: InstanceType<typeof AbortController>['signal']) {
  const { method, headers, body } = request
  const options: RequestInit = { method }

  if (body) options.body = body
  if (headers) options.headers = headers
  if (signal) options.signal = signal

  return options
}
