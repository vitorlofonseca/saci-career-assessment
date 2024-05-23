import { computed } from 'vue'
import { knowledges } from '@/stores/knowledges/state'
import type { Knowledge } from '@/domain/Knowledge'
import { getRoleById } from '../roles/getters'

const getKnowledge = computed(() => {
  return knowledges?.value
})

async function getKnowledgesByRoleId(roleId: number): Promise<Knowledge[]> {
  if (getKnowledge?.value?.length > 0) {
    const knowledgesOfId = getKnowledge.value.filter((knowledge) => knowledge.roleId === roleId)
    return knowledgesOfId
  }
  const roleResponse = await getRoleById(roleId.toString())

  return roleResponse.knowledges!
}

export { getKnowledge, getKnowledgesByRoleId }
