import { ref, type Ref } from 'vue'
import type { Role } from '@/domain/Role'
import type { Level } from '@/domain/Level'

export interface RoleWithLevels extends Role {
  levels: Level[]
}

const roles: Ref<RoleWithLevels[]> = ref([])

export { roles }
