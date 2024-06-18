<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h2>Levels:</h2>
      <br />
      <ElTable :data="levels" style="width: 100%">
        <ElTableColumn prop="name" label="Level Name" />
      </ElTable>
      <div class="NewLevel">
        <ElButton type="primary" @click="redirectToLevelView">Create Level</ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { useLevelsStore } from '@/stores/levels'

const router = useRouter()
const route = useRoute()
const levelsStore = useLevelsStore()

const levels = ref([])

const roleId = route.params.roleId?.toString() || ''

const fetchLevels = async () => {
  try {
    await levelsStore.fetchLevelsByRoleId(roleId)
    levels.value = levelsStore.getLevels()
  } catch (error) {
    console.error('Failed to fetch levels:', error)
  }
}

const redirectToLevelView = () => {
  router.push('/Level-view')
}

onMounted(async () => {
  await fetchLevels()
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
</style>
