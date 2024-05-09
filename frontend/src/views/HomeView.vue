<script setup lang="ts">
import { ElButton, ElInput, ElMessage, ElDialog } from 'element-plus'
import { ref } from 'vue'
import { useRolesStore } from '@/stores/roles'

const dialogFormVisible = ref(false)
const editRole = ref({ name: '' })
const rolesStore = useRolesStore()

const onClickEditRole = () => {
  dialogFormVisible.value = true
}

const onClickCancel = () => {
  dialogFormVisible.value = false
}

const saveForm = async (roleId: number) => {
  try {
    const message = await rolesStore.editRoleAction(roleId, editRole.value)

    if (!message.ok) {
      ElMessage({
        message: 'Error updating the role',
        type: 'error'
      })
    } else {
      ElMessage({
        message: 'Role updated successfully',
        type: 'success'
      })
    }
    onClickCancel()
  } catch (error) {
    ElMessage({
      message: 'Unexpected error updating the role',
      type: 'error'
    })
  }
}
dialogFormVisible.value = false
const roleId = ref(0)
</script>

<template>
  <ElButton link @click="onClickEditRole"> Edit </ElButton>
  <ElDialog v-model="dialogFormVisible" title="Edit Role" width="500">
    <ElInput v-model="editRole.name" autocomplete="on" />
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="onClickCancel">Cancel</ElButton>
        <ElButton type="primary" @click="() => saveForm(roleId)">Save</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
