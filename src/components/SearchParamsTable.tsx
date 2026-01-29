import type { KeyValueWithID } from '@/types'

import { PlusIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type SearchParamsTableProps = {
  source: Record<string, KeyValueWithID> | null
  disabled?: boolean
  onAddParam?: Function
  onPatchParam?: Function
  onRemoveParam?: Function
} & React.ComponentProps<'div'>

export type SearchParamsTableRowProps = {
  property?: string
  value?: string
  disabled?: boolean
  onPatch: (value: Partial<KeyValueWithID>) => void
  onRemove: () => void
} & React.ComponentProps<'div'>

export function SearchParamsTable({
  className,
  source,
  disabled,
  onAddParam = () => {},
  onPatchParam = () => {},
  onRemoveParam = () => {},
  ...props
}: SearchParamsTableProps) {
  const empty = !source || Object.keys(source).length === 0

  return (
    <>
      <div className="flex mb-2">
        <h3 className="text-lg self-end font-semibold">Parameters</h3>
        <Button className="ml-auto" size="icon" onClick={() => onAddParam()}>
          <PlusIcon />
        </Button>
      </div>
      <div className={cn('flex flex-col rounded-md border', { 'border-none': empty }, className)} {...props}>
        {empty ? (
          <span>No parameters found.</span>
        ) : (
          Object.entries(source).map(([id, { key, value }], index, array) => (
            <div key={id}>
              <SearchParamsTableRow
                property={key}
                value={value}
                disabled={disabled}
                onPatch={(e) => onPatchParam({ id, patch: e })}
                onRemove={() => onRemoveParam(id)}
              />
              {index < array.length - 1 && <Separator key={id + '-separator'} />}
            </div>
          ))
        )}
      </div>
    </>
  )
}

function SearchParamsTableRow({ property, value, disabled, onPatch, onRemove, ...props }: SearchParamsTableRowProps) {
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
      <Button variant="destructive" size="icon" className="rounded-l-none" onClick={onRemove}>
        <XIcon />
      </Button>
    </div>
  )
}
