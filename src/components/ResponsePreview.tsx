import { LoaderCircleIcon } from 'lucide-react'
import { useAppSelector } from '@/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResponseData } from '@/components/ResponseData'
import { RequestStartButton } from '@/components/RequestStartButton'
import { HeadersTable } from '@/components/HeadersTable'
import { cn, withID } from '@/lib/utils'
import type { ResponsePreview } from '@/types'
import { HttpStatusBadge } from './HttpStatusBadge'

export function ResponsePreview({ className, ...props }: React.ComponentProps<'div'>) {
  const pending = useAppSelector((state) => state.requestBuilder.pending)
  const response = useAppSelector((state) => state.responsePreview.response)

  return (
    <div className={cn('p-4 flex flex-col min-h-0', className)} {...props}>
      <div className="flex gap-2 mb-4">
        <h1 className="font-bold text-3xl">Response</h1>
        {response?.status && <HttpStatusBadge className="self-center relative top-0.5" status={response.status} />}
      </div>
      <Tabs className="flex-1 min-h-0" defaultValue="body">
        <TabsList>
          <TabsTrigger value="body" disabled={pending || !response}>
            Body
          </TabsTrigger>
          <TabsTrigger value="headers" disabled={pending || !response}>
            Headers
          </TabsTrigger>
        </TabsList>
        {pending ? (
          <div className="h-full flex flex-col items-center justify-center">
            <LoaderCircleIcon className="animate-spin" />
          </div>
        ) : (
          <>
            <TabsContent className="overflow-y-auto" value="body">
              <ResponseBody response={response} />
            </TabsContent>
            <TabsContent value="headers">
              <ResponseHeaders />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}

function ResponseHeaders() {
  const response = useAppSelector((state) => state.responsePreview.response)
  const headers = response?.headers || {}

  const source = Object.entries(headers)
    .map(([key, value]) => withID({ key, value }))
    .reduce((prev, entry) => ({ ...prev, [entry.id]: entry }), {})

  return <HeadersTable source={source} disabled={true} />
}

function ResponseBody({ response }: { response: ResponsePreview | null }) {
  const normalizedData = response?.data || {}

  return (
    <>
      {!response ? (
        <div className="h-full min-h-0 flex flex-col items-center gap-2 justify-center">
          <span>No data available.</span>
          <RequestStartButton />
        </div>
      ) : (
        <ResponseData className="h-full flex flex-col" data={normalizedData} />
      )}
    </>
  )
}
