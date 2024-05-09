<script setup lang="ts">
import { ElButton, ElInput, ElMessage, ElDialog } from 'element-plus'
import { ref } from 'vue'
import { useRolesStore } from '@/stores/roles'

const dialogFormVisible = ref(false)
const editRole = ref({ name: '' })
const rolesStore = useRolesStore()

const openDialog = () => {
  dialogFormVisible.value = true
}

const closeDialog = () => {
  dialogFormVisible.value = false
}

const saveForm = async (roleId: number) => {
  try {
    await rolesStore.editRoleAction(roleId, editRole.value)
    ElMessage({
      message: 'Role updated successfully',
      type: 'success'
    })
    closeDialog()
  } catch (error) {
    ElMessage({
      message: 'Unexpected error updating the role',
      type: 'error'
    })
  }
}
const roleId = ref(0)
</script>
<template>
  <ElButton link @click="openDialog"> Edit </ElButton>
  <ElDialog v-model="dialogFormVisible" title="Edit Role" width="500">
    <ElInput v-model="editRole.name" autocomplete="on" />
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDialog">Cancel</ElButton>
        <ElButton type="primary" @click="() => saveForm(roleId)">Save</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
