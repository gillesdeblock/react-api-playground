import { Button } from '@/components/ui/button'
import { useRequest } from '@/hooks/useRequest'

export function RequestStartButton(props: React.ComponentProps<typeof Button>) {
  const { pending, invalid, startRequest, cancelRequest } = useRequest()

  return pending ? (
    <Button key="cancel" variant="outline" onClick={cancelRequest} {...props}>
      Cancel
    </Button>
  ) : (
    <Button key="send" disabled={invalid} onClick={startRequest} {...props}>
      Send
    </Button>
  )
}
