import { Input } from '@/components/ui/input'
import { useAppSelector, useAppDispatch } from '@/store'
import { setRequestURL, useSelectedRequest } from '@/reducers/request-builder.slice'
import { useRequest } from '@/hooks/useRequest'

export function RequestUrlInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  const dispatch = useAppDispatch()
  const { startRequest, invalid } = useRequest()

  const request = useAppSelector(useSelectedRequest)
  const url = request?.url || ''

  return (
    <Input
      className={className}
      value={url}
      type="url"
      placeholder="Enter request URL"
      onKeyUp={(e) => {
        if (e.key === 'Enter' && !invalid) {
          startRequest()
        }
      }}
      onChange={(e) => dispatch(setRequestURL(e.currentTarget.value))}
      {...props}
    />
  )
}
