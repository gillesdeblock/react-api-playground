import { Button } from '@/components/ui/button'
import { newRequest } from '@/reducers/request-builder.slice'
import { useAppDispatch } from '@/store'
import { PlusIcon } from 'lucide-react'

export function NewRequestButton(props: React.ComponentProps<typeof Button>) {
  const dispatch = useAppDispatch()

  return (
    <Button {...props} size="icon-sm" onClick={() => dispatch(newRequest())}>
      <PlusIcon />
    </Button>
  )
}
