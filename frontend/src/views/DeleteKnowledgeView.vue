<template>
  <div class="mb-4">
    <ElButton key="text" type="text" @click="onClickDelete(knowledgeToDelete)"> Delete </ElButton>
  </div>
  <ElDialog v-model="dialogVisible" title="Warning" width="500">
    <span>Knowledge will be permanently removed. Continue?</span>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDeleteDialog">Cancel</ElButton>
        <ElButton type="primary" @click="deleteKnowledge()"> Confirm </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useKnowledgeStore } from '@/stores/knowledges'
const dialogVisible = ref(false)
const knowledgeStore = useKnowledgeStore()
const knowledgeToDelete = ref('1')
const onClickDelete = (id: string) => {
  knowledgeToDelete.value = id
  dialogVisible.value = true
}
const closeDeleteDialog = () => {
  dialogVisible.value = false
}
async function deleteKnowledge() {
  try {
    await knowledgeStore.removeKnowledge(knowledgeToDelete.value)
    ElMessage({
      message: 'Knowledge removed!',
      type: 'success'
    })
    closeDeleteDialog()
  } catch (error) {
    ElMessage({
      message: 'Failed to delete knowledge',
      type: 'error'
    })
  }
}
</script>
