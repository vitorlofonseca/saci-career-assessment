<template>
  <div>
    <ElButton @click="showDialog" type="text" size="small">Edit</ElButton>
    <ElDialog v-model="dialogFormVisible" title="Edit Knowledge" width="500">
      <ElInput v-model="knowledgeToUpdate.id" placeholder="Enter ID" autocomplete="on" />
      <ElInput v-model="knowledgeToUpdate.name" placeholder="Enter Name" autocomplete="on" />
      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="hideDialog">Cancel</ElButton>
          <ElButton type="primary" @click="saveForm">Save</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { useKnowledgeStore } from '@/stores/knowledges'
import { ElButton, ElInput, ElDialog } from 'element-plus'
import { ref, onMounted } from 'vue'
import { SuccessMessage, ErrorMessage } from '@/services/messages/messages'
import type { Knowledge } from '@/domain/Knowledge'
const dialogFormVisible = ref(false)
const knowledgeStore = useKnowledgeStore()
const knowledgeToUpdate = ref<Knowledge>({
  id: 0,
  name: '',
  roleId: 0,
  levelId: 0,
  weight: 0
})
const showDialog = () => {
  dialogFormVisible.value = true
}
const hideDialog = () => {
  dialogFormVisible.value = false
}
const saveForm = async () => {
  try {
    await knowledgeStore.editKnowledge(knowledgeToUpdate.value)
    SuccessMessage('Knowledge updated successfully')
    hideDialog()
  } catch (error) {
    ErrorMessage('Unexpected error updating the knowledge')
  }
}
onMounted(async () => {
  await knowledgeStore.fetchKnowledge()
})
</script>
