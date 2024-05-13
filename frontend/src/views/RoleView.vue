<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h1>{{ roleName }}</h1>
      <h2>Attached Knowledges</h2>
      <br />
      <ElTable :data="knowledges" style="width: 100%">
        <ElTableColumn prop="name" label="Knowledges" />
        <ElTableColumn fixed="right" label="Actions" width="150">
          <template #default="{ row }">
            <div>
              <ElButton @click="handleDetail(row)" type="text" size="small">Delete</ElButton>
              <ElButton @click="handleEdit(row)" type="text" size="small">Edit</ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import type { Knowledge } from '@/domain/Knowledge'
import { useKnowledgeStore } from '@/stores/knowledges/index'
import { useRolesStore } from '@/stores/roles/index'

const handleDetail = (row: Knowledge) => {
  console.log('Detail clicked for:', row)
}

const handleEdit = (row: Knowledge) => {
  console.log('Edit clicked for:', row)
}

const knowledgesStore = useKnowledgeStore()
const roleStore = useRolesStore()

const roleId = ref<number>(1)
const roleName = ref<string>('')
const knowledges = ref<Knowledge[]>([])

onMounted(async () => {
  try {
    await Promise.all([knowledgesStore.fetchKnowledges(), roleStore.fetchRoles()])

    const role = roleStore.roles.find((role) => role.id === roleId.value)

    if (role) {
      roleName.value = role.name
      console.log('Nome da Role:' + roleName.value)

      // Filtrando os conhecimentos com roleId correspondente
      knowledges.value = knowledgesStore.knowledges.filter(
        (knowledge) => parseInt(knowledge.roleId) === roleId.value
      )
    } else {
      console.error('Papel não encontrado com o ID fornecido.')
    }
  } catch (error) {
    console.error('Erro ao buscar conhecimentos ou papéis:', error)
  }
})
</script>

<style scoped lang="scss">
.PageWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.TableContainer {
  width: 800px;
  height: auto;
  margin: auto;
  text-align: left;
}
</style>
