<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h2>Attached Levels for Role ID: {{ roleId }}</h2>
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
import { ref, onMounted, watch } from 'vue'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { getLevels } from '@/stores/levels/getters'
import { useLevelsStore } from '@/stores/levels'

const router = useRouter()
const route = useRoute()

const roleId = ref(route.params.roleId || '')

const levels = getLevels

const fetchLevelsByRoleId = async (roleId: string) => {
  const levelsStore = useLevelsStore()
  await levelsStore.fetchLevelsByRoleId(roleId)
}

const redirectToLevelView = () => {
  router.push('/level-view')
}

onMounted(() => {
  fetchLevelsByRoleId(roleId.value)
})

watch(
  () => route.params.roleId,
  () => {
    roleId.value = route.params.roleId || ''
    fetchLevelsByRoleId(roleId.value)
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
