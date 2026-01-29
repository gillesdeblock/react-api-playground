import type { RequestMethod } from '@/types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppSelector, useAppDispatch } from '@/store'
import { setRequestMethod, useSelectedRequest } from '@/reducers/request-builder.slice'

export function RequestMethodSelect() {
  const options = ['GET', /* 'PUT', 'POST', */ 'DELETE' /* , 'PATCH' */]
  const dispatch = useAppDispatch()

  const request = useAppSelector(useSelectedRequest)
  const method = request?.method || 'GET'

  return (
    <Select value={method} onValueChange={(v) => dispatch(setRequestMethod(v as RequestMethod))}>
      <SelectTrigger>
        <SelectValue>{method}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
