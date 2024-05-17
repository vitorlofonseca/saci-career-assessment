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
      <div class="demo">
        <br />
        <ElButton type="primary" @click="showDialog">Add new Knowledge</ElButton>
        <ElDialog v-model="createKnowledgedialogFormVisible" title="New Knowledge" width="500">
          <ElInput v-model="newKnowledgeName" placeholder="Knowledge name" :clearable="false" />
          <template #footer>
            <div class="dialog-footer">
              <ElButton @click="createKnowledgedialogFormVisible = false">Cancel</ElButton>
              <ElButton type="primary" @click="createKnowledge">Confirm</ElButton>
            </div>
          </template>
        </ElDialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElDialog, ElInput } from 'element-plus'
import { ErrorMessage, SuccessMessage } from '@/services/messages/messages'
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
const createKnowledgedialogFormVisible = ref(false)
const newKnowledgeName = ref('')
const roleId = ref<number>(1)
const roleName = ref<string>('')
const knowledges = ref<Knowledge[]>([])

onMounted(async () => {
  try {
    const role = roleStore.roles.find((role) => role.id === roleId.value)
    if (role) {
      roleName.value = role.name
      console.log('Nome da Role:' + roleName.value)
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

const showDialog = () => {
  createKnowledgedialogFormVisible.value = true
}
const hideDialog = () => {
  createKnowledgedialogFormVisible.value = false
}

const createKnowledge = async () => {
  try {
    await knowledgesStore.addKnowledge({
      name: newKnowledgeName.value,
      roleId: '1',
      levelId: '',
      weight: '1'
    })
    SuccessMessage('Your knowledge was created')
    hideDialog()
  } catch (error: any) {
    ErrorMessage('An error occurred while creating the knowledge')
  }

  newKnowledgeName.value = ''
}
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
