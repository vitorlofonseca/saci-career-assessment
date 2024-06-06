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

const router = useRouter()
const route = useRoute()

const roleId = ref(route.params.roleId ? String(route.params.roleId) : '')

const levels = ref<Array<{ id: number; name: string; role_id: number }>>([])

const fetchLevelsByRoleId = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/levels?role_id=${roleId.value}`)
    if (!response.ok) {
      throw new Error('Failed to fetch levels')
    }
    const data = await response.json()
    levels.value = data
  } catch (error) {
    console.error('Failed to fetch levels:', error)
  }
}

const redirectToLevelView = () => {
  router.push('/level-view')
}

onMounted(() => {
  fetchLevelsByRoleId()
})

watch(
  () => route.params.roleId,
  () => {
    roleId.value = route.params.roleId ? String(route.params.roleId) : ''
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
