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
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { useLevelsStore } from '@/stores/levels'
import { getLevels } from '@/stores/levels/getters'

const router = useRouter()
const route = useRoute()
const levelsStore = useLevelsStore()
const levels = ref([]) // use ref to track levels data

const roleId = route.params.roleId?.toString() || ''

const fetchLevelsByRoleId = async () => {
  await levelsStore.fetchLevelsByRoleId(roleId)
  levels.value = getLevels() // assign the fetched levels to the local ref
}

const redirectToLevelView = () => {
  router.push('/Level-view')
}

onMounted(() => {
  fetchLevelsByRoleId()
})

watch(
  () => route.params.roleId,
  () => {
    fetchLevelsByRoleId()
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
