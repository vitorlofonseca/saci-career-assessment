<script lang="ts" setup>
import { ElButton, ElDialog, ElInput, ElTable, ElTableColumn } from 'element-plus'
import { useKnowledgeStore } from '@/stores/knowledges/index'
import { ErrorMessage, SuccessMessage } from '@/services/messages/messages'
import { ref, onMounted } from 'vue'
import type { Knowledge } from '@/domain/Knowledge'
import { useRolesStore } from '@/stores/roles/index'

const dialogFormVisible = ref(false)
const knowledgesStore = useKnowledgeStore()
const newKnowledgeName = ref('')
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

const handleDetail = (row: Knowledge) => {
  console.log('Detail clicked for:', row)
}
const handleEdit = (row: Knowledge) => {
  console.log('Edit clicked for:', row)
}

const showDialog = () => {
  dialogFormVisible.value = true
}

const hideDialog = () => {
  dialogFormVisible.value = false
}

const createKnowledge = async () => {
  if (newKnowledgeName.value == '') {
    ErrorMessage('You need to fill in this field')
    showDialog()
    return
  }

  try {
    await knowledgesStore.saveKnowledge({
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

<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h1>{{ roleName }}</h1>
      <br />
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
    <br />
    <div class="newKnowledge">
      <ElButton type="primary" @click="showDialog"> Create Knowledge </ElButton>
      <ElDialog v-model="dialogFormVisible" title="Knowledge" width="500">
        <ElInput v-model="newKnowledgeName" placeholder="Knowledge name" />

        <template #footer>
          <div class="dialog-footer">
            <ElButton @click="hideDialog">Cancel</ElButton>
            <ElButton type="primary" @click="createKnowledge"> Confirm </ElButton>
          </div>
        </template>
      </ElDialog>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.PageWrapper {
  padding: 100px;
}

.newKnowledge {
  text-align: right;
}

.newRole {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
