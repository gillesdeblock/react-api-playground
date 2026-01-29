import { RequestBuilder } from '@/components/RequestBuilder'
import { ResponsePreview } from '@/components/ResponsePreview'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/store'

export function RequestView({ className, ...props }: React.ComponentProps<'div'>) {
  const empty = useAppSelector((state) => !state.requestBuilder.selectedRequestId)

  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {empty ? (
        <div className="flex items-center justify-center w-full h-full">Nothing to show.</div>
      ) : (
        <>
          <RequestBuilder />
          <Separator />
          <ResponsePreview className="h-full" />
        </>
      )}
    </div>
  )
}
