import type { Knowledge } from './Knowledge'

export interface Role {
  id?: number
  name: string
  knowledges?: Array<Knowledge>
}
