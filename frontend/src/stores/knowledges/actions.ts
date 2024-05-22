import { post } from '@/services/http'
import { knowledges } from './state'
import type { Knowledge } from '@/domain/Knowledge'

async function saveKnowledge(knowledge: Knowledge): Promise<void> {
  await post<Knowledge[]>('/knowledges', knowledge)
  knowledges.value.push(knowledge)
}

function setKnowledges(newKnowledges: Knowledge[]): void {
  knowledges.value = newKnowledges
}

export { saveKnowledge, setKnowledges }
