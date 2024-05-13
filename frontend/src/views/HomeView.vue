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
  <div class="PageWrapper">
    <div class="TableContainer">
      <h2>Roles</h2>
      <ElTable :data="rolesStore.getRoles" style="width: 100%">
        <ElTableColumn prop="name" label="Names" />
        <ElTableColumn fixed="right" label="Actions" width="150">
          <template #default="{ row }">
            <ElButton @click="handleDetail(row)" type="text" size="small">Detail</ElButton>
            <ElButton @click="handleEdit(row)" type="text" size="small">Edit</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { useRolesStore } from '@/stores/roles/index'
import type { Role } from '@/domain/Role'
import { ElButton, ElInput, ElMessage, ElDialog } from 'element-plus'
import { ref, onMounted } from 'vue'
import { useRolesStore } from '@/stores/roles'

const rolesStore = useRolesStore()

onMounted(async () => {
  await rolesStore.fetchRoles()
  role.value = rolesStore.getRoles.at(0)
  roleName.value = role.value.name
})

const handleDetail = (row: Role) => {
  console.log('Detail clicked for:', row)
}

const handleEdit = (row: Role) => {
  console.log('Edit clicked for:', row)
}
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
</script>

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
