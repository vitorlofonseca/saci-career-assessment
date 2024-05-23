<template>
  <div class="mb-4">
    <ElButton key="primary" type="text" @click="onClickDelete(roleId)"> Delete </ElButton>
  </div>
  <ElDialog v-model="dialogVisible" title="Warning" width="500">
    <span>Role will be permanently removed. Continue?</span>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="onClickCancel()">Cancel</ElButton>
        <ElButton type="primary" @click="deleteRole()"> Confirm </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRolesStore } from '@/stores/roles'

const dialogVisible = ref(false)
const roleId = ref<string>('')
const rolesStore = useRolesStore()

const onClickDelete = (id: string) => {
  dialogVisible.value = true
  roleId.value = id
}

const onClickCancel = () => {
  dialogVisible.value = false
}

async function deleteRole() {
  try {
    await rolesStore.removeRole(roleId.value)
    ElMessage({
      message: 'Role removed!',
      type: 'success'
    })
  } catch (error) {
    ElMessage({
      message: 'Failed to delete role',
      type: 'error'
    })
  }
}
</script>
