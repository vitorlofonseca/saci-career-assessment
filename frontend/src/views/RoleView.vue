<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <div class="ImageContainer">
        <img src="@/assets/images/logo-and-lettering.svg" alt="Saci Logo" />
      </div>
      <h1>{{ role?.name }}</h1>
      <LevelsTable :levels="role?.levels!" />
      <KnowledgesTable :knowledges="role?.knowledges!" />
      <h2>Attached Knowledges</h2>
      <br />
      <ElTable :data="role?.knowledges" style="width: 100%">
        <ElTableColumn prop="name" label="Knowledges" />
        <ElTableColumn prop="weight" label="Weight" width="450" />
        <ElTableColumn fixed="right" label="Actions" width="150">
          <template #default="{ row }">
            <div>
              <ElButton @click="onDeleteRow(row)" type="text" size="small">Delete</ElButton>
              <ElButton @click="onEditRow(row)" type="text" size="small">Edit</ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
      <div class="demo">
        <br />
        <ElButton type="primary" @click="showDialogAddNewKnowledge">Create Knowledge</ElButton>
        <ElDialog v-model="createKnowledgeDialogFormVisible" title="New Knowledge" width="500">
          <ElInput v-model="knowledge.name" placeholder="Knowledge name" :clearable="false" />
          <div class="Slider">
            <span class="KnowledgeWeight">Weight</span>
            <ElSlider v-model="knowledge.weight" :max="5" :step="1" show-stops />
          </div>
          <template #footer>
            <div class="dialog-footer">
              R
              <ElButton @click="hideDialog()">Cancel</ElButton>
              <ElButton type="primary" @click="createKnowledge">Confirm</ElButton>
            </div>
          </template>
        </ElDialog>
      </div>
      <div class="NewLevel">
        <ElButton type="primary" @click="redirectToLevelView()"> Create Level </ElButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KnowledgesTable from '@/components/KnowledgesTable.vue'
import LevelsTable from '@/components/LevelsTable.vue'
import { useRolesStore } from '@/stores/roles/index'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Role } from '@/domain/Role'
import { ErrorMessage } from '@/services/messages'

const role = ref<Role>()
const router = useRouter()

const roleStore = useRolesStore()

onMounted(async () => {
  const roleId = router.currentRoute.value.params.roleId as string
  try {
    role.value = await roleStore.loadRoleById(roleId)
  } catch (error) {
    ErrorMessage('Error Loading Role')
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
  h1 {
    padding-bottom: 40px;
  }
}

.TableContainer {
  width: 800px;
  height: auto;
  margin: auto;
  .ImageContainer {
    margin-top: 50px;

    img {
      padding-top: 20px;
      width: 100px;
    }
    text-align: center;
  }
  text-align: left;
}
</style>
