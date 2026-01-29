import { RequestMethodSelect } from '@/components/RequestMethodSelect'
import { RequestUrlInput } from '@/components/RequestUrlInput'
import { RequestStartButton } from '@/components/RequestStartButton'
import { HeadersTable } from '@/components/HeadersTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { setRequestHeaders, setRequestURL, useSelectedRequest } from '@/reducers/request-builder.slice'
import { SearchParamsTable } from '@/components/SearchParamsTable'
import { useRequestHeaders } from '@/hooks/useRequestHeaders'
import { useRequestSearchParams } from '@/hooks/useRequestSearchParams'
import { useEffect } from 'react'

export function RequestBuilder(props: React.ComponentProps<'div'>) {
  return (
    <div className="p-4" {...props}>
      <h1 className="font-bold text-3xl">Request</h1>
      <RequestBuilderRequiredOptions className="mt-4 mb-2" />
      <Tabs defaultValue="query-params">
        <TabsList>
          <TabsTrigger value="query-params">Query params</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
        </TabsList>
        <TabsContent value="headers">
          <RequestHeaders />
        </TabsContent>
        <TabsContent value="query-params">
          <RequestSearchParams />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RequestHeaders() {
  const dispatch = useAppDispatch()
  const request = useAppSelector(useSelectedRequest)
  const requestID = request?.id
  const headers = request?.headers || {}

  const onUpdate = (value: Record<string, string>) => {
    dispatch(setRequestHeaders(value))
  }

  const { record, add, patch, remove } = useRequestHeaders({ headers, requestID, onUpdate })

  return <HeadersTable source={record} onAddHeader={add} onPatchHeader={patch} onRemoveHeader={remove} />
}

function RequestSearchParams() {
  const dispatch = useAppDispatch()
  const request = useAppSelector(useSelectedRequest)
  const requestID = request?.id
  const query = request?.url ? new URL(request.url).search : ''

  const onUpdate = (value: string) => {
    if (request?.url) {
      const url = new URL(request.url)
      url.search = value
      dispatch(setRequestURL(url.toString()))
    }
  }

  const { record, search, add, patch, remove } = useRequestSearchParams({ query, requestID })

  useEffect(() => {
    onUpdate(search)
  }, [search])

  return <SearchParamsTable source={record} disabled={false} onAddParam={add} onPatchParam={patch} onRemoveParam={remove} />
}

function RequestBuilderRequiredOptions(props: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex gap-2', props.className)}>
      <div className="w-full flex gap-2">
        <RequestMethodSelect />
        <RequestUrlInput className="w-full" />
      </div>
      <RequestStartButton />
    </div>
  )
}
