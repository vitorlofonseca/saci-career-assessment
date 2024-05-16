<script setup lang="ts">
import { useRolesStore } from '@/stores/roles/index'
import type { Role } from '@/domain/Role'
import { ElButton, ElInput, ElMessage, ElDialog, ElTable, ElTableColumn } from 'element-plus'
import { ref, onMounted } from 'vue'

const dialogFormVisible = ref(false)
const rolesStore = useRolesStore()
const selectedRoleToUpdate = ref()
const selectedRoleToDelete = ref()
const deleteDialogForm = ref(false)

const openUpdateDialog = (row: Role) => {
  dialogFormVisible.value = true
  selectedRoleToUpdate.value = row
}

const openDeleteDialog = (row: Role) => {
  deleteDialogForm.value = true
  selectedRoleToDelete.value = row.id
}

onMounted(async () => {
  await rolesStore.fetchRoles()
})

async function deleteRole() {
  if (selectedRoleToDelete.value !== null) {
    try {
      await rolesStore.removeRole(selectedRoleToDelete.value)
      ElMessage({
        message: 'Role removed!',
        type: 'success'
      })
      closeDeleteDialog()
    } catch (error) {
      ElMessage({
        message: 'Failed to delete role',
        type: 'error'
      })
    }
  }
}

const closeDeleteDialog = () => {
  deleteDialogForm.value = false
}

const closeDialog = () => {
  dialogFormVisible.value = false
}

const saveForm = async () => {
  try {
    await rolesStore.editRole(selectedRoleToUpdate.value)
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
</script>

<template>
  <ElDialog v-model="dialogFormVisible" title="Edit Role" width="500">
    <ElInput v-model="selectedRoleToUpdate.name" autocomplete="on" />
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDialog">Cancel</ElButton>
        <ElButton type="primary" @click="saveForm">Save</ElButton>
      </div>
    </template>
  </ElDialog>
  <ElDialog v-model="deleteDialogForm" title="Warning" width="500">
    <span>Role will be permanently removed. Continue?</span>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDeleteDialog">Cancel</ElButton>
        <ElButton type="primary" @click="deleteRole"> Confirm </ElButton>
      </div>
    </template>
  </ElDialog>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h2>Roles</h2>
      <ElTable :data="rolesStore.getRoles" style="width: 100%">
        <ElTableColumn prop="name" label="Names" />
        <ElTableColumn fixed="right" label="Actions" width="150">
          <template #default="{ row }">
            <ElButton @click="openDeleteDialog(row)" type="text" size="small">Delete</ElButton>
            <ElButton @click="openUpdateDialog(row)" type="text" size="small">Edit</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </div>
</template>

<style scoped>
.dialog-footer {
  text-align: right;
  margin-top: 10px;
}

.demo {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.dialog-footer {
  text-align: right;
  margin-top: 10px;
}
</style>
