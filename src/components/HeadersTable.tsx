import type { KeyValue, KeyValueWithID } from '@/types'

import { PlusIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type HeadersTableProps = {
  source: Record<string, KeyValueWithID> | null
  disabled?: boolean
  onAddHeader?: Function
  onPatchHeader?: Function
  onRemoveHeader?: Function
} & React.ComponentProps<'div'>

export type HeadersTableRowProps = {
  property: string
  value: string
  disabled?: boolean
  onPatch: (value: Partial<KeyValue>) => void
  onRemove: () => void
} & React.ComponentProps<'div'>

export function HeadersTable({
  className,
  source,
  disabled,
  onAddHeader = () => {},
  onPatchHeader = () => {},
  onRemoveHeader = () => {},
  ...props
}: HeadersTableProps) {
  const empty = !source || Object.keys(source).length === 0

  return (
    <>
      <div className="flex mb-2">
        <h3 className="text-lg self-end font-semibold">Headers</h3>
        {!disabled && (
          <Button className="ml-auto" size="icon" onClick={() => onAddHeader()}>
            <PlusIcon />
          </Button>
        )}
      </div>
      <div className={cn('flex flex-col rounded-md border', { 'border-none': empty }, className)} {...props}>
        {empty ? (
          <span>No headers found.</span>
        ) : (
          Object.entries(source).map(([id, { key = '', value = '' }], index, array) => (
            <div key={id}>
              <HeadersTableRow
                property={key}
                value={value}
                disabled={disabled}
                onPatch={(e) => onPatchHeader({ id, patch: e })}
                onRemove={() => onRemoveHeader(id)}
              />
              {index < array.length - 1 && <Separator />}
            </div>
          ))
        )}
      </div>
    </>
  )
}

function HeadersTableRow({ property, value, disabled, onPatch, onRemove, ...props }: HeadersTableRowProps) {
  return (
    <div className="flex items-stretch" {...props}>
      <Input
        className="max-w-xs w-full border-none rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
        value={property}
        placeholder="key"
        disabled={disabled}
        onInput={(e) => onPatch({ key: e.currentTarget.value })}
      />
      <Separator orientation="vertical" />
      <Input
        className="w-full border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        placeholder="value"
        disabled={disabled}
        onInput={(e) => onPatch({ value: e.currentTarget.value })}
      />
      {!disabled && (
        <Button variant="destructive" size="icon" className="rounded-l-none" onClick={onRemove}>
          <XIcon />
        </Button>
      )}
    </div>
  )
}
