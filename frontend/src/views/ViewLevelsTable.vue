<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h2>Attached Levels</h2>
      <br />
      <ElTable :data="levels" style="width: 100%">
        <ElTableColumn prop="name" label="Levels" />
      </ElTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { useRolesStore } from '@/stores/roles/index'
import { useLevelStore } from '@/stores/levels'
import type { Role } from '@/domain/Role'
import { type Level } from '@/domain/Level'

const levelsStore = useLevelStore()
const roleId = ref('1')
const levels = ref<Level[]>()

onMounted(async () => {
  const sortedlevels = await levelsStore.getLevelsByRoleId(parseInt(roleId.value))
  levels.value = sortedlevels
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

.NewLevel {
  padding-top: 20px;
}

.TableContainer {
  width: 800px;
  height: auto;
  margin: auto;
  text-align: left;
}

.Slider {
  width: 100%;
  display: flex;
  align-items: center;
}

.KnowledgeWeight {
  padding-right: 120px;
}

.Slider .KnowledgeWeight {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 60px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
</style>
