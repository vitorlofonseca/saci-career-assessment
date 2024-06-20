<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h1>{{ role?.name }}</h1>
      <h2>Attached Levels</h2>
      <br />
      <ElTable :data="role?.levels" style="width: 100%">
        <ElTableColumn prop="name" label="Levels" />
      </ElTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { useRolesStore } from '@/stores/roles/index'
import { getLevelsByRoleId } from '@/stores/levels/actions'
import type { Role } from '@/domain/Role'

const roleStore = useRolesStore()
const role = ref<Role>()
const roleId = ref('1')

onMounted(async () => {
  role.value = await roleStore.getRoleById(roleId.value)

  const sortedLevels = await getLevelsByRoleId(parseInt(roleId.value))

  if (role.value) {
    role.value.levels = sortedLevels
  }
})
</script>

<style scoped lang="scss">
.PageWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.TableContainer {
  width: 800px;
  height: auto;
  margin: auto;
  text-align: left;
}
</style>
