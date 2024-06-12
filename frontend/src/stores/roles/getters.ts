import { computed } from 'vue'
import { roles } from '@/stores/roles/state'
import { get } from '@/services/http'
import type { Role } from '@/domain/Role'
import { quizState } from '@/stores/roles/state'

const getRoles = computed(() => {
  return roles?.value
})

export async function getRoleById(roleId: string) {
  return await get<Role>(`/roles/${roleId}`)
}

const quizGetters = {
  selectedRole: () => quizState.quiz.selectedRole
}
export { getRoles }
