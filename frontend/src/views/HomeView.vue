<template>
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

const rolesStore = useRolesStore()

onMounted(async () => {
  await rolesStore.fetchRoles()
})

const handleDetail = (row: Role) => {
  console.log('Detail clicked for:', row)
}

const handleEdit = (row: Role) => {
  console.log('Edit clicked for:', row)
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
