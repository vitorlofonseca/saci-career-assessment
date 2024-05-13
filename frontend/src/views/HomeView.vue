<script setup lang="ts">
import { ElButton, ElInput, ElMessage, ElDialog } from 'element-plus'
import { ref, onMounted } from 'vue'
import { useRolesStore } from '@/stores/roles'

const dialogFormVisible = ref(false)
const roleName = ref()
const rolesStore = useRolesStore()
const role = ref()
const openDialog = () => {
  dialogFormVisible.value = true
}

const closeDialog = () => {
  dialogFormVisible.value = false
}

onMounted(async () => {
  await rolesStore.fetchRoles()
  role.value = rolesStore.getRoles.at(0)
  roleName.value = role.value.name
})
const saveForm = async () => {
  try {
    role.value.name = roleName.value
    await rolesStore.editRoleAction(role.value)
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
    <ElInput v-model="roleName" autocomplete="on" />
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDialog">Cancel</ElButton>
        <ElButton type="primary" @click="saveForm">Save</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
