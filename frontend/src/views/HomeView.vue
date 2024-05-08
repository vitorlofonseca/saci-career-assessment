<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElMessage } from 'element-plus'

const dialogFormVisible = ref(false)
const newKnowledgeName = ref('')

onMounted(async () => {})

const createKnowledge = async () => {
  if (newKnowledgeName.value === '') {
    ElMessage({
      message: 'You need to fill in this field',
      type: 'error'
    })
  } else {
    dialogFormVisible.value = false
    try {
      ElMessage({
        message: 'Congrats, your knowledge is now added',
        type: 'success'
      })
    } catch (error: any) {
      if (error.status === 409) {
        ElMessage({
          message: 'Knowledge name already exists.',
          type: 'error'
        })
      } else {
        ElMessage({
          message: 'Unexpected error',
          type: 'error'
        })
      }
    }
  }

  newKnowledgeName.value = ''
}
</script>

<template>
  <div class="demo">
    <ElButton plain @click="dialogFormVisible = true">Add new Knowledge</ElButton>
    <ElDialog v-model="dialogFormVisible" title="New Knowledge" width="500">
      <ElInput v-model="newKnowledgeName" placeholder="Knowledge name" :clearable="false" />

      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="dialogFormVisible = false">Cancel</ElButton>
          <ElButton type="primary" @click="createKnowledge" :required="true">Confirm</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped lang="scss">
.demo {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .el-input,
  h4 {
    text-align: center;
  }
}
</style>
