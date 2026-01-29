import { Toaster } from '@/components/ui/sonner'
import { HistorySidebar } from '@/components/HistorySidebar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { RequestView } from './components/RequestView'

function App({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <>
      <div className={cn('flex', className)} {...props}>
        <HistorySidebar className="h-full w-[320px]" />
        <Separator orientation="vertical" />
        <RequestView className="flex-1" />
      </div>
      <Toaster />
    </>
  )
}

export default App
