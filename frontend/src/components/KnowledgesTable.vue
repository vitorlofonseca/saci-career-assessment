<template>
  <h2>Knowledges</h2>
  <ElTable :data="knowledges" style="width: 100%">
    <ElTableColumn prop="name" label="Knowledges" />
    <ElTableColumn prop="weight" label="Weight" width="450" />
    <ElTableColumn fixed="right" label="Actions" width="150">
      <template #default="{ row }">
        <div>
          <ElButton @click="onClickDelete(row)" type="text" size="small">Delete</ElButton>
          <ElButton @click="showEditDialog(row)" type="text" size="small">Edit</ElButton>
        </div>
      </template>
    </ElTableColumn>
  </ElTable>
  <div class="Demo">
    <br />
    <div class="NewKnowledge">
      <ElButton type="primary" @click="showDialogAddNewKnowledge">Create Knowledge</ElButton>
    </div>
    <ElDialog v-model="createKnowledgeDialogFormVisible" title="New Knowledge" width="500">
      <ElInput v-model="knowledge.name" placeholder="Knowledge name" :clearable="false" />
      <div class="Slider">
        <span class="KnowledgeWeight">Weight</span>
        <ElSlider v-model="knowledge.weight" :max="5" :step="1" show-stops />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="hideDialog()">Cancel</ElButton>
          <ElButton type="primary" @click="createKnowledge">Confirm</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
  <KnowledgeInformation v-model:visible="editKnowledgeFormVisible" :knowledge="knowledgeToUpdate" />
  <RemoveKnowledgeDialog
    v-model:visible="deleteKnowledgeDialogVisible"
    :knowledgeId="knowledgeToDelete"
  />
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
import RemoveKnowledgeDialog from '@/components/RemoveKnowledgeDialog.vue'
import KnowledgeInformation from '@/components/KnowledgeInformation.vue'

const roleStore = useRolesStore()
const knowledgesStore = useKnowledgeStore()
const createKnowledgeDialogFormVisible = ref(false)
const role = ref<Role>()
const knowledge = ref<Knowledge>({} as Knowledge)
const router = useRouter()

defineProps<{
  knowledges: Knowledge[]
}>()

onMounted(async () => {
  const roleId = router.currentRoute.value.params.id as string
  knowledge.value = { roleId: parseInt(roleId), name: '', weight: 0 }
  role.value = await roleStore.loadRoleById(roleId.toString())
})

const showDialogAddNewKnowledge = () => {
  createKnowledgeDialogFormVisible.value = true
}
const hideDialog = () => {
  createKnowledgeDialogFormVisible.value = false
}

const createKnowledge = async () => {
  if (knowledge.value.name === '') {
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

const editKnowledgeFormVisible = ref(false)
const knowledgeToUpdate = ref<Knowledge>({
  id: 1,
  name: '',
  roleId: 1,
  weight: 0
})
const showEditDialog = (row: Knowledge) => {
  knowledgeToUpdate.value = row
  editKnowledgeFormVisible.value = true
}

const deleteKnowledgeDialogVisible = ref(false)
const knowledgeToDelete = ref(0)

const onClickDelete = (row: Knowledge) => {
  knowledgeToDelete.value = Number(row.id)
  deleteKnowledgeDialogVisible.value = true
}
</script>

<style scoped lang="scss">
.KnowledgeWeight {
  text-align: justify left;
}

.Slider .KnowledgeWeight {
  font-size: 14px;
  text-align: right;
  color: var(--el-text-color-secondary);
  line-height: 60px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.Demo {
  .el-dialog {
    text-align: left;
  }
}

.NewKnowledge {
  text-align: right;
}
</style>
