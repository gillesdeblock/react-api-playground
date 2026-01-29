import { useAppDispatch, useAppSelector } from '@/store'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { NewRequestButton } from '@/components/NewRequestButton'
import { removeRequest, selectRequestById } from '@/reducers/request-builder.slice'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import { Button } from './ui/button'

export function HistorySidebar({ className, ...props }: React.ComponentProps<'div'>) {
  const dispatch = useAppDispatch()
  const selectedRequestId = useAppSelector((state) => state.requestBuilder.selectedRequestId)
  const requests = useAppSelector((state) => state.requestBuilder.requests)

  const onRemoveRequest = (id: string) => {
    if (selectedRequestId === id) {
      dispatch(selectRequestById(null))
    }
    dispatch(removeRequest(id))
  }

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      <div className="flex justify-center items-center border-b p-4">
        <h2 className="text-3xl font-semibold">History</h2>
      </div>
      <div className="flex flex-col flex-1">
        {requests.map((request) => (
          <div
            key={request.id}
            className={cn({ 'bg-muted': request.id === selectedRequestId })}
            onClick={() => dispatch(selectRequestById(request.id))}
          >
            <div className="p-4 pr-8 relative flex items-center gap-2 hover:bg-muted hover:cursor-pointer">
              <Badge>{request.method}</Badge>
              <div className="text-ellipsis overflow-x-hidden whitespace-nowrap">{request.url}</div>
              <Button
                className="absolute right-0 hover:text-red-600 hover:cursor-pointer"
                size="icon"
                variant="link"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveRequest(request.id)
                }}
              >
                <XIcon />
              </Button>
            </div>
            <Separator />
          </div>
        ))}
        {!requests.length && <div className="text-center p-4">No requests found.</div>}
      </div>
      <Separator />
      <NewRequestButton className={cn('w-full rounded-none', { 'animate-pulse': !requests.length })} />
    </div>
  )
}
