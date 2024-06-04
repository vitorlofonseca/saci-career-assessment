<template>
  <div class="mb-4">
    <ElButton key="text" type="text" @click="onClickDeleteLevel(levelToDelete)">Delete</ElButton>
  </div>
  <ElDialog v-model="dialogVisible" title="Warning" width="500">
    <span>Knowledge will be permanently removed. Continue?</span>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDeleteDialog">Cancel</ElButton>
        <ElButton type="primary" @click="deleteLevel">Confirm</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog } from 'element-plus'
import { ref } from 'vue'
import { ErrorMessage, SuccessMessage } from '@/services/messages'
import { removeLevel } from '@/stores/roles/actions'

const dialogVisible = ref(false)
const levelToDelete = ref(15)

const onClickDeleteLevel = (id: number) => {
  levelToDelete.value = id
  dialogVisible.value = true
}

const closeDeleteDialog = () => {
  dialogVisible.value = false
}

async function deleteLevel() {
  try {
    await removeLevel(levelToDelete.value)
    SuccessMessage('Level removed!')
    closeDeleteDialog()
  } catch (error) {
    ErrorMessage('Failed to delete level')
  }
}
</script>
