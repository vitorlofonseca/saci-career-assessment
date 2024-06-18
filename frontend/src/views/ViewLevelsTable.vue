<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h1>{{ role?.name }}</h1>
      <h2>Attached Levels</h2>
      <br />
      <ElTable :data="sortedLevels" style="width: 100%">
        <ElTableColumn prop="name" label="Levels" />
        <ElTableColumn fixed="right" label="Actions" width="150">
          <template #default="{ row }">
            <div>
              <ElButton @click="onDeleteRow(row)" type="text" size="small">Delete</ElButton>
              <ElButton @click="onEditRow(row)" type="text" size="small">Edit</ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>

      <div class="NewLevel">
        <ElButton type="primary" @click="redirectToLevelView()"> Create Level </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import type { Level } from '@/domain/Level'
import { useRolesStore } from '@/stores/roles/index'
import { useLevelStore } from '@/stores/levels'
import type { Role } from '@/domain/Role'
import { useRouter } from 'vue-router'

const router = useRouter()

const redirectToLevelView = () => {
  router.push('/level-view')
}

const onDeleteRow = (row: Level) => {
  console.log('Delete clicked for:', row)
}

const onEditRow = (row: Level) => {
  console.log('Edit clicked for:', row)
}

const roleStore = useRolesStore()
const role = ref<Role>()
const levels = ref<Level[]>([])
const levelsStore = useLevelStore()

const sortLevels = (levels: Level[]): Level[] => {
  return levels.slice().sort((a, b) => {
    return a.minCoefficient - b.minCoefficient || a.maxCoefficient - b.maxCoefficient
  })
}

const sortedLevels = ref<Level[]>([])

onMounted(async () => {
  role.value = await roleStore.getRoleById('1')
  if (role.value) {
    levels.value = role.value.levels
    sortedLevels.value = sortLevels(levels.value)
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
