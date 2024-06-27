import type { Role } from '@/domain/Role'
import type { Level } from '@/domain/Level'
import { type Ref, ref } from 'vue'

const roles: Ref<Role[]> = ref([])

export { roles }

const levels: Ref<Level[]> = ref([])

export { levels }
