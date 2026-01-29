import { cn } from '@/lib/utils'
import JsonView from '@microlink/react-json-view'

type ResponseDataProps = React.ComponentProps<'div'> & { data?: object }

export function ResponseData({ data, className }: ResponseDataProps) {
  return (
    <div className={cn('bg-muted p-2 border rounded-md overflow-auto', className)}>
      {data ? <JsonView src={data} name={false} displayDataTypes={false} /> : <>No data.</>}
    </div>
  )
}
