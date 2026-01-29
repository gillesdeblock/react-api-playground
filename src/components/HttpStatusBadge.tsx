import { Badge } from '@/components/ui/badge'

export type HttpStatusBadgeProps = React.ComponentProps<typeof Badge> & {
  status: number
}

export function HttpStatusBadge({ status, className, ...props }: HttpStatusBadgeProps) {
  return (
    <Badge className={className} {...props}>
      {status}
    </Badge>
  )
}
