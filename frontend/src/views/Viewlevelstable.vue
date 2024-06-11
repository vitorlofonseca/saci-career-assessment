<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h2>Levels:</h2>
      <br />
      <ElTable :data="levels" style="width: 100%">
        <ElTableColumn prop="name" label="Levels" />
      </ElTable>
      <div class="NewLevel">
        <ElButton type="primary" @click="redirectToLevelView">Create Level</ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { useLevelsStore } from '@/stores/levels'
import { getLevels } from '@/stores/levels/getters'
import { onMounted, watch } from 'vue'

const router = useRouter()
const route = useRoute()
const levelsStore = useLevelsStore()

const roleId = route.params.roleId?.toString() || ''
const levels = getLevels

const fetchLevelsByRoleId = async (roleId: string) => {
  await levelsStore.fetchLevelsByRoleId(roleId)
}

const redirectToLevelView = () => {
  router.push('/level-view')
}

onMounted(() => {
  fetchLevelsByRoleId(roleId)
})

watch(
  () => route.params.roleId,
  (newRoleId) => {
    fetchLevelsByRoleId(newRoleId?.toString() || '')
  }
)
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
