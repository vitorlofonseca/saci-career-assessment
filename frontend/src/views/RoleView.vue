<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h1>{{ role?.name }}</h1>
      <h2>Attached Knowledges</h2>
      <br />
      <ElTable :data="role?.knowledges" style="width: 100%">
        <ElTableColumn prop="name" label="Knowledges" />
        <ElTableColumn fixed="right" label="Actions" width="150">
          <template #default="{ row }">
            <div>
              <ElButton @click="onDeleteRow(row)" type="text" size="small">Delete</ElButton>
              <ElButton @click="onEditRow(row)" type="text" size="small">Edit</ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
      <div class="demo">
        <br />
        <ElButton type="primary" @click="showDialogAddNewKnowledge">Add new Knowledge</ElButton>
        <ElDialog v-model="createKnowledgeDialogFormVisible" title="New Knowledge" width="500">
          <ElInput v-model="newKnowledgeName" placeholder="Knowledge name" :clearable="false" />
          <template #footer>
            <div class="dialog-footer">
              <ElButton @click="hideDialog()">Cancel</ElButton>
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
import { ErrorMessage, SuccessMessage } from '@/services/messages'
import type { Knowledge } from '@/domain/Knowledge'
import { useRolesStore } from '@/stores/roles/index'
import type { Role } from '@/domain/Role'

const onDeleteRow = (row: Knowledge) => {
  console.log('Detail clicked for:', row)
}

const onEditRow = (row: Knowledge) => {
  console.log('Edit clicked for:', row)
}

const roleStore = useRolesStore()
const createKnowledgeDialogFormVisible = ref(false)
const newKnowledgeName = ref('')
const roleId = ref<string>('1')
const role = ref<Role>()

onMounted(async () => {
  role.value = await roleStore.getRoleById(roleId.value)
})

const showDialogAddNewKnowledge = () => {
  createKnowledgeDialogFormVisible.value = true
}
const hideDialog = () => {
  createKnowledgeDialogFormVisible.value = false
}

const createKnowledge = async () => {
  if (newKnowledgeName.value == '') {
    ErrorMessage('You need to fill in this field')
    return
  }
  try {
    /*await knowledgesStore.saveKnowledge(
      name: newKnowledgeName.value,
      roleId: '1',
      levelId: '1',
      weight: '1'
    )*/
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
