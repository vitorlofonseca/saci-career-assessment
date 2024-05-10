import type { Role } from '@/domain/Role'
import { type Ref, ref } from 'vue'

const roles: Ref<Role[]> = ref([])

const setRoles = (newRoles: Role[]): void => {
  roles.value = newRoles
}

export { roles, setRoles }
