<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElDialog, ElInput } from 'element-plus'
import { useKnowledgeStore } from '@/stores/knowledges/index'
import { ErrorMessage, SuccessMessage } from '@/services/messages/messages'
import { HttpServerError } from '@/services/http'

const dialogFormVisible = ref(false)
const knowledgesStore = useKnowledgeStore()
const newKnowledgeName = ref('')

const showDialog = () => {
  dialogFormVisible.value = true
}

const hideDialog = () => {
  dialogFormVisible.value = false
}

const createKnowledge = async () => {
  if (newKnowledgeName.value == '') {
    ErrorMessage('You need to fill in this field')
    showDialog()
    return
  }

  try {
    /*await knowledgesStore.saveKnowledge(
      name: newKnowledgeName.value,
      roleId: '1',
      levelId: '1',
      weight: '1'
    )*/
    SuccessMessage('Your knowledge was created')
    hideDialog()
  } catch (error: any) {
    ErrorMessage('An error occurred while creating the knowledge')
  }

  newKnowledgeName.value = ''
}
</script>

<template>
  <div class="newKnowledge">
    <ElButton type="primary" @click="showDialog"> Create Knowledge </ElButton>
    <ElDialog v-model="dialogFormVisible" title="Knowledge" width="500">
      <ElInput v-model="newKnowledgeName" placeholder="Knowledge name" />

      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="hideDialog">Cancel</ElButton>
          <ElButton type="primary" @click="createKnowledge"> Confirm </ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>
<style lang="scss" scoped>
.newRole {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
