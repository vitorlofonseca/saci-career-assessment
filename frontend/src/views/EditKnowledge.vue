<template>
  <div>
    <ElButton @click="showDialog(row)" type="text" size="small">Edit</ElButton>
    <ElDialog v-model="dialogFormVisible" title="Edit Knowledge" width="500">
      <ElInput v-model="selectedKnowledgeToUpdate.name" autocomplete="on" />
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
const selectedKnowledgeToUpdate = ref()

const showDialog = (row: Knowledge) => {
  dialogFormVisible.value = true
  selectedKnowledgeToUpdate.value = row
}

const hideDialog = () => {
  dialogFormVisible.value = false
}

const saveForm = async () => {
  try {
    const knowledge: Knowledge = {
      id: 1,
      name: 'p',
      roleId: 1,
      levelId: 1,
      weight: 1
    }
    await knowledgeStore.editKnowledge(knowledge)
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
