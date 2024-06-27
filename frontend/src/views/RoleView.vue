<template>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h1>{{ role?.name }}</h1>
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
import { ref, onMounted } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElDialog, ElInput, ElSlider } from 'element-plus'
import { ErrorMessage, SuccessMessage } from '@/services/messages'
import type { Knowledge } from '@/domain/Knowledge'
import { useRolesStore } from '@/stores/roles/index'
import { useKnowledgeStore } from '@/stores/knowledges'
import type { Role } from '@/domain/Role'
import { useRouter } from 'vue-router'

const router = useRouter()

const redirectToLevelView = () => {
  router.push('/level-view')
}

const onDeleteRow = (row: Knowledge) => {
  console.log('Detail clicked for:', row)
}

const onEditRow = (row: Knowledge) => {
  console.log('Edit clicked for:', row)
}

const roleStore = useRolesStore()
const knowledgesStore = useKnowledgeStore()
const createKnowledgeDialogFormVisible = ref(false)
const role = ref<Role>()
const knowledge = ref<Knowledge>({ weight: 0, name: '', roleId: 1 })

onMounted(async () => {
  const roleId = router.currentRoute.value.params.id
  role.value = await roleStore.getRoleById(roleId.toString())
})

const showDialogAddNewKnowledge = () => {
  createKnowledgeDialogFormVisible.value = true
}
const hideDialog = () => {
  createKnowledgeDialogFormVisible.value = false
}

const createKnowledge = async () => {
  if (knowledge.value.name == '') {
    ErrorMessage('You need to fill in this field')
    return
  }
  try {
    await knowledgesStore.saveKnowledge(knowledge.value)
    SuccessMessage('Your knowledge was created')
    hideDialog()
  } catch (error: any) {
    ErrorMessage('An error occurred while creating the knowledge')
  }

  knowledge.value.name = ''
}
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
