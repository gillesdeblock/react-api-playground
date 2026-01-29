export type RequestMethod = 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'

export type RequestInstance = {
  id: string
  method: RequestMethod
  url: string
  body?: string | null
  headers: Record<string, string>
}
