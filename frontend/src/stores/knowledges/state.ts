import type { Knowledge } from '@/domain/Knowledge'
import { type Ref, ref } from 'vue'

const knowledges: Ref<Knowledge[]> = ref([])

export { knowledges }
