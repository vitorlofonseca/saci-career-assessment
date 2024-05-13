<script setup lang="ts">
import { useRolesStore } from '@/stores/roles/index'
import type { Role } from '@/domain/Role'
import { ElButton, ElInput, ElMessage, ElDialog, ElTable, ElTableColumn } from 'element-plus'
import { ref, onMounted } from 'vue'

const dialogFormVisible = ref(false)
const rolesStore = useRolesStore()
const selectedRoleToUpdate = ref()

const openDialog = (row: Role) => {
  dialogFormVisible.value = true
  selectedRoleToUpdate.value = row
}

onMounted(async () => {
  await rolesStore.fetchRoles()
})

const handleDetail = (row: Role) => {
  console.log('Detail clicked for:', row)
}

const closeDialog = () => {
  dialogFormVisible.value = false
}

const saveForm = async () => {
  try {
    await rolesStore.editRoleAction(selectedRoleToUpdate.value)
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
  <div class="PageWrapper">
    <div class="TableContainer">
      <h2>Roles</h2>
      <ElTable :data="rolesStore.getRoles" style="width: 100%">
        <ElTableColumn prop="name" label="Names" />
        <ElTableColumn fixed="right" label="Actions" width="150">
          <template #default="{ row }">
            <ElButton @click="handleDetail(row)" type="text" size="small">Detail</ElButton>
            <ElButton @click="openDialog(row)" type="text" size="small">Edit</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.PageWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.TableContainer {
  width: 800px;
  height: auto;
  margin: auto;
  text-align: center;
}
</style>
